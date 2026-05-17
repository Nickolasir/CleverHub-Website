"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal, useFadeIn } from "@/hooks/useGSAP";
import Link from "next/link";

const features = [
  {
    title: "Medication Management",
    description:
      "Scheduled voice reminders with dose-by-dose confirmation. \"Did Max get his morning pill?\" — every dose tracked, refills flagged, prescribing vet on file. Supports oral, topical, ophthalmic, injectable, and as-needed routes.",
  },
  {
    title: "AI Symptom Triage",
    description:
      "\"The cat threw up\" routes to an instant severity assessment. Emergency keywords (seizure, collapse, bleeding, toxin) escalate immediately; routine concerns get a vet-call recommendation or a monitor-at-home plan with photo capture.",
  },
  {
    title: "Feeding & Nutrition",
    description:
      "Manual feeding logs and smart-feeder integration in one ledger. Per-meal kcal and gram tracking, AAFCO-grade food database, allergen tags, and barcode or photo capture of new food bags for automatic pantry linking.",
  },
  {
    title: "Vet Records & Visits",
    description:
      "A complete clinical history per pet: visits, diagnoses, prescriptions, vaccination ledger with expiry tracking, and OCR-parsed discharge papers. Telemedicine providers and primary-vet assignment supported.",
  },
  {
    title: "Food-Recall Alerts",
    description:
      "A live recall feed matches against the exact foods in your pantry. If your preferred kibble or treat is recalled — minor, moderate, or severe — you see a banner the moment it hits the database.",
  },
  {
    title: "Smart Device Integration",
    description:
      "Pet doors, smart feeders, cameras, smart litter boxes, and aquarium controllers all link to specific pets. Voice routines like \"feed Luna\" or \"check on the dog\" trigger the right hardware, automatically.",
  },
  {
    title: "Sitter & Walker Handoff",
    description:
      "Time-limited sitter sessions with handoff notes, temporary credentials, and GPS-tracked walk polylines. Permissions are granular — meds, feeding, both, or neither — and revoke automatically at session end.",
  },
  {
    title: "Multi-Pet, Multi-Species",
    description:
      "Dogs, cats, birds, reptiles, fish, and small mammals all get full profiles — breed, microchip, allergies, body-condition scoring, weight history, and a primary caregiver. Households can manage as many pets as they like.",
  },
  {
    title: "Voice-First Across the Home",
    description:
      "\"Schedule Luna's vet visit.\" \"Order more kibble.\" \"Is Purina recalled?\" Pet care lives inside the same Clever orchestrator that handles your lights, locks, and family agents — no separate app to open.",
  },
];

export default function CleverPetsContent() {
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
                fill="currentColor"
                className="h-8 w-8"
                aria-hidden
              >
                <ellipse cx="5.5" cy="10" rx="1.7" ry="2.3" />
                <ellipse cx="9.5" cy="6.4" rx="1.7" ry="2.5" />
                <ellipse cx="14.5" cy="6.4" rx="1.7" ry="2.5" />
                <ellipse cx="18.5" cy="10" rx="1.7" ry="2.3" />
                <path d="M12 12.2c-3 0-5.5 2.4-5.5 5 0 1.5 1.2 2.7 2.7 2.7 1 0 2-.6 2.8-.6.8 0 1.8.6 2.8.6 1.5 0 2.7-1.2 2.7-2.7 0-2.6-2.5-5-5.5-5z" />
              </svg>
            </div>
          </div>

          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-accent">
            For Pet Households
          </p>
          <h1 className="mt-3 font-[var(--font-outfit)] text-4xl font-bold text-white md:text-6xl">
            CleverPets
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Smarter care for the smallest members of your household.
            Medication reminders, feeding logs, vet records, and AI symptom
            triage — all from the same Clever assistant that runs the rest of
            your home.
          </p>

          <div className="mt-8 inline-block rounded-full bg-accent/10 px-6 py-2 text-lg font-bold text-accent">
            Add-on Module
          </div>
        </div>
      </section>

      {/* Features */}
      <SectionWrapper className="bg-section-alt">
        <div className="text-center">
          <h2 className="font-[var(--font-outfit)] text-3xl font-bold tracking-tight md:text-4xl">
            Care That Lives Alongside Your Family
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Every feature designed to keep pets healthy, fed, and safe — while
            giving the humans who love them less to remember and more to enjoy.
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
            Ready to Take Better Care of Your Pets?
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Schedule a free consultation and we&apos;ll design a CleverPets
            setup tailored to your household — one pet or a houseful.
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
