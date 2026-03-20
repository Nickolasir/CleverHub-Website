import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@/lib/supabase/server";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });
}

/**
 * POST /api/affiliate/connect
 * Creates a Stripe Connect onboarding link for the affiliate.
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get affiliate record
    const { data: affiliate } = await supabase
      .schema("web")
      .from("affiliates")
      .select("id, stripe_account_id, status")
      .eq("user_id", user.id)
      .single();

    if (!affiliate || affiliate.status !== "approved") {
      return NextResponse.json(
        { error: "Affiliate not found or not approved" },
        { status: 403 }
      );
    }

    const stripe = getStripe();
    let accountId = affiliate.stripe_account_id;

    // Create Stripe Connect account if not exists
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        email: user.email,
        capabilities: {
          transfers: { requested: true },
        },
      });
      accountId = account.id;

      await supabase
        .schema("web")
        .from("affiliates")
        .update({
          stripe_account_id: accountId,
          payout_method: "stripe_connect",
        })
        .eq("id", affiliate.id);
    }

    // Create onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${request.nextUrl.origin}/portal/affiliates?stripe=refresh`,
      return_url: `${request.nextUrl.origin}/portal/affiliates?stripe=success`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (err) {
    console.error("Stripe Connect error:", err);
    return NextResponse.json(
      { error: "Failed to create onboarding link" },
      { status: 500 }
    );
  }
}
