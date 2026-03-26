import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

async function verifyCrmAdmin(supabase: Awaited<ReturnType<typeof createServerClient>>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: admin } = await supabase
    .schema("web")
    .from("crm_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  return admin ? user : null;
}

export async function GET(request: NextRequest) {
  const supabase = await createServerClient();
  const user = await verifyCrmAdmin(supabase);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status"); // "new" | "reviewed" | "all"

  let query = supabase
    .from("consultations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Also get count of unreviewed
  const { count } = await supabase
    .from("consultations")
    .select("id", { count: "exact", head: true })
    .or("status.is.null,status.eq.new");

  return NextResponse.json({ consultations: data ?? [], newCount: count ?? 0 });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createServerClient();
  const user = await verifyCrmAdmin(supabase);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id, status } = await request.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabase
    .from("consultations")
    .update({ status: status || "reviewed" })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
