"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal } from "@/hooks/useGSAP";
import Link from "next/link";

const mainVertical = {
  name: "CleverHome",
  tagline: "For Homebuilders",
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  description:
    "Pre-install intelligence that sells homes faster. Give buyers a move-in-ready smart home with voice control in every room. Builders see 3.6x–13.2x ROI at point of sale.",
  highlight: "3.6x–13.2x ROI",
  features: [
    "Pre-installed in new construction",
    "Turnkey voice control in every room",
    "Builder revenue share on subscriptions",
    "Differentiates listings in Houston market",
  ],
};

const otherVerticals = [
  {
    name: "CleverHost",
    tagline: "For Airbnb & STR Hosts",
    href: "/cleverhost",
    description:
      "Automate the entire guest lifecycle — WiFi rotation, profile wipes, voice concierge, and energy management.",
    highlight: "Starting at $99/mo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    name: "CleverBuilding",
    tagline: "For Apartment Complexes",
    href: "/cleverbuilding",
    description:
      "Building-wide intelligence with unit-level privacy. Manage common areas, energy, and security at scale.",
    highlight: "Enterprise",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="9" y1="6" x2="9" y2="6.01" />
        <line x1="15" y1="6" x2="15" y2="6.01" />
        <line x1="9" y1="10" x2="9" y2="10.01" />
        <line x1="15" y1="10" x2="15" y2="10.01" />
        <line x1="9" y1="14" x2="9" y2="14.01" />
        <line x1="15" y1="14" x2="15" y2="14.01" />
        <path d="M9 18h6" />
      </svg>
    ),
  },
  {
    name: "CleverAide",
    tagline: "For Assisted Living",
    href: "/cleveraide",
    description:
      "Medication management, wellness check-ins, fall detection, and caregiver alerts. Voice-first assistance for elderly and disabled family members.",
    highlight: "Add-on Module",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
];

export function MarketVerticals() {
  const cardsRef = useStaggerReveal<HTMLDivElement>(".vertical-card", {
    stagger: 0.1,
    y: 20,
  });

  return (
    <SectionWrapper id="solutions">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Built for Your Market
        </p>
        <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold tracking-tight md:text-5xl">
          One Platform. Every Market.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Whether you build homes, host guests, manage buildings, or care for
          loved ones — CleverHub adapts to your needs.
        </p>
      </div>

      <div ref={cardsRef} className="mt-16 space-y-8">
        {/* Main vertical — CleverHome (full card) */}
        <div className="vertical-card group relative overflow-hidden rounded-2xl bg-card p-8 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/8 text-accent">
                {mainVertical.icon}
              </div>
              <div className="mt-6">
                <p className="text-sm font-medium text-accent">
                  {mainVertical.tagline}
                </p>
                <h3 className="mt-1 font-[var(--font-outfit)] text-3xl font-semibold">
                  {mainVertical.name}
                </h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {mainVertical.description}
              </p>
              <div className="mt-4 inline-block rounded-full bg-accent/8 px-4 py-1 text-sm font-medium text-accent">
                {mainVertical.highlight}
              </div>
            </div>

            <div>
              <ul className="flex flex-col gap-3">
                {mainVertical.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-6">
                <Link
                  href="/cleverhome"
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors duration-300 hover:text-accent-light"
                >
                  Learn more
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 transition-transform duration-300 hover:translate-x-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <a
                  href="#consultation"
                  data-track="cta_vertical_consultation"
                  className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors duration-300 hover:text-accent"
                >
                  Schedule a consultation
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Other verticals — linked cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {otherVerticals.map((v) => (
            <Link
              key={v.name}
              href={v.href}
              className="vertical-card group relative flex flex-col overflow-hidden rounded-2xl bg-card p-8 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/8 text-accent">
                {v.icon}
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-accent">{v.tagline}</p>
                <h3 className="mt-1 font-[var(--font-outfit)] text-xl font-semibold">
                  {v.name}
                </h3>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {v.description}
              </p>

              <div className="mt-4 inline-block self-start rounded-full bg-accent/8 px-4 py-1 text-sm font-medium text-accent">
                {v.highlight}
              </div>

              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:text-accent-light">
                Learn more
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
