import { NextRequest, NextResponse } from "next/server";
import { consultationSchema } from "@/lib/validation";
import { getServiceSupabase } from "@/lib/supabase-service";
import {
  sendConsultationNotification,
  sendConsultationConfirmation,
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate
    const result = consultationSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { success: false, message: firstError.message },
        { status: 400 }
      );
    }

    const data = result.data;

    // Read affiliate referral cookie
    const refCode = request.cookies.get("cleverhub_ref")?.value ?? null;

    // Insert into Supabase
    const supabase = getServiceSupabase();
    const { data: row, error: dbError } = await supabase
      .from("consultations")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        bedrooms: data.bedrooms,
        has_office: data.hasOffice,
        preferred_time_1: data.preferredTime1,
        preferred_time_2: data.preferredTime2,
        preferred_time_3: data.preferredTime3,
        utm_source: body.utmSource || null,
        utm_medium: body.utmMedium || null,
        utm_campaign: body.utmCampaign || null,
        referral_code: refCode,
      })
      .select("id")
      .single();

    // Also create a lead entry for the CRM (fire-and-forget)
    try {
      const leadResult = await supabase
        .schema("web")
        .from("leads")
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          source: "website",
          source_type: "consultation",
          status: "new",
          referral_code: refCode,
          utm_source: body.utmSource || null,
          utm_medium: body.utmMedium || null,
          utm_campaign: body.utmCampaign || null,
        });

      // If there's a referral code, create a referral record
      if (refCode && !leadResult.error) {
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
            status: "consultation",
          });
        }
      }
    } catch (err) {
      console.error("Lead/referral insert error:", err);
    }

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { success: false, message: "Failed to save your request. Please try again." },
        { status: 500 }
      );
    }

    // Fire-and-forget emails — don't block the response
    Promise.all([
      sendConsultationNotification(data),
      sendConsultationConfirmation(data),
    ]).catch((emailErr) => {
      console.error("Email send error:", emailErr);
    });

    return NextResponse.json({
      success: true,
      message: "Consultation request submitted successfully!",
      id: row?.id,
    });
  } catch (err) {
    console.error("Consultation API error:", err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
