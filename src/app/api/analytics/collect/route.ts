import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-service";

/**
 * Analytics collection endpoint.
 * Receives batched events from the client tracker and enriches with server-side data (IP, geo).
 *
 * POST /api/analytics/collect
 * Body: { type: "session" | "pageview" | "event" | "update_pageview" | "update_session", payload: {...} }
 */

interface GeoData {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  lat: number;
  lon: number;
  isp: string;
}

async function getGeoFromIP(ip: string): Promise<GeoData | null> {
  try {
    // ip-api.com is free for non-commercial use (45 req/min)
    // For production at scale, use a local MaxMind GeoLite2 database
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=country,countryCode,regionName,city,lat,lon,isp`,
      { next: { revalidate: 86400 } } // cache geo lookups for 24h
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === "fail") return null;
    return {
      country: data.country,
      countryCode: data.countryCode,
      region: data.regionName,
      city: data.city,
      lat: data.lat,
      lon: data.lon,
      isp: data.isp,
    };
  } catch {
    return null;
  }
}

function getClientIP(request: NextRequest): string {
  // Vercel / Cloudflare / standard proxy headers
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

// CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, payload } = body;

    if (!type || !payload) {
      return NextResponse.json({ error: "Missing type or payload" }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const ip = getClientIP(request);

    switch (type) {
      case "session": {
        // Enrich with geo data
        let geo: GeoData | null = null;
        if (ip !== "unknown" && ip !== "127.0.0.1" && ip !== "::1") {
          geo = await getGeoFromIP(ip);
        }

        const { data, error } = await supabase
          .schema("web")
          .from("analytics_sessions")
          .insert({
            visitor_id: payload.visitor_id,
            entry_page: payload.entry_page,
            referrer: payload.referrer || null,
            referrer_domain: payload.referrer_domain || null,
            utm_source: payload.utm_source || null,
            utm_medium: payload.utm_medium || null,
            utm_campaign: payload.utm_campaign || null,
            utm_term: payload.utm_term || null,
            utm_content: payload.utm_content || null,
            device_type: payload.device_type,
            browser: payload.browser,
            browser_version: payload.browser_version,
            os: payload.os,
            os_version: payload.os_version,
            screen_width: payload.screen_width,
            screen_height: payload.screen_height,
            viewport_width: payload.viewport_width,
            viewport_height: payload.viewport_height,
            language: payload.language,
            timezone: payload.timezone,
            touch_support: payload.touch_support,
            connection_type: payload.connection_type || null,
            ip_address: ip !== "unknown" ? ip : null,
            country: geo?.country || null,
            country_code: geo?.countryCode || null,
            region: geo?.region || null,
            city: geo?.city || null,
            latitude: geo?.lat || null,
            longitude: geo?.lon || null,
            isp: geo?.isp || null,
            user_id: payload.user_id || null,
          })
          .select("id")
          .single();

        if (error) {
          console.error("Analytics session insert error:", error);
          return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
        }

        return NextResponse.json({ session_id: data.id });
      }

      case "pageview": {
        const { error } = await supabase
          .schema("web")
          .from("analytics_page_views")
          .insert({
            id: payload.id,
            session_id: payload.session_id,
            visitor_id: payload.visitor_id,
            page_path: payload.page_path,
            page_title: payload.page_title,
            page_url: payload.page_url,
            previous_page: payload.previous_page || null,
          });

        if (error) {
          console.error("Analytics pageview insert error:", error);
          return NextResponse.json({ error: "Failed to record pageview" }, { status: 500 });
        }

        // Update session page count and bounce status
        await supabase
          .schema("web")
          .from("analytics_sessions")
          .update({
            page_count: payload.page_number,
            is_bounce: payload.page_number <= 1,
            exit_page: payload.page_path,
          })
          .eq("id", payload.session_id);

        return NextResponse.json({ success: true });
      }

      case "update_pageview": {
        const updateData: Record<string, unknown> = {};
        if (payload.time_on_page_ms != null) updateData.time_on_page_ms = payload.time_on_page_ms;
        if (payload.scroll_depth != null) updateData.scroll_depth = payload.scroll_depth;
        if (payload.is_exit != null) updateData.is_exit = payload.is_exit;
        if (payload.lcp != null) updateData.lcp = payload.lcp;
        if (payload.fid != null) updateData.fid = payload.fid;
        if (payload.cls != null) updateData.cls = payload.cls;
        if (payload.fcp != null) updateData.fcp = payload.fcp;
        if (payload.ttfb != null) updateData.ttfb = payload.ttfb;
        if (payload.inp != null) updateData.inp = payload.inp;

        if (Object.keys(updateData).length > 0) {
          await supabase
            .schema("web")
            .from("analytics_page_views")
            .update(updateData)
            .eq("id", payload.id);
        }

        return NextResponse.json({ success: true });
      }

      case "update_session": {
        const sessionUpdate: Record<string, unknown> = {};
        if (payload.duration_ms != null) sessionUpdate.duration_ms = payload.duration_ms;
        if (payload.exit_page != null) sessionUpdate.exit_page = payload.exit_page;
        if (payload.ended_at != null) sessionUpdate.ended_at = payload.ended_at;
        if (payload.page_count != null) {
          sessionUpdate.page_count = payload.page_count;
          sessionUpdate.is_bounce = payload.page_count <= 1;
        }

        if (Object.keys(sessionUpdate).length > 0) {
          await supabase
            .schema("web")
            .from("analytics_sessions")
            .update(sessionUpdate)
            .eq("id", payload.session_id);
        }

        return NextResponse.json({ success: true });
      }

      case "event": {
        const { error } = await supabase
          .schema("web")
          .from("analytics_events")
          .insert({
            session_id: payload.session_id,
            visitor_id: payload.visitor_id,
            page_path: payload.page_path,
            event_name: payload.event_name,
            event_category: payload.event_category || null,
            event_label: payload.event_label || null,
            event_value: payload.event_value || null,
            metadata: payload.metadata || {},
          });

        if (error) {
          console.error("Analytics event insert error:", error);
          return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
      }

      case "batch": {
        // Process an array of events in one request
        const results = [];
        for (const item of payload.events || []) {
          try {
            if (item.type === "event") {
              await supabase.schema("web").from("analytics_events").insert({
                session_id: item.session_id,
                visitor_id: item.visitor_id,
                page_path: item.page_path,
                event_name: item.event_name,
                event_category: item.event_category || null,
                event_label: item.event_label || null,
                event_value: item.event_value || null,
                metadata: item.metadata || {},
              });
            }
            results.push({ success: true });
          } catch {
            results.push({ success: false });
          }
        }
        return NextResponse.json({ results });
      }

      default:
        return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
    }
  } catch (err) {
    console.error("Analytics collect error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
