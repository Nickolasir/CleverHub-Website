import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServiceSupabase } from "@/lib/supabase-service";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional().default(""),
  message: z.string().min(10, "Message must be at least 10 characters"),
  vertical: z.enum(["clever_home", "clever_host", "clever_building"]).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = result.data;
    const supabase = getServiceSupabase();

    // Read affiliate referral cookie
    const refCode = request.cookies.get("cleverhub_ref")?.value ?? null;

    const { error: dbError } = await supabase
      .schema("web")
      .from("leads")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        vertical: data.vertical ?? null,
        source: "website",
        source_type: "contact_form",
        status: "new",
        referral_code: refCode,
      });

    if (dbError) {
      console.error("Contact form insert error:", dbError);
      return NextResponse.json(
        { success: false, message: "Failed to submit. Please try again." },
        { status: 500 }
      );
    }

    // If there's a referral code, create a referral record
    if (refCode) {
      const { data: affiliate } = await supabase
        .schema("web")
        .from("affiliates")
        .select("id")
        .eq("referral_code", refCode)
        .eq("status", "approved")
        .maybeSingle();

      if (affiliate) {
        await supabase.schema("web").from("referrals").insert({
          affiliate_id: affiliate.id,
          referred_email: data.email,
          referred_name: data.name,
          status: "lead",
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch soon.",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
