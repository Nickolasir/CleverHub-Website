"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal } from "@/hooks/useGSAP";

const features = [
  {
    title: "Voice Control",
    description:
      "Say \"Clever\" in any room. Sub-second response for lights, locks, thermostat, scenes, and more.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    title: "Presence Detection",
    description:
      "BLE scanning knows who's home and which room they're in. Automate lights, climate, and music accordingly.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Energy Management",
    description:
      "Pre-cool before guests arrive. Optimize HVAC based on occupancy. Average 23% energy savings.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Security & Access",
    description:
      "Smart locks, cameras, and alerts — all processed locally. No video ever leaves your home.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Scene Automation",
    description:
      "\"Good Morning\", \"Good Night\", \"I'm Leaving\" — one command orchestrates dozens of devices at once.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Multi-Room Audio",
    description:
      "Speakers in every satellite node. Music follows you from room to room, controlled by voice.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
      </svg>
    ),
  },
];

export function FeaturesGrid() {
  const gridRef = useStaggerReveal<HTMLDivElement>(".feature-card", {
    stagger: 0.06,
    y: 16,
  });

  return (
    <SectionWrapper id="features" className="bg-section-alt">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Capabilities
        </p>
        <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold tracking-tight md:text-5xl">
          Everything Your Home Needs
        </h2>
      </div>

      <div
        ref={gridRef}
        className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className="feature-card rounded-2xl bg-card p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent/8 text-accent">
              {feature.icon}
            </div>
            <h3 className="mt-4 font-[var(--font-outfit)] text-base font-semibold">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
