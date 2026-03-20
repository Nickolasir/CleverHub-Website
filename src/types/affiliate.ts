export type AffiliateProfession =
  | "real_estate_agent"
  | "interior_decorator"
  | "contractor"
  | "property_manager"
  | "other";

export type AffiliateStatus = "pending" | "approved" | "rejected" | "suspended";
export type PayoutMethod = "manual" | "stripe_connect";
export type ReferralStatus = "clicked" | "lead" | "consultation" | "converted" | "paid_out";

export interface Affiliate {
  id: string;
  user_id: string | null;
  email: string;
  name: string;
  company: string;
  phone: string;
  profession: AffiliateProfession;
  referral_code: string;
  status: AffiliateStatus;
  payout_method: PayoutMethod;
  stripe_account_id: string | null;
  payout_details: Record<string, unknown>;
  notes: string;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Referral {
  id: string;
  affiliate_id: string;
  lead_id: string | null;
  order_id: string | null;
  referred_email: string;
  referred_name: string;
  status: ReferralStatus;
  commission: number;
  stripe_transfer_id: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AffiliateStats {
  totalReferrals: number;
  conversions: number;
  pendingEarnings: number;
  paidEarnings: number;
}

export interface AffiliateSignupData {
  name: string;
  email: string;
  phone: string;
  company: string;
  profession: AffiliateProfession;
}
