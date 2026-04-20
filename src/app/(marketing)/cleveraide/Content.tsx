"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal, useFadeIn } from "@/hooks/useGSAP";
import Link from "next/link";

const features = [
  {
    title: "Medication Management",
    description:
      "Scheduled voice reminders with confirmation tracking. \"Did you take your morning pills?\" Tracks taken, skipped, and missed doses with automatic caregiver alerts and refill reminders.",
  },
  {
    title: "Wellness Check-Ins",
    description:
      "Three daily proactive conversations — morning, afternoon, and evening — assessing mood, pain levels, and needs. Trends are shared with caregivers so nothing gets missed.",
  },
  {
    title: "Fall Detection & Inactivity Alerts",
    description:
      "Precision presence sensors detect falls and prolonged inactivity during waking hours. Graduated response: verbal check-in first, then caregiver escalation if there's no answer.",
  },
  {
    title: "Caregiver Alert System",
    description:
      "Multi-channel alerts via push notification, Telegram, and WhatsApp. Severity-based escalation ensures the right person is notified — from routine updates to critical emergencies.",
  },
  {
    title: "Daily Structured Routines",
    description:
      "Step-by-step voice guidance through morning, afternoon, and evening routines. Gentle prompts keep the day on track without feeling clinical or intrusive.",
  },
  {
    title: "Emergency Response",
    description:
      "\"I fell\" or \"Help\" triggers an intelligent assessment flow. Medical info is read aloud to first responders. Caregivers and emergency contacts are notified automatically.",
  },
  {
    title: "Accessibility Adaptations",
    description:
      "Voice-first interaction with large text, high-contrast displays, slower speaking pace, and louder volume. Designed from the ground up for hearing and vision impairments.",
  },
  {
    title: "Activity Monitoring",
    description:
      "Motion sensors, door events, and appliance usage tracked passively. Caregivers see daily activity summaries without intrusive cameras — privacy with peace of mind.",
  },
];

export default function CleverAideContent() {
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
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </div>
          </div>

          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-accent">
            For Assisted Living
          </p>
          <h1 className="mt-3 font-[var(--font-outfit)] text-4xl font-bold text-white md:text-6xl">
            CleverAide
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Voice-first care for your loved ones. Medication reminders, wellness
            check-ins, fall detection, and caregiver alerts — all powered by the
            same AI that runs your smart home.
          </p>

          <div className="mt-8 inline-block rounded-full bg-accent/10 px-6 py-2 text-lg font-bold text-accent">
            Add-on Module
          </div>
        </div>
      </section>

      {/* Features */}
      <SectionWrapper>
        <div className="text-center">
          <h2 className="font-[var(--font-outfit)] text-3xl font-bold tracking-tight md:text-4xl">
            Care That Never Sleeps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Every feature designed to keep your loved one safe, independent, and
            connected — while giving caregivers peace of mind.
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
            Ready to Care for Your Loved One?
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Schedule a free consultation and we&apos;ll design a CleverAide
            setup for your family.
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
