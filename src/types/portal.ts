export interface PortalOrder {
  id: string;
  plan_id: string;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "refunded" | "canceled";
  hardware_total: number;
  tax: number;
  shipping_address: Record<string, unknown>;
  tracking_number: string | null;
  created_at: string;
  updated_at: string;
  plan?: {
    name: string;
    vertical: string;
  };
}

export interface PortalSubscription {
  id: string;
  plan_id: string;
  status: "trialing" | "active" | "past_due" | "canceled" | "paused";
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at: string | null;
  trial_end: string | null;
  created_at: string;
  plan?: {
    name: string;
    monthly_price: number;
  };
}
