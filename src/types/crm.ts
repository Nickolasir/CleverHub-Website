export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "closed";
export type LeadSourceType = "consultation" | "contact_form" | "affiliate" | "manual";
export type CrmEntityType = "lead" | "affiliate" | "order" | "customer";

export type ContactMethod = "text" | "email" | "call" | "house_visit";
export type ContactDisposition =
  | "no_answer"
  | "left_voicemail"
  | "spoke_with"
  | "sent_message"
  | "scheduled_callback"
  | "interested"
  | "not_interested"
  | "follow_up_needed"
  | "completed_visit"
  | "no_show";

export interface ContactLog {
  id: string;
  entity_type: CrmEntityType;
  entity_id: string;
  contact_method: ContactMethod;
  disposition: ContactDisposition;
  notes: string | null;
  contacted_at: string;
  created_by: string;
  created_at: string;
}

export interface Lead {
  id: string;
  email: string;
  name: string;
  company: string;
  phone: string;
  vertical: string | null;
  unit_count: number | null;
  message: string;
  source: string;
  source_type: LeadSourceType;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  status: LeadStatus;
  assigned_to: string | null;
  follow_up_date: string | null;
  referral_code: string | null;
  converted_user_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CrmNote {
  id: string;
  entity_type: CrmEntityType;
  entity_id: string;
  author_id: string;
  content: string;
  created_at: string;
  author?: {
    email: string;
  };
}

export interface CrmActivity {
  id: string;
  entity_type: CrmEntityType;
  entity_id: string;
  actor_id: string | null;
  action: string;
  details: Record<string, unknown>;
  created_at: string;
  actor?: {
    email: string;
  };
}
