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
  const status = searchParams.get("status");
  const source = searchParams.get("source");
  const assignedTo = searchParams.get("assigned_to");

  let query = supabase
    .schema("web")
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (status) query = query.eq("status", status);
  if (source) query = query.eq("source_type", source);
  if (assignedTo) query = query.eq("assigned_to", assignedTo);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ leads: data });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createServerClient();
  const user = await verifyCrmAdmin(supabase);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing lead id" }, { status: 400 });
  }

  const { data, error } = await supabase
    .schema("web")
    .from("leads")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Log activity
  await supabase.schema("web").from("crm_activities").insert({
    entity_type: "lead",
    entity_id: id,
    actor_id: user.id,
    action: "status_changed",
    details: updates,
  });

  return NextResponse.json({ lead: data });
}

export async function POST(request: NextRequest) {
  const supabase = await createServerClient();
  const user = await verifyCrmAdmin(supabase);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { name, email, phone, company, vertical, source_type, message } = body;

  if (!email || !name) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .schema("web")
    .from("leads")
    .insert({
      name,
      email,
      phone: phone || "",
      company: company || "",
      vertical: vertical || null,
      source_type: source_type || "manual",
      source: "admin",
      message: message || "",
      status: "new",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.schema("web").from("crm_activities").insert({
    entity_type: "lead",
    entity_id: data.id,
    actor_id: user.id,
    action: "lead_created",
    details: { source: "admin_manual" },
  });

  return NextResponse.json({ lead: data }, { status: 201 });
}
