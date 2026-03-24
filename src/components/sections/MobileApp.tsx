"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal, useFadeIn } from "@/hooks/useGSAP";

const highlights = [
  {
    title: "Voice Commands",
    description: "Tap to talk to your home from anywhere",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" />
      </svg>
    ),
  },
  {
    title: "Real-Time Control",
    description: "Instant device status and toggles",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    title: "Family Management",
    description: "Add members, set permissions, view activity",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "CleverAide Dashboard",
    description: "Medication schedules, wellness reports, alerts",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    title: "Chat Interface",
    description: "Natural language conversations with your home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    title: "iOS & Android",
    description: "Built with React Native for both platforms",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
      </svg>
    ),
  },
];

const badges = [
  { label: "17+ Screens", value: "17+" },
  { label: "Real-Time Updates", value: "Live" },
  { label: "iOS & Android", value: "Both" },
];

export function MobileApp() {
  const gridRef = useStaggerReveal<HTMLDivElement>(".app-card", {
    stagger: 0.08,
    y: 16,
  });
  const phoneRef = useFadeIn<HTMLDivElement>({ y: 30 });

  return (
    <SectionWrapper id="mobile-app" className="bg-section-alt">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Control Everywhere
        </p>
        <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold tracking-tight md:text-5xl">
          Your Home in Your Pocket
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          The CleverHub mobile app puts full control on iOS and Android. Voice
          commands, device control, family management, and CleverAide — all from
          your phone.
        </p>
      </div>

      <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_280px_1fr]">
        {/* Left features */}
        <div ref={gridRef} className="flex flex-col gap-6">
          {highlights.slice(0, 3).map((h) => (
            <div key={h.title} className="app-card flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/8 text-accent">
                {h.icon}
              </div>
              <div>
                <h3 className="font-[var(--font-outfit)] text-sm font-semibold">
                  {h.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{h.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Phone mockup */}
        <div ref={phoneRef} className="flex justify-center">
          <div className="relative mx-auto w-[220px]">
            {/* Phone frame */}
            <div className="rounded-[2.5rem] border-[3px] border-white/10 bg-warm-gray p-3 shadow-2xl">
              {/* Notch */}
              <div className="mx-auto mb-3 h-5 w-20 rounded-full bg-black/40" />
              {/* Screen */}
              <div className="space-y-3 rounded-[1.8rem] bg-black/30 p-4">
                {/* Status bar */}
                <div className="flex items-center justify-between px-1">
                  <div className="h-2 w-8 rounded-full bg-white/20" />
                  <div className="h-2 w-12 rounded-full bg-white/20" />
                </div>
                {/* Device tiles */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-accent/20 p-3">
                    <div className="h-2 w-8 rounded-full bg-accent/60" />
                    <div className="mt-2 h-1.5 w-12 rounded-full bg-white/15" />
                  </div>
                  <div className="rounded-lg bg-white/8 p-3">
                    <div className="h-2 w-8 rounded-full bg-white/30" />
                    <div className="mt-2 h-1.5 w-12 rounded-full bg-white/15" />
                  </div>
                  <div className="rounded-lg bg-white/8 p-3">
                    <div className="h-2 w-8 rounded-full bg-white/30" />
                    <div className="mt-2 h-1.5 w-12 rounded-full bg-white/15" />
                  </div>
                  <div className="rounded-lg bg-accent/20 p-3">
                    <div className="h-2 w-8 rounded-full bg-accent/60" />
                    <div className="mt-2 h-1.5 w-12 rounded-full bg-white/15" />
                  </div>
                </div>
                {/* Scene bar */}
                <div className="flex gap-2">
                  <div className="flex-1 rounded-lg bg-accent/15 py-2 text-center">
                    <div className="mx-auto h-1.5 w-10 rounded-full bg-accent/40" />
                  </div>
                  <div className="flex-1 rounded-lg bg-white/8 py-2 text-center">
                    <div className="mx-auto h-1.5 w-10 rounded-full bg-white/20" />
                  </div>
                </div>
                {/* Mic button */}
                <div className="flex justify-center pt-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/30">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-4 w-4">
                      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Home indicator */}
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-white/15" />
            </div>
          </div>
        </div>

        {/* Right features */}
        <div className="flex flex-col gap-6">
          {highlights.slice(3).map((h) => (
            <div key={h.title} className="app-card flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/8 text-accent">
                {h.icon}
              </div>
              <div>
                <h3 className="font-[var(--font-outfit)] text-sm font-semibold">
                  {h.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{h.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
        {badges.map((b) => (
          <div
            key={b.label}
            className="flex items-center gap-2 rounded-full bg-card px-5 py-2.5 shadow-sm"
          >
            <span className="font-[var(--font-outfit)] text-sm font-bold text-accent">
              {b.value}
            </span>
            <span className="text-sm text-muted">{b.label}</span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
