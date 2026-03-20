import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@/lib/supabase/server";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });
}

/**
 * POST /api/admin/affiliates/[id]/payouts
 * Mark a referral as paid (manual) or trigger a Stripe Connect transfer.
 * Body: { referral_id: string }
 */
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

  const { id: affiliateId } = await params;
  const { referral_id } = await request.json();

  if (!referral_id) {
    return NextResponse.json({ error: "Missing referral_id" }, { status: 400 });
  }

  // Get affiliate and referral
  const { data: affiliate } = await supabase
    .schema("web")
    .from("affiliates")
    .select("id, payout_method, stripe_account_id")
    .eq("id", affiliateId)
    .single();

  if (!affiliate) {
    return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
  }

  const { data: referral } = await supabase
    .schema("web")
    .from("referrals")
    .select("id, status, commission")
    .eq("id", referral_id)
    .eq("affiliate_id", affiliateId)
    .single();

  if (!referral || referral.status !== "converted") {
    return NextResponse.json(
      { error: "Referral not found or not in converted status" },
      { status: 400 }
    );
  }

  // If Stripe Connect, initiate transfer
  if (affiliate.payout_method === "stripe_connect" && affiliate.stripe_account_id) {
    try {
      const stripe = getStripe();
      const transfer = await stripe.transfers.create({
        amount: Math.round(Number(referral.commission) * 100), // cents
        currency: "usd",
        destination: affiliate.stripe_account_id,
        metadata: { referral_id: referral.id, affiliate_id: affiliate.id },
      });

      await supabase
        .schema("web")
        .from("referrals")
        .update({
          stripe_transfer_id: transfer.id,
          // Status will be set to paid_out by the webhook when transfer completes
        })
        .eq("id", referral.id);

      return NextResponse.json({ success: true, method: "stripe", transfer_id: transfer.id });
    } catch (err) {
      console.error("Stripe transfer error:", err);
      return NextResponse.json({ error: "Stripe transfer failed" }, { status: 500 });
    }
  }

  // Manual payout — just mark as paid
  await supabase
    .schema("web")
    .from("referrals")
    .update({ status: "paid_out", paid_at: new Date().toISOString() })
    .eq("id", referral.id);

  await supabase.schema("web").from("crm_activities").insert({
    entity_type: "affiliate",
    entity_id: affiliateId,
    actor_id: user.id,
    action: "payout_processed",
    details: { referral_id, method: "manual", amount: referral.commission },
  });

  return NextResponse.json({ success: true, method: "manual" });
}
