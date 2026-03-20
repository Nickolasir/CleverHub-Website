import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;
  const { content } = await request.json();

  if (!content?.trim()) {
    return NextResponse.json({ error: "Note content required" }, { status: 400 });
  }

  const { data: note, error } = await supabase
    .schema("web")
    .from("crm_notes")
    .insert({
      entity_type: "lead",
      entity_id: id,
      author_id: user.id,
      content: content.trim(),
    })
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
    action: "note_added",
    details: { note_id: note.id },
  });

  return NextResponse.json({ note });
}
