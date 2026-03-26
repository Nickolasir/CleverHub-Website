import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
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

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");

  let query = supabase
    .schema("web")
    .from("affiliates")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ affiliates: data });
}

export async function PATCH(request: NextRequest) {
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

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) return NextResponse.json({ error: "Missing affiliate id" }, { status: 400 });

  // Set approved_at when approving
  if (updates.status === "approved") {
    updates.approved_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .schema("web")
    .from("affiliates")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.schema("web").from("crm_activities").insert({
    entity_type: "affiliate",
    entity_id: id,
    actor_id: user.id,
    action: "status_changed",
    details: updates,
  });

  return NextResponse.json({ affiliate: data });
}

function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(request: NextRequest) {
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

  const body = await request.json();
  const { name, email, phone, company, profession } = body;

  if (!email || !name) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  // Check duplicate email
  const { data: existing } = await supabase
    .schema("web")
    .from("affiliates")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: "An affiliate with this email already exists" }, { status: 409 });
  }

  // Generate unique referral code
  let referralCode = generateReferralCode();
  for (let i = 0; i < 5; i++) {
    const { data: codeExists } = await supabase
      .schema("web")
      .from("affiliates")
      .select("id")
      .eq("referral_code", referralCode)
      .maybeSingle();
    if (!codeExists) break;
    referralCode = generateReferralCode();
  }

  const { data, error } = await supabase
    .schema("web")
    .from("affiliates")
    .insert({
      name,
      email,
      phone: phone || "",
      company: company || "",
      profession: profession || "other",
      referral_code: referralCode,
      status: "pending",
      payout_method: "manual",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.schema("web").from("crm_activities").insert({
    entity_type: "affiliate",
    entity_id: data.id,
    actor_id: user.id,
    action: "affiliate_created",
    details: { source: "admin_manual" },
  });

  return NextResponse.json({ affiliate: data }, { status: 201 });
}
