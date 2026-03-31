-- ============================================================
-- Import Lists: tracks Excel/CSV uploads for bulk contact import
-- ============================================================

CREATE TABLE IF NOT EXISTS web.import_lists (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  target_type   text NOT NULL CHECK (target_type IN ('lead', 'affiliate')),
  file_name     text NOT NULL,
  total_rows    integer NOT NULL DEFAULT 0,
  imported_rows integer NOT NULL DEFAULT 0,
  skipped_rows  integer NOT NULL DEFAULT 0,
  errors        jsonb DEFAULT '[]'::jsonb,
  status        text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  uploaded_by   uuid REFERENCES auth.users(id),
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_import_lists_type ON web.import_lists(target_type);
CREATE INDEX idx_import_lists_date ON web.import_lists(created_at DESC);

ALTER TABLE web.import_lists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "CRM admins can manage import lists"
  ON web.import_lists
  FOR ALL
  USING (
    EXISTS (SELECT 1 FROM web.crm_admins WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM web.crm_admins WHERE user_id = auth.uid())
  );

-- Track which list each lead/affiliate came from
ALTER TABLE web.leads ADD COLUMN IF NOT EXISTS import_list_id uuid REFERENCES web.import_lists(id);
ALTER TABLE web.affiliates ADD COLUMN IF NOT EXISTS import_list_id uuid REFERENCES web.import_lists(id);
