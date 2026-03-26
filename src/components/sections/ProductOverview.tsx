"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal } from "@/hooks/useGSAP";

const stats = [
  { value: "40 TOPS", label: "AI Processing" },
  { value: "<1s", label: "Voice Response" },
  { value: "$2,500", label: "Standard System" },
];

export function ProductOverview() {
  const statsRef = useStaggerReveal<HTMLDivElement>(".stat-badge", {
    stagger: 0.1,
  });

  return (
    <SectionWrapper id="product">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
          {/* Placeholder - replace with 2K product image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Central Hub */}
              <div className="mx-auto h-32 w-32 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#333] shadow-2xl ring-1 ring-white/10">
                <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#222] to-[#111] shadow-inner" />
                <div className="absolute left-1/2 top-1/2 h-1 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/60 shadow-[0_0_20px_rgba(0,113,227,0.3)]" />
              </div>
              {/* Satellite nodes */}
              {["-left-16 top-0", "left-36 top-0", "-left-8 top-28", "left-28 top-28"].map(
                (pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos} h-12 w-12 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#333] shadow-lg ring-1 ring-white/8`}
                  >
                    <div className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40" />
                  </div>
                )
              )}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Copy */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">
            The CleverHub System
          </p>
          <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            The Brain of
            <br />
            Your Home
          </h2>
          <p className="mt-6 text-lg leading-[1.75] text-muted">
            CleverHub is an AI-powered smart home system that processes
            everything locally. Voice commands are understood in under a second
            — no cloud delay, no privacy concerns. The central hub runs a
            40 TOPS AI accelerator while satellite nodes bring intelligence
            to every room.
          </p>
          <p className="mt-4 text-lg leading-[1.75] text-muted">
            Say &ldquo;Clever&rdquo; in any room and control your lights,
            locks, thermostat, and more — instantly. Even when the internet
            goes down, CleverHub keeps working with fully local AI fallback.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="mt-10 flex flex-wrap gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-badge flex items-center gap-3 rounded-full bg-section-alt px-5 py-3"
              >
                <span className="text-lg font-semibold text-accent">
                  {stat.value}
                </span>
                <span className="text-sm text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
