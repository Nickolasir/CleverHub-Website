"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal, useFadeIn } from "@/hooks/useGSAP";
import Link from "next/link";

const features = [
  {
    title: "WiFi Credential Rotation",
    description:
      "Automatically generate and rotate WiFi passwords between guest stays. Credentials are shared via your booking platform or NFC tap at the door.",
  },
  {
    title: "6-Category Guest Profile Wipe",
    description:
      "Complete digital reset between stays: WiFi, streaming logins, voice history, smart home preferences, saved routines, and device pairings — all wiped automatically at checkout.",
  },
  {
    title: "Voice Concierge Mode",
    description:
      "Guests say \"Clever\" to get local restaurant recommendations, check-out instructions, house rules, and property-specific information — all without you lifting a finger.",
  },
  {
    title: "Pre-Check-In Climate Control",
    description:
      "CleverHub monitors your booking calendar and pre-cools or pre-heats the property before guest arrival. Saves energy when vacant, ensures comfort on arrival.",
  },
  {
    title: "Automated Check-In / Check-Out",
    description:
      "Smart lock codes generated per reservation. Guests get a seamless keyless entry experience. Codes expire automatically at checkout time.",
  },
  {
    title: "Energy & Occupancy Intelligence",
    description:
      "mmWave presence sensors detect which rooms are occupied. Lights, HVAC, and devices adjust automatically — cutting energy costs by up to 30% between stays.",
  },
  {
    title: "Air Quality Monitoring",
    description:
      "VOC and humidity sensors alert you to smoking, vaping, or moisture issues in real time. Protect your property and maintain guest health standards.",
  },
  {
    title: "Multi-Property Dashboard",
    description:
      "Manage all your properties from a single interface. See occupancy, energy usage, maintenance alerts, and guest feedback across your entire portfolio.",
  },
];

export default function CleverHostPage() {
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
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
          </div>

          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-accent">
            For Airbnb & STR Hosts
          </p>
          <h1 className="mt-3 font-[var(--font-outfit)] text-4xl font-bold text-white md:text-6xl">
            CleverHost
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Automate the entire guest lifecycle. From WiFi rotation to profile
            wipes, voice concierge to energy management — CleverHost turns your
            rental into a self-managing property.
          </p>

          <div className="mt-8 inline-block rounded-full bg-accent/10 px-6 py-2 text-lg font-bold text-accent">
            Starting at $29/mo
          </div>
        </div>
      </section>

      {/* Features */}
      <SectionWrapper>
        <div className="text-center">
          <h2 className="font-[var(--font-outfit)] text-3xl font-bold tracking-tight md:text-4xl">
            Everything Your Rental Needs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Every feature designed to save you time, protect your property, and
            delight your guests.
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
            Ready to Automate Your Rental?
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Schedule a free consultation and we&apos;ll design a CleverHost
            setup for your property.
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
