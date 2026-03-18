import { NextRequest, NextResponse } from "next/server";
import { consultationSchema } from "@/lib/validation";
import { getServiceSupabase } from "@/lib/supabase-server";
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
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { success: false, message: "Failed to save your request. Please try again." },
        { status: 500 }
      );
    }

    // Send emails (non-blocking — don't fail the request if email fails)
    try {
      await Promise.all([
        sendConsultationNotification(data),
        sendConsultationConfirmation(data),
      ]);
    } catch (emailErr) {
      console.error("Email send error:", emailErr);
      // Still return success — the form data was saved
    }

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
