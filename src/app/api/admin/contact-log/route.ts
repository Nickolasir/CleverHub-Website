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

  const { searchParams } = new URL(request.url);
  const entityType = searchParams.get("entity_type");
  const entityId = searchParams.get("entity_id");

  if (!entityType || !entityId) {
    return NextResponse.json({ error: "entity_type and entity_id required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .schema("web")
    .from("crm_contact_log")
    .select("*")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .order("contacted_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ contacts: data });
}

export async function POST(request: NextRequest) {
  const supabase = await createServerClient();
  const user = await verifyCrmAdmin(supabase);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { entity_type, entity_id, contact_method, disposition, notes, contacted_at } = body;

  if (!entity_type || !entity_id || !contact_method || !disposition) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Enforce house_visit only for leads
  if (entity_type === "affiliate" && contact_method === "house_visit") {
    return NextResponse.json({ error: "House visit is not available for affiliates" }, { status: 400 });
  }

  const { data, error } = await supabase
    .schema("web")
    .from("crm_contact_log")
    .insert({
      entity_type,
      entity_id,
      contact_method,
      disposition,
      notes: notes?.trim() || null,
      contacted_at: contacted_at || new Date().toISOString(),
      created_by: user.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Log activity
  await supabase.schema("web").from("crm_activities").insert({
    entity_type,
    entity_id,
    actor_id: user.id,
    action: "contact_logged",
    details: { contact_method, disposition, contact_log_id: data.id },
  });

  return NextResponse.json({ contact: data });
}
