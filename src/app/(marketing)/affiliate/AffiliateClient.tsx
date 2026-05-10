"use client";

import { useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import { useFadeIn, useStaggerReveal } from "@/hooks/useGSAP";
import type { AffiliateProfession } from "@/types/affiliate";
import { faqs } from "./faq-data";

/* ─────────────────────────── DATA ─────────────────────────── */

const movements = [
  {
    numeral: "I",
    label: "Apply",
    headline: "Submit a brief letter of interest.",
    body:
      "A short application below — name, profession, how to reach you. Every submission is read by a human; reviewed within one to two business days.",
  },
  {
    numeral: "II",
    label: "Share",
    headline: "Receive a private referral handle.",
    body:
      "On approval you receive a personal six-character code and a tracked link. Hand it to clients, place it in proposals, set it in your email signature.",
  },
  {
    numeral: "III",
    label: "Earn",
    headline: "Two-fifty, or ten percent.",
    body:
      "When your referral becomes a paying CleverHub customer, you receive the greater of $250 or 10% of the sale. Choose Stripe for automatic transfers, or take your payout by check or Zelle.",
  },
];

const professions: { value: AffiliateProfession; label: string }[] = [
  { value: "real_estate_agent", label: "Real Estate Agent" },
  { value: "interior_decorator", label: "Interior Designer / Decorator" },
  { value: "contractor", label: "General Contractor / Builder" },
  { value: "property_manager", label: "Property Manager" },
  { value: "other", label: "Other Profession" },
];

const specialists = [
  {
    pro: "The Agent",
    body:
      "Offer a smart-home upgrade that closes deals faster. Listings that demonstrate local AI control photograph and tour like new construction.",
  },
  {
    pro: "The Designer",
    body:
      "Add a quiet layer of intelligence beneath the rooms you craft. Ambient, invisible, and tuned to the lighting and acoustics you already specified.",
  },
  {
    pro: "The Builder",
    body:
      "Bundle CleverHub into renovation quotes or pre-wire during the framing stage — the highest-margin upgrade you can include in a build packet.",
  },
  {
    pro: "The Property Manager",
    body:
      "Reduce service tickets and turnover friction. Tenants get voice-controlled comfort; you get a portfolio that markets itself in vacancy listings.",
  },
];

const ledger = [
  { value: "$250 / 10%", label: "Per referral, the greater" },
  { value: "Unlimited", label: "No earnings cap" },
  { value: "30 days", label: "Cookie window" },
  { value: "1–2 days", label: "Application review" },
];

/* ────────────────── SHARED DECORATIONS ────────────────── */

function PaperGrain() {
  // Subtle SVG grain — fixed overlay, behind interactive layer.
  // Renders once at the page root; very low opacity so it reads as paper texture.
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.06] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.30  0 0 0 0 0.22  0 0 0 0 0.10  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundSize: "240px 240px",
      }}
    />
  );
}

function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto flex items-center gap-3 ${className}`}>
      <span className="h-px w-16 bg-[var(--accent)]/60" />
      <span className="block h-1.5 w-1.5 rotate-45 bg-[var(--accent)]" />
      <span className="h-px w-16 bg-[var(--accent)]/60" />
    </div>
  );
}

function ChapterHead({
  numeral,
  title,
  kicker,
}: {
  numeral: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="flex items-end gap-6 md:gap-10">
      <span
        aria-hidden
        className="font-fraunces text-[5.5rem] leading-none font-light italic text-[var(--accent)] md:text-[8rem]"
        style={{ fontFeatureSettings: "'ss01'", fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
      >
        §{numeral}
      </span>
      <div className="pb-3 md:pb-5">
        {kicker ? (
          <p className="mb-2 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-[var(--accent-text)]">
            {kicker}
          </p>
        ) : null}
        <h2 className="font-fraunces text-3xl font-medium leading-[1.05] tracking-tight text-foreground md:text-5xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

/* ─────────────────────── COMPONENT ─────────────────────── */

export function AffiliateClient() {
  // Form state — preserves the existing /api/affiliate/signup contract.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [profession, setProfession] = useState<AffiliateProfession | "">("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const formId = useId();

  // Hero counter — eased ramp from 0 to the $250 floor.
  const [count, setCount] = useState(0);
  const counterDone = useRef(false);
  useEffect(() => {
    if (counterDone.current) return;
    counterDone.current = true;
    const target = 250;
    const duration = 1400;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, []);

  // Section reveals (uses existing GSAP hooks).
  const heroRef = useFadeIn<HTMLElement>({ y: 24, duration: 1.0 });
  const premiseRef = useFadeIn<HTMLElement>({ y: 18 });
  const movementsRef = useStaggerReveal<HTMLDivElement>(".movement-card", {
    stagger: 0.12,
    y: 22,
  });
  const specialistsRef = useStaggerReveal<HTMLDivElement>(".specialist-row", {
    stagger: 0.08,
    y: 14,
  });
  const formSectionRef = useFadeIn<HTMLElement>({ y: 18 });
  const codaRef = useFadeIn<HTMLElement>({ y: 14 });

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
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .font-fraunces {
          font-family: var(--font-fraunces), "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, serif;
        }
        .ledger-num {
          font-feature-settings: "tnum" 1, "lnum" 1;
        }
        @keyframes draw-underline {
          from { stroke-dashoffset: 480; }
          to   { stroke-dashoffset: 0; }
        }
        .underline-svg path {
          stroke-dasharray: 480;
          stroke-dashoffset: 480;
          animation: draw-underline 1.6s cubic-bezier(0.5, 0.05, 0.2, 1) 0.4s forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .underline-svg path {
            animation: none;
            stroke-dashoffset: 0;
          }
        }
        .field-line input,
        .field-line select,
        .field-line textarea {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(120, 100, 60, 0.28);
          border-radius: 0;
          padding: 10px 2px 8px;
          font-family: var(--font-outfit), system-ui, sans-serif;
          font-size: 1rem;
          color: var(--foreground);
          width: 100%;
          outline: none;
          transition: border-color 200ms ease;
        }
        .field-line input:focus,
        .field-line select:focus,
        .field-line textarea:focus {
          border-bottom-color: var(--accent);
        }
        .field-line select {
          appearance: none;
          padding-right: 1.25rem;
          cursor: pointer;
        }
        .faq-list > li:last-child { border-bottom: 1px solid var(--card-border); }
        @media (min-width: 768px) {
          .faq-list > li:nth-last-child(2):not(:last-child) { border-bottom: 1px solid var(--card-border); }
        }
      `,
        }}
      />

      <PaperGrain />

      {/* ─────────────── § COVER ─────────────── */}
      <section
        ref={heroRef}
        className="relative isolate z-10 overflow-hidden bg-[var(--background)] px-6 pb-28 pt-36 md:pb-40 md:pt-44"
      >
        {/* Marginalia — Issue masthead */}
        <div className="mx-auto mb-12 flex max-w-7xl flex-col items-start justify-between gap-2 md:flex-row md:items-end">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.4em] text-[var(--accent-text)]">
            CleverHub <span className="mx-2 opacity-40">·</span> Partner Program
            <span className="mx-2 opacity-40">·</span> Issue No. 01
          </p>
          <p className="font-fraunces text-sm italic text-[var(--muted)]">
            Established Houston, Texas
          </p>
        </div>

        {/* Editorial headline grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-x-12 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1 className="font-fraunces text-[3.2rem] font-light leading-[0.92] tracking-[-0.02em] text-foreground md:text-[6.4rem]">
              Two-fifty,
              <br />
              <span className="relative inline-block">
                <span className="italic">or ten percent</span>
                <svg
                  className="underline-svg pointer-events-none absolute left-[-2%] top-[78%] w-[104%]"
                  viewBox="0 0 480 30"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 18 C 80 4, 180 26, 260 12 S 420 6, 478 14"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-foreground/60">.</span>
            </h1>
            <p className="mt-10 max-w-xl font-fraunces text-xl font-light italic leading-snug text-[var(--muted)] md:text-2xl">
              Whichever pays you more — for every home you bring to CleverHub.
            </p>
          </div>

          {/* Right-rail tearsheet */}
          <aside className="md:col-span-4 md:pb-8">
            <div className="border-t border-b border-[var(--accent)]/35 py-8">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[var(--accent-text)]">
                Per referral, the greater of
              </p>
              <p className="ledger-num mt-3 flex items-baseline gap-4 font-fraunces leading-none text-foreground">
                <span className="text-7xl font-light md:text-8xl">${count}</span>
              </p>
              <p className="ledger-num mt-2 font-fraunces text-3xl font-light italic text-[var(--accent-text)] md:text-4xl">
                or 10% of the sale.
              </p>
              <p className="mt-4 font-fraunces text-sm italic text-[var(--muted)]">
                Paid in full when the referral becomes a customer.
                No cap. No catch.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="#apply"
                className="group inline-flex items-center justify-between rounded-none border border-foreground bg-foreground px-6 py-4 text-sm font-medium uppercase tracking-[0.18em] text-[var(--background)] transition-all duration-300 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-foreground"
              >
                Apply to the Program
                <span aria-hidden className="ml-4 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#program"
                className="inline-flex items-center justify-between px-1 py-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--muted)] transition-colors hover:text-foreground"
              >
                Read the program
                <span aria-hidden className="ml-4">↓</span>
              </a>
            </div>
          </aside>
        </div>

        <GoldRule className="mt-24 md:mt-32" />
      </section>

      {/* ─────────────── § I — THE PREMISE ─────────────── */}
      <section
        ref={premiseRef}
        id="program"
        className="relative z-10 bg-[var(--background)] px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <ChapterHead
            kicker="Article I"
            numeral="I"
            title="The Premise."
          />

          <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="font-fraunces text-2xl font-light leading-[1.5] text-foreground md:text-[1.7rem]">
                <span className="font-fraunces text-5xl font-light italic text-[var(--accent)]">C</span>
                leverHub is the AI smart-home system Houston has been waiting on — a
                glossy black sphere on the counter, four satellites in the rooms,
                voice you don&apos;t have to repeat. We&apos;d rather pay the people who
                already know our buyer than spend it on cold ads.
              </p>
              <p className="mt-6 max-w-2xl text-base leading-[1.75] text-[var(--muted)]">
                If you sell, design, build, or manage homes, every conversation you
                have already touches our customer. Refer them in — we close, install,
                and support; you take the greater of $250 or ten percent of the
                sale per home, with no quota, no minimum, and no exclusivity
                contract to sign.
              </p>
            </div>

            {/* Ledger sidebar */}
            <aside className="md:col-span-5">
              <div className="rounded-none border border-[var(--card-border)] bg-[var(--section-alt)] p-8 shadow-[var(--shadow-card)]">
                <p className="font-fraunces text-sm italic text-[var(--accent-text)]">
                  — The Ledger —
                </p>
                <dl className="mt-6 divide-y divide-[var(--card-border)]">
                  {ledger.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between py-3.5"
                    >
                      <dt className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                        {row.label}
                      </dt>
                      <dd className="ledger-num font-fraunces text-2xl font-medium text-foreground">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─────────────── § II — THREE MOVEMENTS ─────────────── */}
      <section className="relative z-10 bg-[var(--section-alt)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <ChapterHead
            kicker="Article II"
            numeral="II"
            title="Three movements."
          />

          <p className="mt-8 max-w-2xl font-fraunces text-lg italic text-[var(--muted)] md:text-xl">
            Apply, share, earn — the entire program is three steps. Anything
            longer than that we consider an inconvenience to you.
          </p>

          <div
            ref={movementsRef}
            className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8"
          >
            {movements.map((m, idx) => (
              <article key={m.numeral} className="movement-card relative">
                {/* Roman numeral */}
                <p
                  aria-hidden
                  className="font-fraunces text-[7rem] font-light italic leading-none text-[var(--accent)]/85 md:text-[9rem]"
                  style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
                >
                  {m.numeral}
                </p>

                {/* Hairline rule */}
                <div className="mt-2 mb-5 h-px w-12 bg-[var(--accent)]" />

                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[var(--accent-text)]">
                  Movement {idx + 1} · {m.label}
                </p>
                <h3 className="mt-3 font-fraunces text-2xl font-medium leading-tight text-foreground md:text-[1.7rem]">
                  {m.headline}
                </h3>
                <p className="mt-4 max-w-xs text-[0.95rem] leading-[1.7] text-[var(--muted)]">
                  {m.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── § III — SPECIALISTS ─────────────── */}
      <section className="relative z-10 bg-[var(--background)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <ChapterHead
            kicker="Article III"
            numeral="III"
            title="Built for specialists."
          />

          <p className="mt-8 max-w-2xl font-fraunces text-lg italic text-[var(--muted)] md:text-xl">
            We don&apos;t pay influencers. We pay the people whose work brings
            CleverHub into rooms it would otherwise never reach.
          </p>

          <div ref={specialistsRef} className="mt-16">
            {specialists.map((s, i) => (
              <div
                key={s.pro}
                className="specialist-row grid grid-cols-12 items-baseline gap-x-6 gap-y-3 border-t border-[var(--card-border)] py-8 md:py-10"
              >
                <p
                  aria-hidden
                  className="ledger-num col-span-2 font-fraunces text-lg font-light italic text-[var(--accent-text)] md:text-2xl"
                >
                  No. {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="col-span-10 font-fraunces text-3xl font-medium leading-tight text-foreground md:col-span-4 md:text-[2.5rem]">
                  {s.pro}
                </h3>
                <p className="col-span-12 max-w-xl text-base leading-[1.7] text-[var(--muted)] md:col-span-6">
                  {s.body}
                </p>
              </div>
            ))}
            <div className="border-t border-[var(--card-border)]" />
          </div>
        </div>
      </section>

      {/* ─────────────── § IV — LETTER OF INTENT (FORM) ─────────────── */}
      <section
        id="apply"
        ref={formSectionRef}
        className="relative z-10 bg-[var(--section-alt)] px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[var(--accent-text)]">
              Article IV · The Application
            </p>
            <h2 className="mt-4 font-fraunces text-4xl font-medium tracking-tight text-foreground md:text-6xl">
              Memorandum of Application.
            </h2>
            <p className="mx-auto mt-5 max-w-lg font-fraunces text-lg italic text-[var(--muted)]">
              A short letter of intent. We&apos;ll respond within one to two business
              days, by hand.
            </p>
          </div>

          {/* The "page" */}
          <div className="relative mt-14 bg-[var(--background)] p-8 shadow-[0_30px_60px_-30px_rgba(120,90,30,0.25),0_2px_8px_rgba(120,90,30,0.06)] md:p-14">
            {/* Foil corner mark */}
            <div className="absolute right-7 top-7 flex flex-col items-end">
              <p className="font-fraunces text-[0.65rem] uppercase tracking-[0.3em] text-[var(--accent-text)]">
                CleverHub
              </p>
              <p className="font-fraunces text-[0.6rem] italic text-[var(--muted)]">
                Houston, Tex.
              </p>
              <div className="mt-2 h-px w-10 bg-[var(--accent)]" />
            </div>

            {success ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)]/10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 text-[var(--accent-text)]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.75l5 5 9-9" />
                  </svg>
                </div>
                <h3 className="mt-6 font-fraunces text-3xl font-medium text-foreground">
                  Received, with thanks.
                </h3>
                <p className="mx-auto mt-4 max-w-md font-fraunces text-base italic leading-relaxed text-[var(--muted)]">
                  Your letter of intent has been logged. We&apos;ll write back to{" "}
                  <span className="not-italic font-medium text-foreground">{email}</span>{" "}
                  within one to two business days.
                </p>
                <GoldRule className="mt-10" />
                <Link
                  href="/"
                  className="mt-8 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-text)] transition-colors hover:text-foreground"
                >
                  ← Return to CleverHub
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-7 pt-2">
                <p className="font-fraunces text-base italic leading-relaxed text-[var(--muted)]">
                  To the partnership desk at CleverHub —
                </p>

                {error && (
                  <div className="border-l-2 border-red-500 bg-red-50/60 px-4 py-3 font-fraunces text-sm italic text-red-700">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                  <div className="field-line">
                    <label
                      htmlFor={`${formId}-name`}
                      className="font-fraunces text-[0.7rem] font-medium uppercase tracking-[0.25em] text-[var(--accent-text)]"
                    >
                      <span className="italic">Signed,</span> Full name
                    </label>
                    <input
                      id={`${formId}-name`}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Jane M. Smith"
                    />
                  </div>

                  <div className="field-line">
                    <label
                      htmlFor={`${formId}-email`}
                      className="font-fraunces text-[0.7rem] font-medium uppercase tracking-[0.25em] text-[var(--accent-text)]"
                    >
                      <span className="italic">Reach me at,</span> Email
                    </label>
                    <input
                      id={`${formId}-email`}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div className="field-line">
                    <label
                      htmlFor={`${formId}-phone`}
                      className="font-fraunces text-[0.7rem] font-medium uppercase tracking-[0.25em] text-[var(--accent-text)]"
                    >
                      <span className="italic">Or call,</span> Phone
                    </label>
                    <input
                      id={`${formId}-phone`}
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="(713) 555 — 0100"
                    />
                  </div>

                  <div className="field-line">
                    <label
                      htmlFor={`${formId}-company`}
                      className="font-fraunces text-[0.7rem] font-medium uppercase tracking-[0.25em] text-[var(--accent-text)]"
                    >
                      <span className="italic">On behalf of,</span> Company{" "}
                      <span className="text-[var(--muted)] normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id={`${formId}-company`}
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Smith Realty Group"
                    />
                  </div>

                  <div className="field-line md:col-span-2">
                    <label
                      htmlFor={`${formId}-profession`}
                      className="font-fraunces text-[0.7rem] font-medium uppercase tracking-[0.25em] text-[var(--accent-text)]"
                    >
                      <span className="italic">In my capacity as,</span> Profession
                    </label>
                    <select
                      id={`${formId}-profession`}
                      value={profession}
                      onChange={(e) =>
                        setProfession(e.target.value as AffiliateProfession)
                      }
                      required
                    >
                      <option value="" disabled>
                        Select your profession…
                      </option>
                      {professions.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex flex-col items-stretch gap-4 border-t border-dashed border-[var(--card-border)] pt-7 md:flex-row md:items-center md:justify-between">
                  <p className="font-fraunces text-sm italic text-[var(--muted)]">
                    By submitting, I agree to the partner program terms.
                    No payment is required.
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center justify-center gap-3 rounded-none border border-foreground bg-foreground px-8 py-4 text-sm font-medium uppercase tracking-[0.22em] text-[var(--background)] transition-all duration-300 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-foreground disabled:opacity-50"
                  >
                    {loading ? (
                      <>Submitting…</>
                    ) : (
                      <>
                        Sign &amp; Submit
                        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────── § V — INQUIRIES ─────────────── */}
      <section className="relative z-10 bg-[var(--background)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <ChapterHead
            kicker="Article V"
            numeral="V"
            title="Common inquiries."
          />

          <ul className="faq-list mt-16 grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <li
                  key={i}
                  className="border-t border-[var(--card-border)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-7 text-left transition-colors group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-fraunces text-xl font-medium leading-snug text-foreground transition-colors group-hover:text-[var(--accent-text)] md:text-[1.4rem]">
                      {faq.q}
                    </span>
                    <span
                      aria-hidden
                      className={`mt-1.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--accent)]/50 font-fraunces text-base text-[var(--accent-text)] transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-[var(--accent)] text-[var(--background)]" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isOpen ? "max-h-64 pb-7 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="max-w-md font-fraunces text-base italic leading-[1.75] text-[var(--muted)]">
                      {faq.a}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ─────────────── § CODA ─────────────── */}
      <section
        ref={codaRef}
        className="relative z-10 overflow-hidden bg-[var(--warm-gray)] px-6 py-28 text-white md:py-36"
      >
        {/* Foil rule */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--accent) 20%, #f4d27a 50%, var(--accent) 80%, transparent 100%)",
          }}
        />

        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-[var(--accent-light)]">
            Coda
          </p>
          <h2 className="mt-6 font-fraunces text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
            Begin the
            <br />
            <span className="italic" style={{ color: "var(--accent-light)" }}>
              correspondence.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-md font-fraunces text-lg italic text-white/55 md:text-xl">
            Apply once. Refer for as long as it pays you.
          </p>

          <a
            href="#apply"
            className="group mt-12 inline-flex items-center gap-4 rounded-none border-b border-[var(--accent-light)] pb-2 font-fraunces text-2xl italic text-[var(--accent-light)] transition-all hover:gap-6 hover:text-white md:text-3xl"
          >
            Sign &amp; submit
            <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </>
  );
}
