import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import * as XLSX from "xlsx";

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

// GET: list all imports
export async function GET() {
  const supabase = await createServerClient();
  const user = await verifyCrmAdmin(supabase);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { data, error } = await supabase
    .schema("web")
    .from("import_lists")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ imports: data });
}

// Normalize column headers to match our field names
function normalizeHeader(header: string): string {
  const h = header.toLowerCase().trim().replace(/[\s_-]+/g, "_");
  const map: Record<string, string> = {
    first_name: "first_name",
    last_name: "last_name",
    full_name: "name",
    name: "name",
    email: "email",
    email_address: "email",
    phone: "phone",
    phone_number: "phone",
    telephone: "phone",
    mobile: "phone",
    cell: "phone",
    company: "company",
    company_name: "company",
    business: "company",
    organization: "company",
    vertical: "vertical",
    profession: "profession",
    job_title: "profession",
    title: "profession",
    role: "profession",
    message: "message",
    notes: "message",
    note: "message",
    address: "address",
  };
  return map[h] || h;
}

function professionFromText(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("real estate") || t.includes("realtor") || t.includes("agent")) return "real_estate_agent";
  if (t.includes("decorator") || t.includes("designer") || t.includes("interior")) return "interior_decorator";
  if (t.includes("contractor") || t.includes("builder")) return "contractor";
  if (t.includes("property") || t.includes("manager")) return "property_manager";
  return "other";
}

// POST: upload and import Excel file
export async function POST(request: NextRequest) {
  const supabase = await createServerClient();
  const user = await verifyCrmAdmin(supabase);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const listName = formData.get("list_name") as string;
  const targetType = formData.get("target_type") as string;

  if (!file || !listName || !targetType) {
    return NextResponse.json({ error: "file, list_name, and target_type are required" }, { status: 400 });
  }

  if (!["lead", "affiliate"].includes(targetType)) {
    return NextResponse.json({ error: "target_type must be 'lead' or 'affiliate'" }, { status: 400 });
  }

  // Parse Excel
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

  if (rawRows.length === 0) {
    return NextResponse.json({ error: "Spreadsheet is empty" }, { status: 400 });
  }

  // Create import list record
  const { data: importList, error: listError } = await supabase
    .schema("web")
    .from("import_lists")
    .insert({
      name: listName,
      target_type: targetType,
      file_name: file.name,
      total_rows: rawRows.length,
      status: "processing",
      uploaded_by: user.id,
    })
    .select()
    .single();

  if (listError) {
    return NextResponse.json({ error: listError.message }, { status: 500 });
  }

  let importedRows = 0;
  let skippedRows = 0;
  const errors: { row: number; reason: string }[] = [];

  for (let i = 0; i < rawRows.length; i++) {
    const raw = rawRows[i];
    // Normalize headers
    const row: Record<string, string> = {};
    for (const [key, val] of Object.entries(raw)) {
      row[normalizeHeader(key)] = String(val ?? "").trim();
    }

    // Build name from first_name + last_name if no full name
    const name = row.name || [row.first_name, row.last_name].filter(Boolean).join(" ");
    const email = row.email;

    if (!email) {
      errors.push({ row: i + 2, reason: "Missing email" });
      skippedRows++;
      continue;
    }

    if (!name) {
      errors.push({ row: i + 2, reason: "Missing name" });
      skippedRows++;
      continue;
    }

    if (targetType === "lead") {
      // Check for duplicate email
      const { data: existing } = await supabase
        .schema("web")
        .from("leads")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (existing) {
        errors.push({ row: i + 2, reason: `Duplicate email: ${email}` });
        skippedRows++;
        continue;
      }

      const { error: insertError } = await supabase
        .schema("web")
        .from("leads")
        .insert({
          name,
          email,
          phone: row.phone || "",
          company: row.company || "",
          vertical: row.vertical || null,
          message: row.message || "",
          source_type: "manual",
          source: `Import: ${listName}`,
          import_list_id: importList.id,
        });

      if (insertError) {
        errors.push({ row: i + 2, reason: insertError.message });
        skippedRows++;
      } else {
        importedRows++;
      }
    } else {
      // Affiliate
      const { data: existing } = await supabase
        .schema("web")
        .from("affiliates")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (existing) {
        errors.push({ row: i + 2, reason: `Duplicate email: ${email}` });
        skippedRows++;
        continue;
      }

      const { error: insertError } = await supabase
        .schema("web")
        .from("affiliates")
        .insert({
          name,
          email,
          phone: row.phone || "",
          company: row.company || "",
          profession: row.profession ? professionFromText(row.profession) : "other",
          status: "pending",
          payout_method: "manual",
          import_list_id: importList.id,
        });

      if (insertError) {
        errors.push({ row: i + 2, reason: insertError.message });
        skippedRows++;
      } else {
        importedRows++;
      }
    }
  }

  // Update import list with results
  await supabase
    .schema("web")
    .from("import_lists")
    .update({
      imported_rows: importedRows,
      skipped_rows: skippedRows,
      errors,
      status: importedRows > 0 ? "completed" : "failed",
    })
    .eq("id", importList.id);

  // Log activity
  await supabase.schema("web").from("crm_activities").insert({
    entity_type: targetType,
    entity_id: importList.id,
    actor_id: user.id,
    action: "list_imported",
    details: {
      list_name: listName,
      file_name: file.name,
      total: rawRows.length,
      imported: importedRows,
      skipped: skippedRows,
    },
  });

  return NextResponse.json({
    import_id: importList.id,
    total: rawRows.length,
    imported: importedRows,
    skipped: skippedRows,
    errors,
  });
}
