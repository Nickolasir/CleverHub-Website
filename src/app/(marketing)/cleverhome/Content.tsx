"use client";

import Link from "next/link";
import { useFadeIn, useStaggerReveal } from "@/hooks/useGSAP";

/* ─────────────────────────── ICONS ─────────────────────────── */

function HomeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M3 11l9-8 9 8v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" strokeLinejoin="round" />
      <path d="M9 22v-7h6v7" />
    </svg>
  );
}

function BlueprintIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  );
}

function HammerIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M13 4l7 7-3 3-7-7zM10 7L4 13l3 3 6-6" strokeLinejoin="round" />
    </svg>
  );
}

function FamilyIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M3 20a6 6 0 016-6 6 6 0 016 6" strokeLinecap="round" />
      <path d="M14 18a4 4 0 014-4 4 4 0 014 4" strokeLinecap="round" />
    </svg>
  );
}

function TrendIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <polyline points="3 17 9 11 13 15 21 6" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="14 6 21 6 21 13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CoinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9.5c-.5-1-1.5-1.5-3-1.5s-3 1-3 2.5 1.5 1.8 3 2.3 3 .8 3 2.3-1.5 2.5-3 2.5-2.5-.5-3-1.5" strokeLinecap="round" />
      <line x1="12" y1="5" x2="12" y2="7" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12" y2="19" strokeLinecap="round" />
    </svg>
  );
}

function MicIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0014 0M12 18v3" strokeLinecap="round" />
    </svg>
  );
}

function BoxIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" strokeLinejoin="round" />
      <line x1="3" y1="7" x2="12" y2="11" />
      <line x1="21" y1="7" x2="12" y2="11" />
      <line x1="12" y1="11" x2="12" y2="21" />
    </svg>
  );
}

/* ─────────────────────────── SHARED ─────────────────────────── */

const FOIL_RULE: React.CSSProperties = {
  background:
    "linear-gradient(90deg, transparent 0%, rgba(212,168,67,0.55) 20%, rgba(244,210,122,0.85) 50%, rgba(212,168,67,0.55) 80%, transparent 100%)",
};

/* Move-In Day №1 — the imagined family arriving into a CleverHome.
   The Reyes family appears across the page as the through-line. */
function MoveInCard() {
  return (
    <div className="relative w-full max-w-[420px] rounded-2xl border border-card-border bg-card p-6 shadow-[0_30px_60px_-25px_rgba(120,90,30,0.45),0_4px_12px_rgba(120,90,30,0.08)]">
      <div className="absolute right-5 top-5 flex items-center gap-2">
        <HomeIcon className="h-3.5 w-3.5 text-accent/70" />
        <span className="font-[var(--font-outfit)] text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-accent">
          Move-In Day № 1
        </span>
      </div>

      <p className="mt-1 font-[var(--font-outfit)] text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-accent-text">
        Saturday &middot; Mar 22
      </p>
      <h3 className="mt-1 font-[var(--font-outfit)] text-[2rem] font-bold leading-none tracking-tight text-foreground md:text-[2.4rem]">
        The Reyes Family
      </h3>
      <p className="mt-2 font-serif text-base italic leading-snug text-muted">
        4 BR + Office &middot; The Heights &middot; Lot 14
      </p>

      {/* Pre-configured */}
      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-card-border pt-4">
        {[
          { v: "4", l: "Family agents" },
          { v: "9", l: "Rooms" },
          { v: "23", l: "Devices" },
        ].map((s) => (
          <div key={s.l} className="text-center">
            <p className="font-[var(--font-outfit)] text-2xl font-semibold text-foreground">
              {s.v}
            </p>
            <p className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/70">
              {s.l}
            </p>
          </div>
        ))}
      </div>

      {/* Family tier matrix */}
      <div className="mt-5 border-t border-card-border pt-4">
        <p className="font-[var(--font-outfit)] text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-accent-text">
          Family Tier Matrix
        </p>
        <ul className="mt-2.5 space-y-1.5">
          {[
            { who: "Dad", agent: "Jarvis", tier: "Adult", access: "Full" },
            { who: "Mom", agent: "Friday", tier: "Adult", access: "Full" },
            { who: "Teen", agent: "Luna", tier: "Teen", access: "No locks" },
            { who: "Child", agent: "Buddy", tier: "Child", access: "Own room" },
          ].map((m) => (
            <li key={m.who} className="grid grid-cols-12 items-baseline gap-2 text-xs">
              <span className="col-span-2 font-mono uppercase tracking-wider text-muted">
                {m.who}
              </span>
              <span className="col-span-3 font-[var(--font-outfit)] font-semibold text-foreground">
                {m.agent}
              </span>
              <span className="col-span-3 font-mono text-[0.6rem] text-accent-text">
                {m.tier}
              </span>
              <span className="col-span-4 text-right font-serif italic text-muted">
                {m.access}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Builder ROI */}
      <div className="mt-5 border-t border-card-border pt-4">
        <p className="font-[var(--font-outfit)] text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-accent-text">
          Builder Economics
        </p>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="font-serif text-xs italic text-muted">
            Listing ROI
          </span>
          <span className="font-[var(--font-outfit)] text-lg font-bold text-emerald-700">
            3.6× — 13.2×
          </span>
        </div>
        <div className="mt-1 flex items-baseline justify-between">
          <span className="font-serif text-xs italic text-muted">
            Subscription rev share
          </span>
          <span className="font-mono text-xs font-semibold text-foreground">
            20% ongoing
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── PAGE DATA ─────────────────────────── */

const heroStats = [
  { value: "3.6×—13.2×", label: "Builder listing ROI" },
  { value: "20%", label: "Subscription share" },
  { value: "Day 0", label: "Move-in ready" },
];

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function CleverHomeContent() {
  const heroRef = useFadeIn<HTMLDivElement>({ y: 24, duration: 1.0 });
  const cardRef = useFadeIn<HTMLDivElement>({ y: 30, delay: 0.15 });
  const manifestoRef = useFadeIn<HTMLDivElement>({ y: 16 });
  const chaptersRef = useStaggerReveal<HTMLElement>(".moveIn-chapter", {
    stagger: 0.1,
    y: 28,
  });
  const economicsRef = useFadeIn<HTMLDivElement>({ y: 22 });
  const codaRef = useFadeIn<HTMLDivElement>({ y: 20 });

  return (
    <>
      {/* ──────────── § COVER ──────────── */}
      <section className="relative isolate overflow-hidden bg-warm-gray px-6 pb-28 pt-32 md:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 30% 35%, rgba(212,168,67,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Marginalia — blueprint grid behind the right edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-12 select-none text-accent/[0.05] md:-right-8"
        >
          <BlueprintIcon className="h-[460px] w-[460px]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-x-16 gap-y-12 md:grid-cols-12">
          <div ref={heroRef} className="md:col-span-7">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-light"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 rotate-180">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Solutions
            </Link>

            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent">
              For Homebuilders &middot; Article I
            </p>
            <h1 className="mt-5 font-[var(--font-outfit)] text-[3.5rem] font-bold leading-[0.95] tracking-tight text-white md:text-[5.5rem]">
              Clever<span className="font-serif italic font-light text-accent-light">Home</span>
            </h1>
            <p className="mt-7 max-w-xl font-serif text-xl italic leading-snug text-white/65 md:text-2xl">
              Pre-installed intelligence that sells homes faster.
              Voice in every room, family-aware AI agents, and a
              system that grows with the household — turnkey from
              move-in day, profitable through resale.
            </p>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <dt className="font-[var(--font-outfit)] text-2xl font-semibold text-accent-light md:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-white/45">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="/#consultation"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-light hover:shadow-[0_8px_24px_-8px_rgba(212,168,67,0.6)]"
              >
                Schedule a Consultation
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#chapters"
                className="text-sm font-medium uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white"
              >
                Walk through move-in ↓
              </a>
            </div>
          </div>

          <div
            ref={cardRef}
            className="relative flex justify-center md:col-span-5 md:justify-end"
          >
            <div className="relative">
              <MoveInCard />
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,168,67,0.12) 0%, transparent 70%)",
                }}
              />
            </div>
          </div>
        </div>

        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={FOIL_RULE} />
      </section>

      {/* ──────────── § MANIFESTO ──────────── */}
      <section className="relative isolate overflow-hidden bg-section-alt px-6 py-28 md:py-36">
        <div ref={manifestoRef} className="relative mx-auto max-w-4xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent-text">
            Article II &middot; The Promise
          </p>
          <h2 className="mt-6 font-[var(--font-outfit)] text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Sell the home.{" "}
            <span className="font-serif italic font-light text-accent-text">
              Keep the upside.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-lg italic leading-relaxed text-muted md:text-xl">
            Move-in day is not the end of the relationship — it&apos;s the
            start of an annuity. Builders ship a smarter listing,
            differentiate the lot, capture an install upgrade, and
            then share in the subscription revenue for as long as the
            family stays.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {[
              { icon: BlueprintIcon, label: "Pre-wired in build" },
              { icon: HomeIcon, label: "Turnkey at move-in" },
              { icon: TrendIcon, label: "Listing differentiator" },
              { icon: CoinIcon, label: "20% rev share" },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.label} className="flex flex-col items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent-text">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">
                    {p.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────── § CHAPTERS ──────────── */}
      <section
        id="chapters"
        ref={chaptersRef}
        className="relative isolate overflow-hidden bg-warm-gray px-6 py-28 md:py-36"
      >
        <div className="mx-auto mb-20 max-w-6xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent">
            Article III &middot; From Foundation to Move-In
          </p>
          <h2 className="mt-5 max-w-3xl font-[var(--font-outfit)] text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">
            Four chapters,{" "}
            <span className="font-serif italic font-light text-accent-light">
              one build cycle.
            </span>
          </h2>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-24">
          {/* §I PRE-BUILD */}
          <article className="moveIn-chapter grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-light/85 md:text-[8rem]">
                  §I
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-light">
                    Plan stage
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Pre-Build
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-white/65">
                CleverHub goes into the plan set. Hub location, satellite
                node count, conduit, and low-voltage runs are specified
                at the same time as the rest of the smart-home rough-in.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-light">
                <BlueprintIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
                  Plan set &middot; Specs &middot; Conduit
                </span>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#23211e] p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-light">
                  Plan specification &middot; Lot 14
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { l: "Hub location", v: "Mudroom alcove" },
                    { l: "Satellite nodes", v: "4 rooms + office" },
                    { l: "Low-voltage runs", v: "9 zones" },
                    { l: "Hardware budget", v: "$2,500" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="rounded-xl border border-white/10 bg-black/30 p-3"
                    >
                      <p className="font-mono text-[0.55rem] uppercase tracking-wider text-white/40">
                        {s.l}
                      </p>
                      <p className="mt-0.5 font-[var(--font-outfit)] text-sm font-semibold text-white">
                        {s.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* §II BUILD */}
          <article className="moveIn-chapter grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:order-2 md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-light/85 md:text-[8rem]">
                  §II
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-light">
                    Framing → trim
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Build
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-white/65">
                Pre-wire during framing. Drop nodes during electrical
                rough-in. The hub is mounted at trim. By the time the
                house gets its cert of occupancy, the home is already
                listening.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-light">
                <HammerIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
                  Pre-wire &middot; Mount &middot; Commission
                </span>
              </div>
            </div>

            <div className="md:order-1 md:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#23211e] p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-light">
                  Build phases &middot; CleverHub touchpoints
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    { phase: "Foundation", note: "—", state: "skip" },
                    { phase: "Framing", note: "Conduit & low-voltage runs", state: "active" },
                    { phase: "Electrical rough-in", note: "Satellite node drops", state: "active" },
                    { phase: "Drywall", note: "Hub backing block", state: "active" },
                    { phase: "Trim", note: "Hub + node mount, commission", state: "active" },
                  ].map((p) => (
                    <li
                      key={p.phase}
                      className={`flex items-center gap-4 border-l-2 pl-3 ${
                        p.state === "active"
                          ? "border-accent-light/65"
                          : "border-white/15"
                      }`}
                    >
                      <span
                        className={`flex-1 text-sm font-medium ${
                          p.state === "active" ? "text-white/90" : "text-white/45"
                        }`}
                      >
                        {p.phase}
                      </span>
                      <span className="font-serif text-xs italic text-white/55">
                        {p.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          {/* §III MOVE-IN */}
          <article className="moveIn-chapter grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-light/85 md:text-[8rem]">
                  §III
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-light">
                    Day 0
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Move-In Day
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-white/65">
                The Reyes family walks through the door. Dad says
                &ldquo;Hey Jarvis,&rdquo; mom says &ldquo;Hey
                Friday,&rdquo; the teen says &ldquo;Hey Luna&rdquo; —
                each greeted by their own wake word, with the right
                permissions, in the right room.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-light">
                <BoxIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
                  Setup &middot; Greetings &middot; First scenes
                </span>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#23211e] p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-light">
                  First voice events &middot; Sat 11:14
                </p>

                {/* Conversation */}
                <div className="mt-4 space-y-2.5 font-serif italic">
                  <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-md bg-accent/20 px-4 py-2.5 text-sm text-white/85">
                    &ldquo;Hey Jarvis, turn on the lights.&rdquo;
                  </div>
                  <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-white/[0.06] px-4 py-2.5 text-sm text-white/75">
                    Welcome home, Mr. Reyes. Living room lights up.
                  </div>
                  <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-md bg-accent/20 px-4 py-2.5 text-sm text-white/85">
                    &ldquo;Hey Luna, play something upbeat.&rdquo;
                  </div>
                  <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-white/[0.06] px-4 py-2.5 text-sm text-white/75">
                    Hi Mia! Queueing your move-in playlist in the
                    bedroom.
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-3 not-italic">
                  {["Jarvis", "Friday", "Luna", "Buddy"].map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-accent-light"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* §IV YEAR ONE */}
          <article className="moveIn-chapter grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:order-2 md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-light/85 md:text-[8rem]">
                  §IV
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-light">
                    Month 1 → resale
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Year One &amp; After
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-white/65">
                The home grows up with the household. New devices auto-
                discover. Family agents tune to schedules. When the
                house lists again, the listing reads &ldquo;already
                CleverHome&rdquo; — and the builder still earns rev
                share.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-light">
                <FamilyIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
                  Grows in &middot; Resale ready
                </span>
              </div>
            </div>

            <div className="md:order-1 md:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#23211e] p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-light">
                  Annuity ledger &middot; Year 1 sample lot
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { v: "$2,500", l: "Install upgrade", at: "Close" },
                    { v: "$24 / mo", l: "Rev share · 20%", at: "Year 1" },
                    { v: "Resale +", l: "Listing premium", at: "Year 5" },
                    { v: "Re-bookable", l: "Refresh visits", at: "Annual" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="rounded-xl border border-white/10 bg-black/30 px-3 py-3"
                    >
                      <p className="font-mono text-[0.55rem] uppercase tracking-wider text-white/40">
                        {s.l}
                      </p>
                      <p className="mt-0.5 font-[var(--font-outfit)] text-base font-semibold text-white">
                        {s.v}
                      </p>
                      <p className="mt-0.5 font-serif text-[0.65rem] italic text-white/45">
                        {s.at}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 border-t border-white/10 pt-3 text-center font-serif text-xs italic text-white/55">
                  Compounded across a 12-lot subdivision: a six-figure
                  annuity by year three.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ──────────── § BUILDER ECONOMICS ──────────── */}
      <section className="relative isolate overflow-hidden bg-section-alt px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div ref={economicsRef} className="grid grid-cols-1 items-start gap-x-16 gap-y-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent-text">
                Article IV &middot; The Ledger
              </p>
              <h2 className="mt-5 font-[var(--font-outfit)] text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl">
                The economics,{" "}
                <span className="font-serif italic font-light text-accent-text">
                  in one table.
                </span>
              </h2>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-muted">
                A modeled lot — what comes in, what goes out, what stays
                yours after the family moves in. Conservative
                assumptions, real numbers.
              </p>
              <div className="mt-8 flex items-center gap-2 text-accent-text">
                <TrendIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">
                  Modeled · single lot
                </span>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card-hover)] md:p-8">
                <div className="flex items-baseline justify-between border-b border-card-border pb-4">
                  <p className="font-[var(--font-outfit)] text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-accent-text">
                    Builder P&amp;L &middot; Year 1
                  </p>
                  <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                    One lot
                  </p>
                </div>

                <ul className="mt-4 flex flex-col divide-y divide-card-border">
                  {[
                    { l: "Hardware + install passthrough", v: "$2,500", note: "Captured at close" },
                    { l: "Listing premium estimate", v: "+ $9,000", note: "Conservative · varies by market" },
                    { l: "Days on market — improvement", v: "-7 days", note: "Avg vs. control lots" },
                    { l: "Monthly rev share", v: "$24 / mo", note: "20% of subscription · ongoing" },
                    { l: "Modeled 3-year contribution", v: "$11,864", note: "Per lot · upgrade + share" },
                    { l: "Effective ROI on builder cost", v: "3.6× — 13.2×", note: "Range by package + market", highlight: true },
                  ].map((r) => (
                    <li key={r.l} className="flex items-baseline justify-between gap-4 py-3.5">
                      <div className="flex-1">
                        <p className="font-[var(--font-outfit)] text-sm font-medium text-foreground">
                          {r.l}
                        </p>
                        <p className="mt-0.5 font-serif text-xs italic text-muted">
                          {r.note}
                        </p>
                      </div>
                      <span
                        className={`font-[var(--font-outfit)] text-base font-semibold ${
                          r.highlight ? "text-emerald-700" : "text-foreground"
                        }`}
                      >
                        {r.v}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── § CODA ──────────── */}
      <section className="relative isolate overflow-hidden bg-warm-gray px-6 py-32 text-center md:py-40">
        <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={FOIL_RULE} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 60%, rgba(212,168,67,0.16) 0%, transparent 70%)",
          }}
        />

        <div ref={codaRef} className="relative mx-auto max-w-3xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-accent-light">
            Coda
          </p>
          <h2 className="mt-6 font-[var(--font-outfit)] text-5xl font-light leading-[1.05] tracking-tight text-white md:text-7xl">
            Ship a smarter{" "}
            <span className="font-serif italic font-light text-accent-light">
              listing.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl font-serif text-lg italic leading-relaxed text-white/60 md:text-xl">
            We&apos;ll design a CleverHome package for your subdivision —
            spec, install, commission, and a long tail of revenue past
            move-in day.
          </p>

          <a
            href="/#consultation"
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-accent px-10 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-accent-light hover:shadow-[0_12px_32px_-8px_rgba(212,168,67,0.55)]"
          >
            Schedule a Consultation
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <div className="mt-16 flex items-center justify-center gap-10 text-white/30">
            {[BlueprintIcon, HammerIcon, HomeIcon, FamilyIcon, MicIcon].map((Icon, i) => (
              <Icon key={i} className="h-7 w-7" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
