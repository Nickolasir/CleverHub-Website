import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceSupabase } from "@/lib/supabase-service";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });
}

/**
 * POST /api/webhooks/stripe
 * Handles Stripe webhooks for:
 * - transfer.paid: Mark affiliate referral as paid_out
 * - checkout.session.completed: Create order from purchase
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = getServiceSupabase();

  const eventType = event.type as string;

  switch (eventType) {
    case "transfer.paid": {
      const transfer = event.data.object as unknown as Stripe.Transfer;
      const transferId = transfer.id;

      // Mark the referral as paid_out
      await supabase
        .schema("web")
        .from("referrals")
        .update({
          status: "paid_out",
          paid_at: new Date().toISOString(),
        })
        .eq("stripe_transfer_id", transferId);

      break;
    }

    case "checkout.session.completed": {
      const session = event.data.object as unknown as Stripe.Checkout.Session;

      if (session.payment_status === "paid" && session.metadata?.order_id) {
        // Update order status to paid
        await supabase
          .from("orders")
          .update({ status: "paid", stripe_checkout_id: session.id })
          .eq("id", session.metadata.order_id);

        // Check if the ordering user has an affiliate referral
        const orderId = session.metadata.order_id;
        const { data: order } = await supabase
          .from("orders")
          .select("id, user_id")
          .eq("id", orderId)
          .single();

        if (order) {
          // Update any referral linked to this order
          await supabase
            .schema("web")
            .from("referrals")
            .update({ status: "converted", order_id: order.id })
            .eq("referred_email", session.customer_email)
            .in("status", ["lead", "consultation", "clicked"]);
        }
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
