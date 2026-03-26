"use client";

import { useState, useRef, useEffect } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal } from "@/hooks/useGSAP";
import type { AffiliateProfession } from "@/types/affiliate";
import { faqs } from "./faq-data";

/* ──────────────────────── DATA ──────────────────────── */

const steps = [
  {
    number: "01",
    title: "Apply",
    description:
      "Fill out a quick application below. We review every submission within 1-2 business days and notify you by email.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Share",
    description:
      "Get your unique referral link. Share it with clients, post it on social, or add it to your email signature — every click is tracked.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Earn",
    description:
      "When your referral becomes a paying CleverHub customer, you earn $500. Choose manual payout or automatic Stripe transfers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const professions: { value: AffiliateProfession; label: string }[] = [
  { value: "real_estate_agent", label: "Real Estate Agent" },
  { value: "interior_decorator", label: "Interior Decorator / Designer" },
  { value: "contractor", label: "General Contractor / Builder" },
  { value: "property_manager", label: "Property Manager" },
  { value: "other", label: "Other" },
];

const qualifications = [
  {
    title: "Real Estate Agents",
    description: "Offer clients a smart home that sells itself. CleverHub is the upgrade that closes deals faster.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5M10.5 21H3m1.5 0V8.25m0 0l7.5-6 3.75 3V3h1.5v3l3.75 3" />
      </svg>
    ),
  },
  {
    title: "Interior Decorators",
    description: "Add intelligence to every room you design. Invisible tech that enhances the spaces you create.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Contractors & Builders",
    description: "Bundle CleverHub into renovation quotes. Pre-wire during construction for maximum value.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
      </svg>
    ),
  },
  {
    title: "Property Managers",
    description: "Upgrade units with smart home tech that tenants love and that reduces your maintenance burden.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
];

/* ──────────────────────── COMPONENT ──────────────────────── */

export default function AffiliateContent() {
  const stepsRef = useStaggerReveal<HTMLDivElement>(".step-card", {
    stagger: 0.12,
    y: 20,
  });
  const qualRef = useStaggerReveal<HTMLDivElement>(".qual-card", {
    stagger: 0.08,
    y: 16,
  });

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [profession, setProfession] = useState<AffiliateProfession | "">("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Counter animation for the hero $500
  const [count, setCount] = useState(0);
  const counterDone = useRef(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (counterDone.current) return;
    counterDone.current = true;
    const target = 500;
    const duration = 1200;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/affiliate/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, company, profession }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ──────── HERO ──────── */}
      <section className="relative overflow-hidden bg-warm-gray px-6 pb-28 pt-40 text-white md:pb-40 md:pt-52">
        {/* Subtle radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(0,113,227,0.15),transparent)]" />

        <div ref={heroRef} className="relative mx-auto max-w-6xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-light">
            Affiliate Program
          </p>

          <h1 className="mt-6 font-[var(--font-outfit)] text-5xl font-semibold tracking-tight md:text-7xl">
            <span className="tabular-nums">${count}</span> for Every Referral
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Know someone building a home, managing properties, or hosting guests?
            Refer them to CleverHub and earn $500 when they become a customer.
            No cap. No catch.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-accent-light"
            >
              Apply Now
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-white/50 transition-colors duration-300 hover:text-white/80"
            >
              Learn how it works &darr;
            </a>
          </div>

          {/* Floating stat pills */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {[
              { label: "Per referral", value: "$500" },
              { label: "No earnings cap", value: "Unlimited" },
              { label: "Cookie window", value: "30 days" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-full border border-white/8 bg-white/5 px-5 py-2.5 backdrop-blur-sm"
              >
                <span className="text-sm font-medium text-white">{stat.value}</span>
                <span className="ml-2 text-xs text-white/40">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── HOW IT WORKS ──────── */}
      <SectionWrapper id="how-it-works" className="bg-section-alt">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Three Simple Steps
          </p>
          <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold tracking-tight md:text-5xl">
            How It Works
          </h2>
        </div>

        <div ref={stepsRef} className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="step-card group relative rounded-2xl bg-card p-8 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
            >
              {/* Step number watermark */}
              <span className="absolute top-6 right-6 font-[var(--font-outfit)] text-5xl font-bold text-section-alt transition-colors duration-300 group-hover:text-accent/8">
                {step.number}
              </span>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/8 text-accent">
                {step.icon}
              </div>

              <h3 className="mt-6 font-[var(--font-outfit)] text-xl font-semibold">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ──────── WHO QUALIFIES ──────── */}
      <SectionWrapper>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Who Qualifies
          </p>
          <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold tracking-tight md:text-5xl">
            Built for Your Industry
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            If your clients buy, build, or manage homes — you&apos;re a perfect fit.
          </p>
        </div>

        <div ref={qualRef} className="mt-16 grid gap-6 sm:grid-cols-2">
          {qualifications.map((q) => (
            <div
              key={q.title}
              className="qual-card flex gap-5 rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/8 text-accent">
                {q.icon}
              </div>
              <div>
                <h3 className="font-[var(--font-outfit)] text-base font-semibold">
                  {q.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {q.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ──────── SIGNUP FORM ──────── */}
      <section
        id="apply"
        className="bg-section-alt px-6 py-28 md:py-40"
      >
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Get Started
            </p>
            <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold tracking-tight">
              Apply to Partner
            </h2>
            <p className="mt-4 text-base text-muted">
              Takes less than a minute. We review every application within 1-2
              business days.
            </p>
          </div>

          <div className="mt-10 rounded-2xl bg-card p-8 shadow-[var(--shadow-card)] md:p-10">
            {success ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-7 w-7 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="mt-5 font-[var(--font-outfit)] text-xl font-semibold text-foreground">
                  Application Submitted
                </h3>
                <p className="mt-2 text-sm text-muted">
                  We&apos;ll review your application and get back to you at{" "}
                  <span className="font-medium text-foreground">{email}</span>{" "}
                  within 1-2 business days.
                </p>
                <a
                  href="/"
                  className="mt-6 inline-block text-sm font-medium text-accent hover:text-accent-light"
                >
                  &larr; Back to CleverHub
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && (
                  <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label
                    htmlFor="aff-name"
                    className="mb-1.5 block text-xs font-medium text-foreground"
                  >
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="aff-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Jane Smith"
                    className="w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="aff-email"
                    className="mb-1.5 block text-xs font-medium text-foreground"
                  >
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="aff-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="jane@example.com"
                    className="w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="aff-phone"
                    className="mb-1.5 block text-xs font-medium text-foreground"
                  >
                    Phone <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="aff-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="(713) 555-0100"
                    className="w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                {/* Company (optional) */}
                <div>
                  <label
                    htmlFor="aff-company"
                    className="mb-1.5 block text-xs font-medium text-foreground"
                  >
                    Company{" "}
                    <span className="text-muted">(optional)</span>
                  </label>
                  <input
                    id="aff-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Smith Realty Group"
                    className="w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                {/* Profession */}
                <div>
                  <label
                    htmlFor="aff-profession"
                    className="mb-1.5 block text-xs font-medium text-foreground"
                  >
                    Profession <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="aff-profession"
                    value={profession}
                    onChange={(e) =>
                      setProfession(e.target.value as AffiliateProfession)
                    }
                    required
                    className="w-full appearance-none rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="" disabled>
                      Select your profession
                    </option>
                    {professions.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-accent-light disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>

                <p className="text-center text-xs text-muted">
                  By applying you agree to our partner terms. No payment required.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ──────── FAQ ──────── */}
      <SectionWrapper>
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Questions
            </p>
            <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold tracking-tight">
              Frequently Asked
            </h2>
          </div>

          <div className="mt-12 flex flex-col divide-y divide-card-border">
            {faqs.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-sm font-medium text-foreground pr-4">
                    {faq.q}
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "mt-3 max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm leading-relaxed text-muted">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ──────── BOTTOM CTA ──────── */}
      <section className="bg-warm-gray px-6 py-20 text-center text-white md:py-28">
        <p className="font-[var(--font-outfit)] text-3xl font-semibold tracking-tight md:text-4xl">
          Ready to start earning?
        </p>
        <p className="mx-auto mt-4 max-w-lg text-base text-white/50">
          Join our network of partners who are already earning $500 per referral.
        </p>
        <a
          href="#apply"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-accent-light"
        >
          Apply Now
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </section>
    </>
  );
}
