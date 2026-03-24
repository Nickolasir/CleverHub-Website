"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal, useFadeIn } from "@/hooks/useGSAP";
import Link from "next/link";

const features = [
  {
    title: "Pre-Installed Intelligence",
    description:
      "Factory-integrated into new construction. Buyers move in to a fully configured smart home — no setup, no complexity, no third-party installers needed.",
  },
  {
    title: "Voice in Every Room",
    description:
      "Satellite nodes with microphones and speakers in every room. Say \"Clever\" anywhere and the home responds instantly with sub-second latency.",
  },
  {
    title: "Family AI Agents",
    description:
      "Each family member gets their own named AI agent with a custom wake word. \"Hey Jarvis\" for dad, \"Hey Luna\" for daughter — each with their own personality and behavior.",
  },
  {
    title: "Age-Based Permissions",
    description:
      "Six permission tiers — adult, teenager, tween, child, toddler, and visitor — with granular per-device, per-room, and per-category controls. Parents set the rules, the system enforces them.",
  },
  {
    title: "Parental Controls & Schedules",
    description:
      "Bedtime lockouts, school-hour restrictions, quiet time enforcement, and spending limits with parental approval workflows. Real-time notifications when rules are triggered.",
  },
  {
    title: "Builder Revenue Share",
    description:
      "Builders earn 20% ongoing revenue share on monthly cloud subscriptions. A new profit center that differentiates your listings and keeps generating income after the sale.",
  },
  {
    title: "Kitchen Intelligence",
    description:
      "ePantry inventory tracking, smart shopping lists, receipt scanning, and expiry alerts. The kitchen manages itself — from what's in the fridge to what needs to be bought.",
  },
  {
    title: "Local-First Privacy",
    description:
      "All voice processing happens on-device with the 40 TOPS AI accelerator. No audio ever leaves the home. Complete privacy by design — not by policy.",
  },
];

export default function CleverHomePage() {
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
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
          </div>

          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-accent">
            For Homebuilders
          </p>
          <h1 className="mt-3 font-[var(--font-outfit)] text-4xl font-bold text-white md:text-6xl">
            CleverHome
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Pre-installed intelligence that sells homes faster. Voice control in
            every room, family-aware AI agents, and a system that grows with the
            family — all turnkey from move-in day.
          </p>

          <div className="mt-8 inline-block rounded-full bg-accent/10 px-6 py-2 text-lg font-bold text-accent">
            3.6x&ndash;13.2x Builder ROI
          </div>
        </div>
      </section>

      {/* Features */}
      <SectionWrapper>
        <div className="text-center">
          <h2 className="font-[var(--font-outfit)] text-3xl font-bold tracking-tight md:text-4xl">
            Intelligence That Sells Homes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Every feature designed to differentiate your listings, delight
            buyers, and generate ongoing revenue.
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
            Ready to Differentiate Your Homes?
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Schedule a free consultation and we&apos;ll design a CleverHome
            package for your community.
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
