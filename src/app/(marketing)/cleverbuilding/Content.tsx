"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal, useFadeIn } from "@/hooks/useGSAP";
import Link from "next/link";

const features = [
  {
    title: "Building-Wide Energy Management",
    description:
      "Monitor and optimize HVAC, lighting, and appliance usage across every unit and common area. Reduce operating costs with intelligent scheduling and occupancy-based automation.",
  },
  {
    title: "Common Area Automation",
    description:
      "Lobbies, hallways, gyms, pools, and parking garages — all automated. Lighting adjusts to time of day, HVAC responds to occupancy, and access is managed centrally.",
  },
  {
    title: "Unit-Level Tenant Privacy",
    description:
      "Each unit operates as a fully isolated smart home. Tenants control their own space with voice commands. No cross-unit data sharing. Complete privacy by design.",
  },
  {
    title: "Centralized Security & Access Control",
    description:
      "NFC and smart lock integration for building entry, parking, amenities, and unit access. Manage move-ins, move-outs, and maintenance access from a single dashboard.",
  },
  {
    title: "Maintenance Intelligence",
    description:
      "Temperature, humidity, and air quality sensors detect issues before they become problems. Get alerts for water leaks, HVAC failures, and air quality anomalies across the building.",
  },
  {
    title: "Presence-Aware Efficiency",
    description:
      "mmWave sensors in common areas detect real occupancy — not just motion. Lights and climate adjust in real time, cutting energy waste in unoccupied spaces.",
  },
  {
    title: "Tenant Onboarding & Offboarding",
    description:
      "Automated digital setup for new tenants: access codes, WiFi credentials, voice profiles, and smart home preferences. Full wipe on move-out.",
  },
  {
    title: "Portfolio-Scale Dashboard",
    description:
      "Property managers see every building, every unit, every sensor — from one interface. Compare energy usage, track maintenance, and manage access across your entire portfolio.",
  },
];

export default function CleverBuildingContent() {
  const cardsRef = useStaggerReveal<HTMLDivElement>(".feature-card", {
    stagger: 0.12,
    y: 40,
  });
  const heroRef = useFadeIn<HTMLDivElement>({ y: 30 });

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-gray px-6 pb-24 pt-32 md:pt-40">
        <div ref={heroRef} className="mx-auto max-w-4xl text-center">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 rotate-180"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to Solutions
          </Link>

          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-8 w-8"
              >
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                <line x1="9" y1="6" x2="9" y2="6.01" />
                <line x1="15" y1="6" x2="15" y2="6.01" />
                <line x1="9" y1="10" x2="9" y2="10.01" />
                <line x1="15" y1="10" x2="15" y2="10.01" />
                <line x1="9" y1="14" x2="9" y2="14.01" />
                <line x1="15" y1="14" x2="15" y2="14.01" />
                <path d="M9 18h6" />
              </svg>
            </div>
          </div>

          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-accent">
            For Apartment Complexes
          </p>
          <h1 className="mt-3 font-[var(--font-outfit)] text-4xl font-bold text-white md:text-6xl">
            CleverBuilding
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Building-wide intelligence with unit-level privacy. Manage common
            areas, energy, security, and maintenance at scale — while every
            tenant enjoys their own fully private smart home.
          </p>

          <div className="mt-8 inline-block rounded-full bg-accent/10 px-6 py-2 text-lg font-bold text-accent">
            Enterprise
          </div>
        </div>
      </section>

      {/* Features */}
      <SectionWrapper>
        <div className="text-center">
          <h2 className="font-[var(--font-outfit)] text-3xl font-bold tracking-tight md:text-4xl">
            Intelligence at Every Level
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            From the lobby to every unit — one platform that scales with your
            portfolio.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-2"
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="feature-card rounded-2xl border border-card-border bg-card p-6 shadow-sm"
            >
              <h3 className="font-[var(--font-outfit)] text-lg font-bold">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <section className="bg-warm-gray px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-[var(--font-outfit)] text-3xl font-bold text-white md:text-4xl">
            Ready to Upgrade Your Building?
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Schedule a free consultation and we&apos;ll design a CleverBuilding
            deployment for your property.
          </p>
          <a
            href="/#consultation"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/25"
          >
            Schedule a Consultation
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
