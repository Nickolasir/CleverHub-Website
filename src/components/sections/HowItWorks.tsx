"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal } from "@/hooks/useGSAP";

const tiers = [
  {
    name: "Instant",
    latency: "50–200ms",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    description:
      "Common commands processed in milliseconds, right in the room. No internet needed. Lights, locks, thermostat — handled instantly by the satellite node.",
    badge: "~70% of commands",
  },
  {
    name: "Intelligent",
    latency: "580–900ms",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    description:
      "Complex requests streamed to the cloud and back in under a second. Natural conversations, multi-step routines, and contextual awareness.",
    badge: "~20% of commands",
  },
  {
    name: "Always On",
    latency: "3–5s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    description:
      "Internet down? CleverHub keeps working with on-device AI. Full voice control runs locally on the hub's AI accelerator — your home never goes offline.",
    badge: "Offline fallback",
  },
];

export function HowItWorks() {
  const cardsRef = useStaggerReveal<HTMLDivElement>(".tier-card", {
    stagger: 0.15,
    y: 50,
  });

  return (
    <SectionWrapper id="how-it-works" className="bg-[#f5f5f7]">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Three-Tier Voice Intelligence
        </p>
        <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-bold tracking-tight md:text-5xl">
          How It Works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          CleverHub uses a three-tier system that automatically routes each
          command to the fastest available processor.
        </p>
      </div>

      <div ref={cardsRef} className="mt-16 grid gap-8 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="tier-card group rounded-3xl border border-card-border bg-card p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
              {tier.icon}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <h3 className="font-[var(--font-outfit)] text-2xl font-bold">
                {tier.name}
              </h3>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                {tier.latency}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {tier.description}
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-accent/70">
              {tier.badge}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
