"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal, useFadeIn } from "@/hooks/useGSAP";

const highlights = [
  {
    title: "Always-On Command Center",
    description:
      "Your TV becomes a live dashboard showing every device, room, and scene at a glance. Real-time updates — no refresh needed.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Remote-Friendly Navigation",
    description:
      "Designed for your TV remote. Navigate with D-pad arrows, activate with OK — no keyboard, mouse, or phone required.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8l4 4-4 4M12 8l-4 4 4 4" />
      </svg>
    ),
  },
  {
    title: "One-Touch Scene Control",
    description:
      "\"Good Morning\", \"Movie Night\", \"Good Night\" — activate entire scenes from the big screen with a single press.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Launch From Anywhere",
    description:
      "Wake your TV and open the dashboard from your phone or web browser. No remote needed — one tap and it's on screen.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
  },
  {
    title: "Live Activity Feed",
    description:
      "See who locked the door, which lights turned on, and what the thermostat is doing — all in real time on the big screen.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "10-Foot UI Design",
    description:
      "Large text, high contrast dark theme, and gold focus rings — purpose-built for viewing from across the room.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
];

export function TVDashboard() {
  const gridRef = useStaggerReveal<HTMLDivElement>(".tv-card", {
    stagger: 0.08,
    y: 16,
  });
  const tvRef = useFadeIn<HTMLDivElement>({ y: 30 });

  return (
    <SectionWrapper id="tv-dashboard" dark>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Big Screen Control
        </p>
        <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Your Home on the Big Screen
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
          Turn your living room TV into an always-on smart home command center.
          Device status, scene controls, and activity feed — all optimized for
          your TV remote.
        </p>
      </div>

      {/* TV mockup + features grid */}
      <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
        {/* TV mockup */}
        <div ref={tvRef} className="flex justify-center">
          <div className="w-full max-w-[520px]">
            {/* TV frame */}
            <div className="rounded-xl border-[3px] border-white/10 bg-[#1a1a1a] p-4 shadow-2xl">
              {/* Screen content */}
              <div className="rounded-lg bg-[#1a1a1a] p-5">
                {/* Nav bar */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-accent">Clever</span>
                    <div className="flex gap-2">
                      <div className="rounded-md bg-accent px-2.5 py-1">
                        <div className="h-1.5 w-6 rounded-full bg-[#1a1a1a]/60" />
                      </div>
                      <div className="rounded-md bg-white/8 px-2.5 py-1">
                        <div className="h-1.5 w-7 rounded-full bg-white/30" />
                      </div>
                      <div className="rounded-md bg-white/8 px-2.5 py-1">
                        <div className="h-1.5 w-7 rounded-full bg-white/30" />
                      </div>
                      <div className="rounded-md bg-white/8 px-2.5 py-1">
                        <div className="h-1.5 w-6 rounded-full bg-white/30" />
                      </div>
                    </div>
                  </div>
                  <div className="h-2 w-10 rounded-full bg-white/15" />
                </div>

                {/* Metric cards row */}
                <div className="mb-4 grid grid-cols-4 gap-2">
                  <div className="rounded-lg bg-[#2D2D2D] p-2.5">
                    <div className="text-base font-bold text-white/90">12</div>
                    <div className="mt-0.5 h-1 w-8 rounded-full bg-white/15" />
                  </div>
                  <div className="rounded-lg bg-[#2D2D2D] p-2.5">
                    <div className="text-base font-bold text-green-400">10</div>
                    <div className="mt-0.5 h-1 w-7 rounded-full bg-white/15" />
                  </div>
                  <div className="rounded-lg bg-[#2D2D2D] p-2.5">
                    <div className="text-base font-bold text-accent">5</div>
                    <div className="mt-0.5 h-1 w-6 rounded-full bg-white/15" />
                  </div>
                  <div className="rounded-lg bg-[#2D2D2D] p-2.5">
                    <div className="text-base font-bold text-white/90">72<span className="text-xs text-white/40">°F</span></div>
                    <div className="mt-0.5 h-1 w-8 rounded-full bg-white/15" />
                  </div>
                </div>

                {/* Device grid */}
                <div className="mb-4 grid grid-cols-4 gap-2">
                  {[
                    { icon: "💡", active: true },
                    { icon: "🔒", active: false },
                    { icon: "❄️", active: true },
                    { icon: "📺", active: true },
                    { icon: "💡", active: false },
                    { icon: "🌀", active: false },
                    { icon: "🔌", active: true },
                    { icon: "💡", active: true },
                  ].map((d, i) => (
                    <div
                      key={i}
                      className={`rounded-lg p-2 ${
                        i === 0
                          ? "ring-2 ring-accent ring-offset-1 ring-offset-[#1a1a1a]"
                          : ""
                      } bg-[#2D2D2D]`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs">{d.icon}</span>
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            d.active ? "bg-green-400" : "bg-white/20"
                          }`}
                        />
                      </div>
                      <div className="mt-1.5 h-1 w-10 rounded-full bg-white/15" />
                      <div className="mt-1 h-1 w-6 rounded-full bg-white/10" />
                    </div>
                  ))}
                </div>

                {/* Scene buttons */}
                <div className="flex gap-2">
                  <div className="flex-1 rounded-lg bg-[#2D2D2D] px-2 py-1.5 text-center">
                    <span className="text-[10px] text-white/50">🌅 Good Morning</span>
                  </div>
                  <div className="flex-1 rounded-lg bg-[#2D2D2D] px-2 py-1.5 text-center">
                    <span className="text-[10px] text-white/50">🌙 Good Night</span>
                  </div>
                  <div className="flex-1 rounded-lg bg-[#2D2D2D] px-2 py-1.5 text-center">
                    <span className="text-[10px] text-white/50">🎬 Movie Night</span>
                  </div>
                </div>
              </div>
            </div>
            {/* TV stand */}
            <div className="mx-auto mt-1 h-4 w-32 rounded-b-lg bg-white/5" />
            <div className="mx-auto h-1 w-48 rounded-b bg-white/3" />
          </div>
        </div>

        {/* Features list */}
        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2">
          {highlights.map((h) => (
            <div key={h.title} className="tv-card flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                {h.icon}
              </div>
              <div>
                <h3 className="font-[var(--font-outfit)] text-sm font-semibold text-white">
                  {h.title}
                </h3>
                <p className="mt-1 text-sm text-white/50">{h.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech badges */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
        {[
          { label: "Works on Samsung, LG, any smart TV browser", icon: "📺" },
          { label: "Wake-on-LAN auto-launch", icon: "⚡" },
          { label: "Real-time updates", icon: "🔄" },
          { label: "D-pad spatial navigation", icon: "🎮" },
        ].map((b) => (
          <div
            key={b.label}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5"
          >
            <span>{b.icon}</span>
            <span className="text-sm text-white/60">{b.label}</span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
