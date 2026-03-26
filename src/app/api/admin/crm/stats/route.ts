import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: admin } = await supabase
    .schema("web")
    .from("crm_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // Parallel queries
  const [leadsRes, affiliatesRes, referralsRes, activityRes] = await Promise.all([
    supabase.schema("web").from("leads").select("id, status"),
    supabase.schema("web").from("affiliates").select("id, status"),
    supabase.schema("web").from("referrals").select("id, status, commission"),
    supabase
      .schema("web")
      .from("crm_activities")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(15),
  ]);

  const leads = leadsRes.data ?? [];
  const affiliates = affiliatesRes.data ?? [];
  const referrals = referralsRes.data ?? [];

  const leadsByStatus: Record<string, number> = {};
  for (const l of leads) {
    leadsByStatus[l.status] = (leadsByStatus[l.status] || 0) + 1;
  }

  const converted = leadsByStatus["converted"] || 0;
  const conversionRate = leads.length > 0 ? Math.round((converted / leads.length) * 100) : 0;

  const activeAffiliates = affiliates.filter((a) => a.status === "approved").length;
  const pendingAffiliates = affiliates.filter((a) => a.status === "pending").length;

  const pendingPayouts = referrals
    .filter((r) => r.status === "converted")
    .reduce((sum, r) => sum + (r.commission || 0), 0);

  const paidPayouts = referrals
    .filter((r) => r.status === "paid_out")
    .reduce((sum, r) => sum + (r.commission || 0), 0);

  return NextResponse.json({
    stats: {
      totalLeads: leads.length,
      leadsByStatus,
      conversionRate,
      activeAffiliates,
      pendingAffiliates,
      totalAffiliates: affiliates.length,
      pendingPayouts,
      paidPayouts,
      totalReferrals: referrals.length,
    },
    recentActivity: activityRes.data ?? [],
  });
}
