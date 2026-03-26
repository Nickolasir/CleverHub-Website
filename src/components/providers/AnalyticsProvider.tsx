"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnalyticsTracker } from "@/lib/analytics/tracker";

interface AnalyticsContextValue {
  trackEvent: (
    name: string,
    options?: {
      category?: string;
      label?: string;
      value?: number;
      metadata?: Record<string, unknown>;
    }
  ) => void;
  trackConsultationFunnel: (step: "view" | "start" | "submit" | "abandon") => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue>({
  trackEvent: () => {},
  trackConsultationFunnel: () => {},
});

export function useAnalytics() {
  return useContext(AnalyticsContext);
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const trackerRef = useRef<AnalyticsTracker | null>(null);
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);

  // Initialize tracker on mount
  useEffect(() => {
    const tracker = new AnalyticsTracker();
    trackerRef.current = tracker;
    tracker.init();

    return () => {
      tracker.destroy();
      trackerRef.current = null;
    };
  }, []);

  // Track page views on route change (SPA navigation)
  useEffect(() => {
    if (prevPathRef.current !== null && prevPathRef.current !== pathname) {
      trackerRef.current?.trackPageView();
    }
    prevPathRef.current = pathname;
  }, [pathname]);

  const trackEvent = useCallback(
    (
      name: string,
      options?: {
        category?: string;
        label?: string;
        value?: number;
        metadata?: Record<string, unknown>;
      }
    ) => {
      trackerRef.current?.trackEvent(name, options);
    },
    []
  );

  const trackConsultationFunnel = useCallback(
    (step: "view" | "start" | "submit" | "abandon") => {
      trackerRef.current?.trackConsultationFunnel(step);
    },
    []
  );

  return (
    <AnalyticsContext.Provider value={{ trackEvent, trackConsultationFunnel }}>
      {children}
    </AnalyticsContext.Provider>
  );
}
