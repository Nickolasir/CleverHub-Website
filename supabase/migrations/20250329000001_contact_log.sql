-- ============================================================
-- Contact Log: tracks outreach attempts for leads & affiliates
-- Methods: text, email, call (+ house_visit for leads only)
-- ============================================================

CREATE TABLE IF NOT EXISTS web.crm_contact_log (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type   text NOT NULL CHECK (entity_type IN ('lead', 'affiliate')),
  entity_id     uuid NOT NULL,
  contact_method text NOT NULL CHECK (contact_method IN ('text', 'email', 'call', 'house_visit')),
  disposition   text NOT NULL CHECK (disposition IN (
    'no_answer', 'left_voicemail', 'spoke_with', 'sent_message',
    'scheduled_callback', 'interested', 'not_interested', 'follow_up_needed',
    'completed_visit', 'no_show'
  )),
  notes         text,
  contacted_at  timestamptz NOT NULL DEFAULT now(),
  created_by    uuid REFERENCES auth.users(id),
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Indexes for fast lookups
CREATE INDEX idx_contact_log_entity ON web.crm_contact_log(entity_type, entity_id);
CREATE INDEX idx_contact_log_method ON web.crm_contact_log(contact_method);
CREATE INDEX idx_contact_log_date ON web.crm_contact_log(contacted_at DESC);

-- RLS
ALTER TABLE web.crm_contact_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "CRM admins can manage contact logs"
  ON web.crm_contact_log
  FOR ALL
  USING (
    EXISTS (SELECT 1 FROM web.crm_admins WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM web.crm_admins WHERE user_id = auth.uid())
  );

-- Prevent house_visit on affiliates (enforce at DB level)
CREATE OR REPLACE FUNCTION web.check_contact_method()
RETURNS trigger AS $$
BEGIN
  IF NEW.entity_type = 'affiliate' AND NEW.contact_method = 'house_visit' THEN
    RAISE EXCEPTION 'house_visit contact method is not available for affiliates';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_contact_method
  BEFORE INSERT OR UPDATE ON web.crm_contact_log
  FOR EACH ROW
  EXECUTE FUNCTION web.check_contact_method();
