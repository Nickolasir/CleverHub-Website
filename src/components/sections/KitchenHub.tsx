"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal } from "@/hooks/useGSAP";

const kitchenFeatures = [
  {
    title: "ePantry",
    description:
      "Track every item in your fridge, freezer, and pantry. Know what you have, what\u2019s running low, and what\u2019s about to expire.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M6 2h12v20H6z" strokeLinejoin="round" />
        <path d="M6 12h12" />
        <path d="M10 6h1" strokeLinecap="round" />
        <path d="M10 16h1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Smart Shopping List",
    description:
      "Add items by voice, dashboard, or mobile. Auto-restock suggestions when stock drops below threshold.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Receipt Scanning",
    description:
      "Snap a photo of your receipt. AI extracts items, prices, and store info \u2014 pantry updates automatically.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" />
        <path d="M8 10h8" strokeLinecap="round" />
        <path d="M8 14h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Barcode Scanning",
    description:
      "Scan any barcode to instantly look up and add products to your pantry or shopping list.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M3 5v-2h4M17 3h4v2M3 19v2h4M17 21h4v-2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 7v10M11 7v10M15 7v6M19 7v10" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Pantry Photo Analysis",
    description:
      "Take a photo of your fridge or pantry shelf. AI identifies items and updates your inventory.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="12" cy="13" r="4" />
        <path d="M12 3v2" />
      </svg>
    ),
  },
  {
    title: "Expiry Tracking",
    description:
      "Get notified before food goes bad. Reduce waste with smart expiry alerts and recipe suggestions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function KitchenHub() {
  const gridRef = useStaggerReveal<HTMLDivElement>(".kitchen-card", {
    stagger: 0.06,
    y: 16,
  });

  return (
    <SectionWrapper id="kitchen-hub">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">
          Kitchen Intelligence
        </p>
        <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold tracking-tight md:text-5xl">
          Your Kitchen, Brilliantly Managed
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          From pantry inventory to grocery runs &mdash; CleverHub turns your kitchen into a
          self-managing system powered by AI vision, voice, and smart automation.
        </p>
      </div>

      <div
        ref={gridRef}
        className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {kitchenFeatures.map((feature) => (
          <div
            key={feature.title}
            className="kitchen-card rounded-2xl bg-card p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
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
