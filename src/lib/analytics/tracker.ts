/**
 * CleverHub Analytics Tracker
 *
 * Self-hosted, privacy-respecting analytics that captures more data than
 * Google Business Profile. All data stored in your own Supabase instance.
 *
 * Tracks: page views, sessions, scroll depth, time on page, web vitals,
 * clicks, form interactions, outbound links, UTM params, device/geo data.
 */

// ---------- Visitor fingerprint (persistent across sessions) ----------

function generateVisitorId(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

function getVisitorId(): string {
  const key = "ch_vid";
  let vid = localStorage.getItem(key);
  if (!vid) {
    vid = generateVisitorId();
    localStorage.setItem(key, vid);
  }
  return vid;
}

// ---------- Session management ----------

const SESSION_KEY = "ch_session";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

interface SessionState {
  id: string | null;   // server-assigned session ID
  visitorId: string;
  startedAt: number;
  lastActivity: number;
  pageCount: number;
  previousPage: string | null;
  currentPageViewId: string | null;
  currentPageEnteredAt: number;
  maxScrollDepth: number;
}

function getSessionState(): SessionState | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw) as SessionState;
    // Check if session timed out
    if (Date.now() - state.lastActivity > SESSION_TIMEOUT) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return state;
  } catch {
    return null;
  }
}

function saveSessionState(state: SessionState) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
}

// ---------- Device detection ----------

interface DeviceInfo {
  device_type: string;
  browser: string;
  browser_version: string;
  os: string;
  os_version: string;
  screen_width: number;
  screen_height: number;
  viewport_width: number;
  viewport_height: number;
  language: string;
  timezone: string;
  touch_support: boolean;
  connection_type: string | null;
}

function getDeviceInfo(): DeviceInfo {
  const ua = navigator.userAgent;

  // Device type
  let device_type = "desktop";
  if (/Mobi|Android.*Mobile|iPhone|iPod/.test(ua)) device_type = "mobile";
  else if (/Tablet|iPad|Android(?!.*Mobile)/.test(ua)) device_type = "tablet";

  // Browser detection
  let browser = "Unknown";
  let browser_version = "";
  if (/Edg\//.test(ua)) {
    browser = "Edge";
    browser_version = ua.match(/Edg\/([\d.]+)/)?.[1] || "";
  } else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) {
    browser = "Chrome";
    browser_version = ua.match(/Chrome\/([\d.]+)/)?.[1] || "";
  } else if (/Firefox\//.test(ua)) {
    browser = "Firefox";
    browser_version = ua.match(/Firefox\/([\d.]+)/)?.[1] || "";
  } else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) {
    browser = "Safari";
    browser_version = ua.match(/Version\/([\d.]+)/)?.[1] || "";
  }

  // OS detection
  let os = "Unknown";
  let os_version = "";
  if (/Windows NT/.test(ua)) {
    os = "Windows";
    const ntVersion = ua.match(/Windows NT ([\d.]+)/)?.[1] || "";
    const versionMap: Record<string, string> = {
      "10.0": "10/11",
      "6.3": "8.1",
      "6.2": "8",
      "6.1": "7",
    };
    os_version = versionMap[ntVersion] || ntVersion;
  } else if (/Mac OS X/.test(ua)) {
    os = "macOS";
    os_version = ua.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g, ".") || "";
  } else if (/Android/.test(ua)) {
    os = "Android";
    os_version = ua.match(/Android ([\d.]+)/)?.[1] || "";
  } else if (/iPhone|iPad|iPod/.test(ua)) {
    os = "iOS";
    os_version = ua.match(/OS ([\d_]+)/)?.[1]?.replace(/_/g, ".") || "";
  } else if (/Linux/.test(ua)) {
    os = "Linux";
  }

  // Connection type
  let connection_type: string | null = null;
  const conn = (navigator as unknown as { connection?: { effectiveType?: string } }).connection;
  if (conn?.effectiveType) {
    connection_type = conn.effectiveType;
  }

  return {
    device_type,
    browser,
    browser_version,
    os,
    os_version,
    screen_width: screen.width,
    screen_height: screen.height,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    touch_support: "ontouchstart" in window || navigator.maxTouchPoints > 0,
    connection_type,
  };
}

// ---------- UTM & referrer parsing ----------

interface TrafficSource {
  referrer: string | null;
  referrer_domain: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
}

function getTrafficSource(): TrafficSource {
  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || null;
  let referrer_domain: string | null = null;

  if (referrer) {
    try {
      const url = new URL(referrer);
      // Don't count self-referrals
      if (url.hostname !== window.location.hostname) {
        referrer_domain = url.hostname;
      } else {
        // Internal navigation, clear referrer
        return {
          referrer: null,
          referrer_domain: null,
          utm_source: params.get("utm_source"),
          utm_medium: params.get("utm_medium"),
          utm_campaign: params.get("utm_campaign"),
          utm_term: params.get("utm_term"),
          utm_content: params.get("utm_content"),
        };
      }
    } catch {
      // invalid referrer URL
    }
  }

  return {
    referrer,
    referrer_domain,
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
  };
}

// ---------- Web Vitals ----------

interface WebVitals {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  inp?: number;
}

function observeWebVitals(callback: (vitals: WebVitals) => void) {
  const vitals: WebVitals = {};

  // TTFB
  try {
    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    if (navEntry) {
      vitals.ttfb = navEntry.responseStart - navEntry.requestStart;
    }
  } catch { /* not supported */ }

  // FCP
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          vitals.fcp = entry.startTime;
          callback({ ...vitals });
        }
      }
    });
    observer.observe({ type: "paint", buffered: true });
  } catch { /* not supported */ }

  // LCP
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        vitals.lcp = last.startTime;
        callback({ ...vitals });
      }
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
  } catch { /* not supported */ }

  // FID
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        vitals.fid = (entry as PerformanceEventTiming).processingStart - entry.startTime;
        callback({ ...vitals });
      }
    });
    observer.observe({ type: "first-input", buffered: true });
  } catch { /* not supported */ }

  // CLS
  try {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value || 0;
          vitals.cls = clsValue;
          callback({ ...vitals });
        }
      }
    });
    observer.observe({ type: "layout-shift", buffered: true });
  } catch { /* not supported */ }

  // INP (Interaction to Next Paint)
  try {
    let maxInp = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const duration = entry.duration;
        if (duration > maxInp) {
          maxInp = duration;
          vitals.inp = duration;
          callback({ ...vitals });
        }
      }
    });
    observer.observe({ type: "event", buffered: true });
  } catch { /* not supported */ }

  // Send initial TTFB
  if (vitals.ttfb) {
    callback({ ...vitals });
  }
}

// ---------- Scroll depth tracking ----------

function trackScrollDepth(callback: (depth: number) => void) {
  let maxDepth = 0;
  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const depth = Math.min(100, Math.round((scrollTop / docHeight) * 100));
          if (depth > maxDepth) {
            maxDepth = depth;
            callback(maxDepth);
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

// ---------- API helper ----------

function sendBeacon(type: string, payload: Record<string, unknown>) {
  const body = JSON.stringify({ type, payload });

  // Try sendBeacon first (works on page unload), fall back to fetch
  if (navigator.sendBeacon) {
    const sent = navigator.sendBeacon(
      "/api/analytics/collect",
      new Blob([body], { type: "application/json" })
    );
    if (sent) return Promise.resolve({ success: true });
  }

  return fetch("/api/analytics/collect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).then((r) => r.json()).catch(() => ({ success: false }));
}

// ---------- Click tracking ----------

function setupClickTracking(getState: () => { sessionId: string | null; visitorId: string }) {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");
    const button = target.closest("button");
    const state = getState();

    if (!state.sessionId) return;

    // Track outbound links
    if (anchor?.href) {
      try {
        const url = new URL(anchor.href);
        if (url.hostname !== window.location.hostname) {
          sendBeacon("event", {
            session_id: state.sessionId,
            visitor_id: state.visitorId,
            page_path: window.location.pathname,
            event_name: "outbound_link",
            event_category: "engagement",
            event_label: anchor.href,
            metadata: {
              link_text: anchor.textContent?.trim().slice(0, 100),
              target_domain: url.hostname,
            },
          });
        }
      } catch { /* invalid URL */ }
    }

    // Track CTA button clicks
    if (button || anchor) {
      const el = (button || anchor) as HTMLElement;
      const trackAttr = el.dataset.track;
      if (trackAttr) {
        sendBeacon("event", {
          session_id: state.sessionId,
          visitor_id: state.visitorId,
          page_path: window.location.pathname,
          event_name: trackAttr,
          event_category: "cta",
          event_label: el.textContent?.trim().slice(0, 100),
          metadata: {
            element_id: el.id || null,
            element_class: el.className?.toString().slice(0, 200) || null,
          },
        });
      }
    }
  });
}

// ---------- Form tracking ----------

function setupFormTracking(getState: () => { sessionId: string | null; visitorId: string }) {
  // Track form focus (start)
  const trackedForms = new WeakSet<HTMLFormElement>();

  document.addEventListener("focusin", (e) => {
    const form = (e.target as HTMLElement).closest("form");
    const state = getState();
    if (!form || !state.sessionId || trackedForms.has(form)) return;

    trackedForms.add(form);
    sendBeacon("event", {
      session_id: state.sessionId,
      visitor_id: state.visitorId,
      page_path: window.location.pathname,
      event_name: "form_start",
      event_category: "conversion",
      event_label: form.id || form.action || "unknown_form",
    });
  });

  // Track form submit
  document.addEventListener("submit", (e) => {
    const form = e.target as HTMLFormElement;
    const state = getState();
    if (!state.sessionId) return;

    sendBeacon("event", {
      session_id: state.sessionId,
      visitor_id: state.visitorId,
      page_path: window.location.pathname,
      event_name: "form_submit",
      event_category: "conversion",
      event_label: form.id || form.action || "unknown_form",
    });
  });
}

// ---------- Main tracker class ----------

export class AnalyticsTracker {
  private sessionState: SessionState | null = null;
  private cleanupFns: (() => void)[] = [];
  private vitals: WebVitals = {};
  private initialized = false;

  async init() {
    if (this.initialized) return;
    if (typeof window === "undefined") return;

    // Respect Do Not Track (optional — remove if you want to track regardless)
    // if (navigator.doNotTrack === "1") return;

    this.initialized = true;
    const visitorId = getVisitorId();

    // Check for existing session
    this.sessionState = getSessionState();

    if (!this.sessionState) {
      // Create new session
      const device = getDeviceInfo();
      const traffic = getTrafficSource();

      const res = await sendBeacon("session", {
        visitor_id: visitorId,
        entry_page: window.location.pathname,
        ...traffic,
        ...device,
      }) as { session_id?: string };

      this.sessionState = {
        id: res?.session_id || null,
        visitorId,
        startedAt: Date.now(),
        lastActivity: Date.now(),
        pageCount: 0,
        previousPage: null,
        currentPageViewId: null,
        currentPageEnteredAt: Date.now(),
        maxScrollDepth: 0,
      };
      saveSessionState(this.sessionState);
    }

    // Track initial page view
    await this.trackPageView();

    // Set up scroll depth tracking
    const cleanupScroll = trackScrollDepth((depth) => {
      if (this.sessionState) {
        this.sessionState.maxScrollDepth = depth;
      }
    });
    this.cleanupFns.push(cleanupScroll);

    // Set up web vitals
    observeWebVitals((v) => {
      this.vitals = { ...this.vitals, ...v };
    });

    // Set up click tracking
    const getState = () => ({
      sessionId: this.sessionState?.id || null,
      visitorId: this.sessionState?.visitorId || visitorId,
    });
    setupClickTracking(getState);
    setupFormTracking(getState);

    // Handle page visibility changes (user tabs away)
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        this.flushPageView();
        this.updateSession();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    this.cleanupFns.push(() => document.removeEventListener("visibilitychange", onVisibilityChange));

    // Handle before unload
    const onBeforeUnload = () => {
      this.flushPageView();
      this.updateSession();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    this.cleanupFns.push(() => window.removeEventListener("beforeunload", onBeforeUnload));
  }

  async trackPageView() {
    if (!this.sessionState?.id) return;

    // Flush previous page view data
    if (this.sessionState.currentPageViewId) {
      await this.flushPageView();
    }

    // Reset scroll depth for new page
    this.sessionState.maxScrollDepth = 0;
    this.vitals = {};

    const pageViewId = crypto.randomUUID();
    this.sessionState.pageCount++;
    this.sessionState.lastActivity = Date.now();
    this.sessionState.currentPageViewId = pageViewId;
    this.sessionState.currentPageEnteredAt = Date.now();

    await sendBeacon("pageview", {
      id: pageViewId,
      session_id: this.sessionState.id,
      visitor_id: this.sessionState.visitorId,
      page_path: window.location.pathname,
      page_title: document.title,
      page_url: window.location.href,
      previous_page: this.sessionState.previousPage,
      page_number: this.sessionState.pageCount,
    });

    this.sessionState.previousPage = window.location.pathname;
    saveSessionState(this.sessionState);
  }

  private flushPageView() {
    if (!this.sessionState?.currentPageViewId) return;

    const timeOnPage = Date.now() - this.sessionState.currentPageEnteredAt;

    sendBeacon("update_pageview", {
      id: this.sessionState.currentPageViewId,
      time_on_page_ms: timeOnPage,
      scroll_depth: this.sessionState.maxScrollDepth,
      ...this.vitals,
    });
  }

  private updateSession() {
    if (!this.sessionState?.id) return;

    sendBeacon("update_session", {
      session_id: this.sessionState.id,
      duration_ms: Date.now() - this.sessionState.startedAt,
      exit_page: window.location.pathname,
      page_count: this.sessionState.pageCount,
      ended_at: new Date().toISOString(),
    });
  }

  // Track custom events
  trackEvent(
    eventName: string,
    options?: {
      category?: string;
      label?: string;
      value?: number;
      metadata?: Record<string, unknown>;
    }
  ) {
    if (!this.sessionState?.id) return;

    sendBeacon("event", {
      session_id: this.sessionState.id,
      visitor_id: this.sessionState.visitorId,
      page_path: window.location.pathname,
      event_name: eventName,
      event_category: options?.category,
      event_label: options?.label,
      event_value: options?.value,
      metadata: options?.metadata,
    });
  }

  // Track consultation funnel specifically
  trackConsultationFunnel(step: "view" | "start" | "submit" | "abandon") {
    this.trackEvent(`consultation_${step}`, {
      category: "conversion",
      label: "consultation_funnel",
    });
  }

  destroy() {
    this.flushPageView();
    this.updateSession();
    for (const fn of this.cleanupFns) fn();
    this.cleanupFns = [];
    this.initialized = false;
  }
}
