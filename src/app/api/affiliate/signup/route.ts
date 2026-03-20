import { NextRequest, NextResponse } from "next/server";
import { affiliateSignupSchema } from "@/lib/validation-affiliate";
import { getServiceSupabase } from "@/lib/supabase-service";

function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // No I/O/1/0 for clarity
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = affiliateSignupSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { success: false, message: firstError.message },
        { status: 400 }
      );
    }

    const data = result.data;
    const supabase = getServiceSupabase();

    // Check for existing affiliate with same email
    const { data: existing } = await supabase
      .schema("web")
      .from("affiliates")
      .select("id")
      .eq("email", data.email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { success: false, message: "An affiliate application with this email already exists." },
        { status: 409 }
      );
    }

    // Generate unique referral code (retry on collision)
    let referralCode = generateReferralCode();
    let attempts = 0;
    while (attempts < 5) {
      const { data: codeExists } = await supabase
        .schema("web")
        .from("affiliates")
        .select("id")
        .eq("referral_code", referralCode)
        .maybeSingle();

      if (!codeExists) break;
      referralCode = generateReferralCode();
      attempts++;
    }

    const { data: affiliate, error: dbError } = await supabase
      .schema("web")
      .from("affiliates")
      .insert({
        email: data.email,
        name: data.name,
        phone: data.phone,
        company: data.company ?? "",
        profession: data.profession,
        referral_code: referralCode,
        status: "pending",
        payout_method: "manual",
      })
      .select("id, referral_code")
      .single();

    if (dbError) {
      console.error("Affiliate insert error:", dbError);
      return NextResponse.json(
        { success: false, message: "Failed to submit application. Please try again." },
        { status: 500 }
      );
    }

    // TODO: Send notification email to admin + confirmation to applicant (Phase 5)

    return NextResponse.json({
      success: true,
      message: "Application submitted! We'll review it within 1-2 business days.",
      id: affiliate?.id,
    });
  } catch (err) {
    console.error("Affiliate signup error:", err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
