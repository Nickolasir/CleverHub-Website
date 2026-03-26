-- ============================================================
-- CleverHub Analytics Schema
-- Tracks visits, sessions, events, and web vitals
-- ============================================================

-- Sessions: one per visitor browser session
CREATE TABLE IF NOT EXISTS web.analytics_sessions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id    text NOT NULL,                    -- fingerprint-based visitor ID (persisted in cookie)
  started_at    timestamptz NOT NULL DEFAULT now(),
  ended_at      timestamptz,
  duration_ms   integer DEFAULT 0,
  is_bounce     boolean DEFAULT true,             -- true until 2nd page_view
  page_count    integer DEFAULT 0,
  entry_page    text,
  exit_page     text,

  -- Traffic source
  referrer      text,
  referrer_domain text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_term      text,
  utm_content   text,

  -- Device
  device_type   text,  -- mobile / tablet / desktop
  browser       text,
  browser_version text,
  os            text,
  os_version    text,
  screen_width  integer,
  screen_height integer,
  viewport_width  integer,
  viewport_height integer,
  language      text,
  timezone      text,
  touch_support boolean DEFAULT false,
  connection_type text, -- 4g, 3g, wifi, etc.

  -- Geo (enriched server-side from IP)
  ip_address    inet,
  country       text,
  country_code  text,
  region        text,
  city          text,
  latitude      double precision,
  longitude     double precision,
  isp           text,

  -- Auth (optional link to logged-in user)
  user_id       uuid REFERENCES auth.users(id) ON DELETE SET NULL,

  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Page views: one per page navigation
CREATE TABLE IF NOT EXISTS web.analytics_page_views (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    uuid NOT NULL REFERENCES web.analytics_sessions(id) ON DELETE CASCADE,
  visitor_id    text NOT NULL,
  page_path     text NOT NULL,
  page_title    text,
  page_url      text,
  previous_page text,                             -- in-session navigation flow

  -- Engagement
  time_on_page_ms integer,
  scroll_depth    integer,  -- 0-100 percentage
  is_exit         boolean DEFAULT false,

  -- Performance (Web Vitals)
  lcp           double precision,  -- Largest Contentful Paint (ms)
  fid           double precision,  -- First Input Delay (ms)
  cls           double precision,  -- Cumulative Layout Shift
  fcp           double precision,  -- First Contentful Paint (ms)
  ttfb          double precision,  -- Time To First Byte (ms)
  inp           double precision,  -- Interaction to Next Paint (ms)

  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Events: clicks, form interactions, custom events
CREATE TABLE IF NOT EXISTS web.analytics_events (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    uuid NOT NULL REFERENCES web.analytics_sessions(id) ON DELETE CASCADE,
  visitor_id    text NOT NULL,
  page_path     text NOT NULL,
  event_name    text NOT NULL,   -- e.g. 'cta_click', 'form_start', 'form_submit', 'outbound_link'
  event_category text,           -- e.g. 'engagement', 'conversion', 'navigation'
  event_label   text,            -- e.g. button text, form name, link URL
  event_value   double precision,
  metadata      jsonb DEFAULT '{}',

  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX idx_sessions_visitor ON web.analytics_sessions(visitor_id);
CREATE INDEX idx_sessions_started ON web.analytics_sessions(started_at DESC);
CREATE INDEX idx_sessions_country ON web.analytics_sessions(country_code);
CREATE INDEX idx_sessions_device ON web.analytics_sessions(device_type);
CREATE INDEX idx_sessions_utm ON web.analytics_sessions(utm_source, utm_medium, utm_campaign);

CREATE INDEX idx_page_views_session ON web.analytics_page_views(session_id);
CREATE INDEX idx_page_views_path ON web.analytics_page_views(page_path);
CREATE INDEX idx_page_views_created ON web.analytics_page_views(created_at DESC);

CREATE INDEX idx_events_session ON web.analytics_events(session_id);
CREATE INDEX idx_events_name ON web.analytics_events(event_name);
CREATE INDEX idx_events_created ON web.analytics_events(created_at DESC);
CREATE INDEX idx_events_category ON web.analytics_events(event_category);

-- RLS policies: anon can insert (tracking), admins can read
ALTER TABLE web.analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE web.analytics_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE web.analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking beacon)
CREATE POLICY analytics_sessions_insert ON web.analytics_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY analytics_page_views_insert ON web.analytics_page_views FOR INSERT WITH CHECK (true);
CREATE POLICY analytics_events_insert ON web.analytics_events FOR INSERT WITH CHECK (true);

-- Allow service role full access (for API routes and admin dashboard)
CREATE POLICY analytics_sessions_service ON web.analytics_sessions FOR ALL USING (
  (SELECT current_setting('request.jwt.claims', true)::json->>'role' = 'service_role')
);
CREATE POLICY analytics_page_views_service ON web.analytics_page_views FOR ALL USING (
  (SELECT current_setting('request.jwt.claims', true)::json->>'role' = 'service_role')
);
CREATE POLICY analytics_events_service ON web.analytics_events FOR ALL USING (
  (SELECT current_setting('request.jwt.claims', true)::json->>'role' = 'service_role')
);

-- Materialized view for daily aggregates (refresh via cron or on-demand)
CREATE MATERIALIZED VIEW IF NOT EXISTS web.analytics_daily_stats AS
SELECT
  date_trunc('day', s.started_at)::date AS day,
  COUNT(DISTINCT s.id)                  AS total_sessions,
  COUNT(DISTINCT s.visitor_id)          AS unique_visitors,
  COUNT(pv.id)                          AS total_page_views,
  AVG(s.duration_ms)                    AS avg_session_duration_ms,
  AVG(s.page_count)                     AS avg_pages_per_session,
  COUNT(DISTINCT s.id) FILTER (WHERE s.is_bounce) AS bounce_count,
  ROUND(
    COUNT(DISTINCT s.id) FILTER (WHERE s.is_bounce)::numeric /
    NULLIF(COUNT(DISTINCT s.id), 0) * 100, 1
  )                                     AS bounce_rate
FROM web.analytics_sessions s
LEFT JOIN web.analytics_page_views pv ON pv.session_id = s.id
GROUP BY 1
WITH DATA;

CREATE UNIQUE INDEX idx_daily_stats_day ON web.analytics_daily_stats(day);
