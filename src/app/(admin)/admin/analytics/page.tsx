"use client";

import { useEffect, useState, useCallback } from "react";

interface OverviewStats {
  totalSessions: number;
  uniqueVisitors: number;
  returningVisitors: number;
  totalPageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  avgPagesPerSession: number;
  avgTimeOnPage: number;
  avgScrollDepth: number;
  totalEvents: number;
}

interface DailyTrend {
  date: string;
  sessions: number;
  visitors: number;
  pageViews: number;
}

interface TopPage { path: string; views: number }
interface TopReferrer { domain: string; count: number }
interface TrafficSource { source: string; count: number }
interface TopCountry { country: string; code: string; count: number }
interface TopBrowser { browser: string; count: number }
interface TopEvent { name: string; count: number }
interface WebVitals { lcp: number; fcp: number; cls: number; ttfb: number }
interface ConsultationFunnel { views: number; starts: number; submits: number; abandons: number }
interface RecentVisitor {
  visitor_id: string;
  started_at: string;
  duration_ms: number;
  page_count: number;
  device_type: string;
  country: string;
  city: string;
  browser: string;
  os: string;
  referrer_domain: string | null;
  entry_page: string;
  is_bounce: boolean;
}

interface AnalyticsData {
  overview: OverviewStats;
  dailyTrend: DailyTrend[];
  topPages: TopPage[];
  topReferrers: TopReferrer[];
  trafficSources: TrafficSource[];
  devices: Record<string, number>;
  topCountries: TopCountry[];
  topBrowsers: TopBrowser[];
  webVitals: WebVitals;
  consultationFunnel: ConsultationFunnel;
  topEvents: TopEvent[];
  recentVisitors: RecentVisitor[];
}

type Period = "today" | "7d" | "30d" | "90d";

function formatDuration(ms: number): string {
  if (ms < 1000) return "0s";
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

function getVitalRating(metric: string, value: number): { label: string; color: string } {
  const thresholds: Record<string, [number, number]> = {
    lcp: [2500, 4000],
    fcp: [1800, 3000],
    cls: [0.1, 0.25],
    ttfb: [800, 1800],
  };
  const [good, poor] = thresholds[metric] || [0, 0];
  if (value <= good) return { label: "Good", color: "text-green-600" };
  if (value <= poor) return { label: "Needs Work", color: "text-amber-600" };
  return { label: "Poor", color: "text-red-600" };
}

// Simple bar chart component (no external deps)
function BarChart({
  data,
  labelKey,
  valueKey,
  maxBars = 10,
  color = "bg-accent",
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  labelKey: string;
  valueKey: string;
  maxBars?: number;
  color?: string;
}) {
  const items = data.slice(0, maxBars);
  const maxVal = Math.max(...items.map((d) => (d[valueKey] as number) || 0), 1);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="w-32 truncate text-xs text-muted" title={String(item[labelKey])}>
            {String(item[labelKey])}
          </span>
          <div className="flex-1">
            <div className="h-5 overflow-hidden rounded-full bg-section-alt">
              <div
                className={`h-full rounded-full ${color} transition-all`}
                style={{ width: `${((item[valueKey] as number) / maxVal) * 100}%` }}
              />
            </div>
          </div>
          <span className="w-10 text-right text-xs font-semibold text-foreground">
            {formatNumber(item[valueKey] as number)}
          </span>
        </div>
      ))}
      {items.length === 0 && (
        <p className="py-4 text-center text-xs text-muted">No data yet</p>
      )}
    </div>
  );
}

// Sparkline chart for daily trend
function Sparkline({ data, dataKey, height = 60 }: { data: DailyTrend[]; dataKey: keyof DailyTrend; height?: number }) {
  if (data.length < 2) return <p className="py-4 text-center text-xs text-muted">Not enough data</p>;

  const values = data.map((d) => d[dataKey] as number);
  const max = Math.max(...values, 1);
  const min = Math.min(...values);
  const range = max - min || 1;
  const width = 100;

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4);
    return `${x},${y}`;
  });

  const areaPoints = [
    `0,${height}`,
    ...points,
    `${width},${height}`,
  ].join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
      <polygon points={areaPoints} fill="rgba(212, 168, 67, 0.1)" />
      <polyline points={points.join(" ")} fill="none" stroke="#D4A843" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function AnalyticsDashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [period, setPeriod] = useState<Period>("30d");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "audience" | "acquisition" | "behavior" | "vitals">("overview");

  const fetchData = useCallback((p: Period) => {
    setLoading(true);
    fetch(`/api/admin/analytics?period=${p}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData(period);
  }, [period, fetchData]);

  if (loading && !data) {
    return <p className="text-sm text-muted">Loading analytics...</p>;
  }

  if (!data?.overview) {
    return <p className="text-sm text-muted">No analytics data available yet. Visit some pages to start tracking.</p>;
  }

  const o = data.overview;
  const periods: { label: string; value: Period }[] = [
    { label: "Today", value: "today" },
    { label: "7 Days", value: "7d" },
    { label: "30 Days", value: "30d" },
    { label: "90 Days", value: "90d" },
  ];

  const tabs = [
    { label: "Overview", value: "overview" as const },
    { label: "Audience", value: "audience" as const },
    { label: "Acquisition", value: "acquisition" as const },
    { label: "Behavior", value: "behavior" as const },
    { label: "Web Vitals", value: "vitals" as const },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
          Site Analytics
        </h1>

        {/* Period selector */}
        <div className="flex gap-1 rounded-xl bg-section-alt p-1">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                period === p.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 border-b border-card-border">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === tab.value
                ? "border-accent text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* =============== OVERVIEW TAB =============== */}
      {activeTab === "overview" && (
        <>
          {/* KPI Cards */}
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { label: "Unique Visitors", value: formatNumber(o.uniqueVisitors), sub: `${o.returningVisitors} returning` },
              { label: "Total Sessions", value: formatNumber(o.totalSessions) },
              { label: "Page Views", value: formatNumber(o.totalPageViews) },
              { label: "Bounce Rate", value: `${o.bounceRate}%`, sub: o.bounceRate > 60 ? "High" : "Healthy" },
              { label: "Avg Duration", value: formatDuration(o.avgSessionDuration) },
            ].map((card) => (
              <div key={card.label} className="rounded-2xl border border-card-border bg-card p-5 shadow-[var(--shadow-card)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">{card.label}</p>
                <p className="mt-2 font-[var(--font-outfit)] text-3xl font-bold text-foreground">{card.value}</p>
                {card.sub && <p className="mt-1 text-xs text-muted">{card.sub}</p>}
              </div>
            ))}
          </div>

          {/* Daily trend chart */}
          <div className="mb-6 rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 font-[var(--font-outfit)] text-base font-semibold text-foreground">
              Traffic Trend
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">Visitors</p>
                <Sparkline data={data.dailyTrend} dataKey="visitors" height={80} />
              </div>
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">Sessions</p>
                <Sparkline data={data.dailyTrend} dataKey="sessions" height={80} />
              </div>
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">Page Views</p>
                <Sparkline data={data.dailyTrend} dataKey="pageViews" height={80} />
              </div>
            </div>
            {/* Daily numbers */}
            {data.dailyTrend.length > 0 && (
              <div className="mt-4 max-h-48 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-card">
                    <tr className="text-left text-muted">
                      <th className="pb-2 font-medium">Date</th>
                      <th className="pb-2 text-right font-medium">Visitors</th>
                      <th className="pb-2 text-right font-medium">Sessions</th>
                      <th className="pb-2 text-right font-medium">Page Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...data.dailyTrend].reverse().map((day) => (
                      <tr key={day.date} className="border-t border-card-border/50">
                        <td className="py-1.5 text-foreground">{day.date}</td>
                        <td className="py-1.5 text-right text-foreground">{day.visitors}</td>
                        <td className="py-1.5 text-right text-foreground">{day.sessions}</td>
                        <td className="py-1.5 text-right text-foreground">{day.pageViews}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Top pages + consultation funnel */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="mb-4 font-[var(--font-outfit)] text-base font-semibold text-foreground">Top Pages</h2>
              <BarChart data={data.topPages} labelKey="path" valueKey="views" />
            </div>

            <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="mb-4 font-[var(--font-outfit)] text-base font-semibold text-foreground">Consultation Funnel</h2>
              {data.consultationFunnel.views === 0 ? (
                <p className="py-4 text-center text-xs text-muted">No consultation data yet</p>
              ) : (
                <div className="space-y-3">
                  {[
                    { label: "Viewed", value: data.consultationFunnel.views, color: "bg-blue-400" },
                    { label: "Started", value: data.consultationFunnel.starts, color: "bg-amber-400" },
                    { label: "Submitted", value: data.consultationFunnel.submits, color: "bg-green-500" },
                    { label: "Abandoned", value: data.consultationFunnel.abandons, color: "bg-red-400" },
                  ].map((step) => {
                    const pct = data.consultationFunnel.views > 0
                      ? Math.round((step.value / data.consultationFunnel.views) * 100)
                      : 0;
                    return (
                      <div key={step.label}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs text-muted">{step.label}</span>
                          <span className="text-xs font-semibold text-foreground">{step.value} ({pct}%)</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-section-alt">
                          <div className={`h-full rounded-full ${step.color}`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* =============== AUDIENCE TAB =============== */}
      {activeTab === "audience" && (
        <>
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Device breakdown */}
            <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="mb-4 font-[var(--font-outfit)] text-base font-semibold text-foreground">Devices</h2>
              {Object.entries(data.devices).map(([device, count]) => {
                const total = Object.values(data.devices).reduce((a, b) => a + b, 0) || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={device} className="mb-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs capitalize text-muted">{device}</span>
                      <span className="text-xs font-semibold text-foreground">{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-section-alt">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Browsers */}
            <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="mb-4 font-[var(--font-outfit)] text-base font-semibold text-foreground">Browsers</h2>
              <BarChart data={data.topBrowsers} labelKey="browser" valueKey="count" />
            </div>

            {/* Countries */}
            <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="mb-4 font-[var(--font-outfit)] text-base font-semibold text-foreground">Countries</h2>
              <BarChart data={data.topCountries} labelKey="country" valueKey="count" />
            </div>
          </div>

          {/* Recent visitors live feed */}
          <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 font-[var(--font-outfit)] text-base font-semibold text-foreground">Recent Visitors</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-muted">
                    <th className="pb-2 pr-4 font-medium">Time</th>
                    <th className="pb-2 pr-4 font-medium">Location</th>
                    <th className="pb-2 pr-4 font-medium">Device</th>
                    <th className="pb-2 pr-4 font-medium">Browser / OS</th>
                    <th className="pb-2 pr-4 font-medium">Entry Page</th>
                    <th className="pb-2 pr-4 font-medium">Source</th>
                    <th className="pb-2 pr-4 font-medium">Pages</th>
                    <th className="pb-2 pr-4 font-medium">Duration</th>
                    <th className="pb-2 font-medium">Bounce</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentVisitors.map((v, i) => (
                    <tr key={i} className="border-t border-card-border/50">
                      <td className="py-2 pr-4 text-foreground">
                        {new Date(v.started_at).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-2 pr-4 text-foreground">
                        {v.city && v.country ? `${v.city}, ${v.country}` : v.country || "—"}
                      </td>
                      <td className="py-2 pr-4 capitalize text-foreground">{v.device_type || "—"}</td>
                      <td className="py-2 pr-4 text-foreground">{v.browser} / {v.os}</td>
                      <td className="py-2 pr-4 font-mono text-foreground">{v.entry_page}</td>
                      <td className="py-2 pr-4 text-foreground">{v.referrer_domain || "Direct"}</td>
                      <td className="py-2 pr-4 text-center text-foreground">{v.page_count}</td>
                      <td className="py-2 pr-4 text-foreground">{formatDuration(v.duration_ms || 0)}</td>
                      <td className="py-2">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          v.is_bounce ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                        }`}>
                          {v.is_bounce ? "Yes" : "No"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.recentVisitors.length === 0 && (
                <p className="py-4 text-center text-xs text-muted">No visitors recorded yet</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* =============== ACQUISITION TAB =============== */}
      {activeTab === "acquisition" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 font-[var(--font-outfit)] text-base font-semibold text-foreground">Traffic Sources</h2>
            <BarChart data={data.trafficSources} labelKey="source" valueKey="count" />
          </div>

          <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 font-[var(--font-outfit)] text-base font-semibold text-foreground">Top Referrers</h2>
            <BarChart data={data.topReferrers} labelKey="domain" valueKey="count" />
          </div>
        </div>
      )}

      {/* =============== BEHAVIOR TAB =============== */}
      {activeTab === "behavior" && (
        <>
          {/* Engagement metrics */}
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Avg Pages/Session", value: o.avgPagesPerSession.toString() },
              { label: "Avg Time on Page", value: formatDuration(o.avgTimeOnPage) },
              { label: "Avg Scroll Depth", value: `${o.avgScrollDepth}%` },
              { label: "Total Events", value: formatNumber(o.totalEvents) },
            ].map((card) => (
              <div key={card.label} className="rounded-2xl border border-card-border bg-card p-5 shadow-[var(--shadow-card)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">{card.label}</p>
                <p className="mt-2 font-[var(--font-outfit)] text-3xl font-bold text-foreground">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="mb-4 font-[var(--font-outfit)] text-base font-semibold text-foreground">Top Pages</h2>
              <BarChart data={data.topPages} labelKey="path" valueKey="views" />
            </div>

            <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="mb-4 font-[var(--font-outfit)] text-base font-semibold text-foreground">Top Events</h2>
              <BarChart data={data.topEvents} labelKey="name" valueKey="count" color="bg-blue-400" />
            </div>
          </div>
        </>
      )}

      {/* =============== WEB VITALS TAB =============== */}
      {activeTab === "vitals" && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            { key: "lcp", label: "Largest Contentful Paint (LCP)", value: data.webVitals.lcp, unit: "ms", desc: "Time until the largest visible content renders" },
            { key: "fcp", label: "First Contentful Paint (FCP)", value: data.webVitals.fcp, unit: "ms", desc: "Time until the first text/image renders" },
            { key: "cls", label: "Cumulative Layout Shift (CLS)", value: data.webVitals.cls, unit: "", desc: "Visual stability — lower is better" },
            { key: "ttfb", label: "Time to First Byte (TTFB)", value: data.webVitals.ttfb, unit: "ms", desc: "Server response time" },
          ].map((vital) => {
            const rating = getVitalRating(vital.key, vital.value);
            return (
              <div key={vital.key} className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
                <h3 className="mb-1 font-[var(--font-outfit)] text-sm font-semibold text-foreground">{vital.label}</h3>
                <p className="mb-3 text-xs text-muted">{vital.desc}</p>
                <div className="flex items-end gap-2">
                  <span className="font-[var(--font-outfit)] text-4xl font-bold text-foreground">
                    {vital.key === "cls" ? vital.value.toFixed(3) : Math.round(vital.value)}
                  </span>
                  {vital.unit && <span className="mb-1 text-sm text-muted">{vital.unit}</span>}
                </div>
                <span className={`mt-2 inline-block text-xs font-semibold ${rating.color}`}>
                  {rating.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
