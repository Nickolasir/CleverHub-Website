import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { AffiliateClient } from "./AffiliateClient";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Affiliate Program — $250 or 10% per referral",
  description:
    "Refer homebuilders, designers, agents, and property managers to CleverHub. Earn $250 or 10% of the sale — whichever is greater — for every referral that converts. No cap, 30-day cookie, paid by Stripe or check.",
  alternates: { canonical: "/affiliate" },
  openGraph: {
    title: "CleverHub Affiliate Program — $250 or 10%, whichever is greater",
    description:
      "A commission of $250 or 10% of the sale, whichever is greater, for every referral that becomes a CleverHub customer. Open to real estate agents, designers, contractors, and property managers.",
    url: "/affiliate",
  },
};

export default function AffiliatePage() {
  return (
    <div className={fraunces.variable}>
      <AffiliateClient />
    </div>
  );
}
