import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-service";

/**
 * Admin analytics API — returns aggregated metrics for the dashboard.
 *
 * GET /api/admin/analytics?period=7d|30d|90d|today
 */

export async function GET(request: NextRequest) {
  const period = request.nextUrl.searchParams.get("period") || "30d";
  const supabase = getServiceSupabase();

  // Calculate date range
  const now = new Date();
  let startDate: Date;
  switch (period) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "7d":
      startDate = new Date(now.getTime() - 7 * 86400000);
      break;
    case "90d":
      startDate = new Date(now.getTime() - 90 * 86400000);
      break;
    case "30d":
    default:
      startDate = new Date(now.getTime() - 30 * 86400000);
  }

  const startISO = startDate.toISOString();

  try {
    // Fetch all data in parallel
    const [
      sessionsRes,
      pageViewsRes,
      eventsRes,
      topPagesRes,
      topReferrersRes,
      deviceBreakdownRes,
      countryBreakdownRes,
      browserBreakdownRes,
      recentVisitorsRes,
      consultationEventsRes,
    ] = await Promise.all([
      // Sessions in period
      supabase
        .schema("web")
        .from("analytics_sessions")
        .select("id, visitor_id, started_at, duration_ms, is_bounce, page_count, device_type, country, country_code, city, browser, os, referrer_domain, utm_source, utm_medium, entry_page, exit_page")
        .gte("started_at", startISO)
        .order("started_at", { ascending: false }),

      // Page views in period
      supabase
        .schema("web")
        .from("analytics_page_views")
        .select("id, page_path, page_title, time_on_page_ms, scroll_depth, lcp, fid, cls, fcp, ttfb, created_at")
        .gte("created_at", startISO),

      // Events in period
      supabase
        .schema("web")
        .from("analytics_events")
        .select("id, event_name, event_category, event_label, page_path, created_at")
        .gte("created_at", startISO),

      // Top pages
      supabase
        .schema("web")
        .from("analytics_page_views")
        .select("page_path")
        .gte("created_at", startISO),

      // Top referrers
      supabase
        .schema("web")
        .from("analytics_sessions")
        .select("referrer_domain")
        .gte("started_at", startISO)
        .not("referrer_domain", "is", null),

      // Device breakdown
      supabase
        .schema("web")
        .from("analytics_sessions")
        .select("device_type")
        .gte("started_at", startISO),

      // Country breakdown
      supabase
        .schema("web")
        .from("analytics_sessions")
        .select("country, country_code")
        .gte("started_at", startISO)
        .not("country", "is", null),

      // Browser breakdown
      supabase
        .schema("web")
        .from("analytics_sessions")
        .select("browser")
        .gte("started_at", startISO),

      // Recent visitors (last 20)
      supabase
        .schema("web")
        .from("analytics_sessions")
        .select("visitor_id, started_at, duration_ms, page_count, device_type, country, city, browser, os, referrer_domain, entry_page, is_bounce")
        .order("started_at", { ascending: false })
        .limit(20),

      // Consultation funnel events
      supabase
        .schema("web")
        .from("analytics_events")
        .select("event_name, created_at")
        .like("event_name", "consultation_%")
        .gte("created_at", startISO),
    ]);

    const sessions = sessionsRes.data || [];
    const pageViews = pageViewsRes.data || [];
    const events = eventsRes.data || [];

    // ---- Compute aggregates ----

    // Overview metrics
    const totalSessions = sessions.length;
    const uniqueVisitors = new Set(sessions.map((s) => s.visitor_id)).size;
    const totalPageViews = pageViews.length;
    const bounceSessions = sessions.filter((s) => s.is_bounce).length;
    const bounceRate = totalSessions > 0 ? Math.round((bounceSessions / totalSessions) * 100) : 0;
    const avgSessionDuration = totalSessions > 0
      ? Math.round(sessions.reduce((sum, s) => sum + (s.duration_ms || 0), 0) / totalSessions)
      : 0;
    const avgPagesPerSession = totalSessions > 0
      ? Math.round((sessions.reduce((sum, s) => sum + (s.page_count || 0), 0) / totalSessions) * 10) / 10
      : 0;

    // Returning visitors
    const visitorSessionCounts: Record<string, number> = {};
    for (const s of sessions) {
      visitorSessionCounts[s.visitor_id] = (visitorSessionCounts[s.visitor_id] || 0) + 1;
    }
    const returningVisitors = Object.values(visitorSessionCounts).filter((c) => c > 1).length;

    // Top pages
    const pageCounts: Record<string, number> = {};
    for (const pv of topPagesRes.data || []) {
      pageCounts[pv.page_path] = (pageCounts[pv.page_path] || 0) + 1;
    }
    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, views]) => ({ path, views }));

    // Top referrers
    const refCounts: Record<string, number> = {};
    for (const r of topReferrersRes.data || []) {
      if (r.referrer_domain) {
        refCounts[r.referrer_domain] = (refCounts[r.referrer_domain] || 0) + 1;
      }
    }
    const topReferrers = Object.entries(refCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([domain, count]) => ({ domain, count }));

    // Device breakdown
    const deviceCounts: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0 };
    for (const d of deviceBreakdownRes.data || []) {
      deviceCounts[d.device_type] = (deviceCounts[d.device_type] || 0) + 1;
    }

    // Country breakdown
    const countryCounts: Record<string, { count: number; code: string }> = {};
    for (const c of countryBreakdownRes.data || []) {
      if (c.country) {
        if (!countryCounts[c.country]) countryCounts[c.country] = { count: 0, code: c.country_code };
        countryCounts[c.country].count++;
      }
    }
    const topCountries = Object.entries(countryCounts)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 10)
      .map(([country, data]) => ({ country, code: data.code, count: data.count }));

    // Browser breakdown
    const browserCounts: Record<string, number> = {};
    for (const b of browserBreakdownRes.data || []) {
      if (b.browser) browserCounts[b.browser] = (browserCounts[b.browser] || 0) + 1;
    }
    const topBrowsers = Object.entries(browserCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([browser, count]) => ({ browser, count }));

    // UTM source breakdown
    const utmCounts: Record<string, number> = {};
    for (const s of sessions) {
      const source = s.utm_source || (s.referrer_domain ? "referral" : "direct");
      utmCounts[source] = (utmCounts[source] || 0) + 1;
    }
    const trafficSources = Object.entries(utmCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([source, count]) => ({ source, count }));

    // Daily trend (for chart)
    const dailyMap: Record<string, { sessions: number; visitors: Set<string>; pageViews: number }> = {};
    for (const s of sessions) {
      const day = s.started_at.slice(0, 10);
      if (!dailyMap[day]) dailyMap[day] = { sessions: 0, visitors: new Set(), pageViews: 0 };
      dailyMap[day].sessions++;
      dailyMap[day].visitors.add(s.visitor_id);
    }
    for (const pv of pageViews) {
      const day = pv.created_at.slice(0, 10);
      if (dailyMap[day]) dailyMap[day].pageViews++;
    }
    const dailyTrend = Object.entries(dailyMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, data]) => ({
        date,
        sessions: data.sessions,
        visitors: data.visitors.size,
        pageViews: data.pageViews,
      }));

    // Web vitals averages
    const vitalsData = pageViews.filter((pv) => pv.lcp || pv.fcp || pv.cls || pv.ttfb);
    const avgVitals = {
      lcp: avg(vitalsData.map((v) => v.lcp).filter(Boolean) as number[]),
      fcp: avg(vitalsData.map((v) => v.fcp).filter(Boolean) as number[]),
      cls: avg(vitalsData.map((v) => v.cls).filter(Boolean) as number[], 3),
      ttfb: avg(vitalsData.map((v) => v.ttfb).filter(Boolean) as number[]),
    };

    // Average time on page and scroll depth
    const avgTimeOnPage = avg(pageViews.map((pv) => pv.time_on_page_ms).filter(Boolean) as number[]);
    const avgScrollDepth = avg(pageViews.map((pv) => pv.scroll_depth).filter(Boolean) as number[]);

    // Consultation funnel
    const funnelEvents = consultationEventsRes.data || [];
    const consultationFunnel = {
      views: funnelEvents.filter((e) => e.event_name === "consultation_view").length,
      starts: funnelEvents.filter((e) => e.event_name === "consultation_start").length,
      submits: funnelEvents.filter((e) => e.event_name === "consultation_submit").length,
      abandons: funnelEvents.filter((e) => e.event_name === "consultation_abandon").length,
    };

    // Top events
    const eventCounts: Record<string, number> = {};
    for (const e of events) {
      eventCounts[e.event_name] = (eventCounts[e.event_name] || 0) + 1;
    }
    const topEvents = Object.entries(eventCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      period,
      overview: {
        totalSessions,
        uniqueVisitors,
        returningVisitors,
        totalPageViews,
        bounceRate,
        avgSessionDuration,
        avgPagesPerSession,
        avgTimeOnPage,
        avgScrollDepth,
        totalEvents: events.length,
      },
      dailyTrend,
      topPages,
      topReferrers,
      trafficSources,
      devices: deviceCounts,
      topCountries,
      topBrowsers,
      webVitals: avgVitals,
      consultationFunnel,
      topEvents,
      recentVisitors: recentVisitorsRes.data || [],
    });
  } catch (err) {
    console.error("Analytics API error:", err);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}

function avg(nums: number[], decimals = 0): number {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((a, b) => a + b, 0);
  const factor = Math.pow(10, decimals);
  return Math.round((sum / nums.length) * factor) / factor;
}
