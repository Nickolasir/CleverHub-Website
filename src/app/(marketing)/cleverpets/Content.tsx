"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useFadeIn, useStaggerReveal } from "@/hooks/useGSAP";

/* ─────────────────────────── ICONS ─────────────────────────── */

function PawGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <ellipse cx="5.5" cy="10" rx="1.7" ry="2.3" />
      <ellipse cx="9.5" cy="6.4" rx="1.7" ry="2.5" />
      <ellipse cx="14.5" cy="6.4" rx="1.7" ry="2.5" />
      <ellipse cx="18.5" cy="10" rx="1.7" ry="2.3" />
      <path d="M12 12.2c-3 0-5.5 2.4-5.5 5 0 1.5 1.2 2.7 2.7 2.7 1 0 2-.6 2.8-.6.8 0 1.8.6 2.8.6 1.5 0 2.7-1.2 2.7-2.7 0-2.6-2.5-5-5.5-5z" />
    </svg>
  );
}

function PillIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="9" width="18" height="6" rx="3" />
      <line x1="12" y1="9" x2="12" y2="15" />
    </svg>
  );
}

function StethoscopeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M4 4v6a5 5 0 0010 0V4" />
      <path d="M9 18a3 3 0 006 0v-3" strokeLinecap="round" />
      <circle cx="18" cy="11" r="2" />
    </svg>
  );
}

function BowlIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M3 12h18a8 8 0 01-8 8h-2a8 8 0 01-8-8z" />
      <path d="M9 9c0-1 1-2 2-2M14 9c0-1.5-1-2-2-2" strokeLinecap="round" />
    </svg>
  );
}

function ClipboardIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertTriangleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M12 3l10 18H2L12 3z" strokeLinejoin="round" />
      <line x1="12" y1="10" x2="12" y2="14" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12" y2="17.5" strokeLinecap="round" />
    </svg>
  );
}

function DevicesIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="6" width="9" height="12" rx="2" />
      <rect x="14" y="9" width="7" height="9" rx="1.5" />
      <circle cx="7.5" cy="14.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function WalkIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <circle cx="13" cy="4.5" r="1.6" />
      <path d="M10 21l2-7-3-3 2-5 3 3 3 1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 16l-1 5" strokeLinecap="round" />
      <path d="M6 21l3-5" strokeLinecap="round" />
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

/* ─────────────────────────── SHARED ─────────────────────────── */

const DOSSIER_RULE_STYLE: React.CSSProperties = {
  background:
    "linear-gradient(90deg, transparent 0%, rgba(212,168,67,0.55) 20%, rgba(244,210,122,0.85) 50%, rgba(212,168,67,0.55) 80%, transparent 100%)",
};

/* Reusable Profile №01 card — also referenced from homepage section.
   Renders Max the Golden Retriever — the same imaginary household pet
   appears across the page so the system feels like one continuous record. */
function ProfileCard({ tone = "light" }: { tone?: "light" | "dark" }) {
  const darkMode = tone === "dark";
  return (
    <div
      className={`relative w-full max-w-[360px] rounded-2xl p-6 shadow-[0_30px_60px_-25px_rgba(120,90,30,0.45),0_4px_12px_rgba(120,90,30,0.08)] ${
        darkMode
          ? "border border-white/10 bg-[#23211e] backdrop-blur-sm"
          : "border border-card-border bg-card"
      }`}
    >
      {/* Foil corner mark */}
      <div className="absolute right-5 top-5 flex items-center gap-2">
        <PawGlyph className={`h-3.5 w-3.5 ${darkMode ? "text-accent-light" : "text-accent/70"}`} />
        <span className="font-[var(--font-outfit)] text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-accent">
          Profile № 01
        </span>
      </div>

      {/* Pet identity */}
      <div className="mt-1">
        <h3
          className={`font-[var(--font-outfit)] text-[2.5rem] font-bold leading-none tracking-tight ${
            darkMode ? "text-white" : "text-foreground"
          }`}
        >
          Max
        </h3>
        <p
          className={`mt-2 font-serif text-base italic leading-snug ${
            darkMode ? "text-white/70" : "text-muted"
          }`}
        >
          Golden Retriever &middot; Male &middot; 4 yrs
        </p>
        <p
          className={`mt-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] ${
            darkMode ? "text-white/35" : "text-muted/60"
          }`}
        >
          Microchip 985&nbsp;121&nbsp;003
        </p>
      </div>

      {/* Active meds */}
      <div className={`mt-6 border-t pt-4 ${darkMode ? "border-white/10" : "border-card-border"}`}>
        <p className="font-[var(--font-outfit)] text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-accent-text">
          Active Meds
        </p>
        <ul className="mt-2.5 flex flex-col gap-2">
          {[
            { drug: "Apoquel 16 mg", schedule: "1× daily" },
            { drug: "Cosequin DS", schedule: "2× daily" },
          ].map((m) => (
            <li key={m.drug} className="flex items-baseline justify-between gap-2">
              <span
                className={`text-sm font-medium ${
                  darkMode ? "text-white/90" : "text-foreground"
                }`}
              >
                {m.drug}
              </span>
              <span
                className={`font-mono text-[0.65rem] tracking-wide ${
                  darkMode ? "text-white/45" : "text-muted"
                }`}
              >
                {m.schedule}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer grid */}
      <div className={`mt-5 grid grid-cols-2 gap-4 border-t pt-4 ${darkMode ? "border-white/10" : "border-card-border"}`}>
        <div>
          <p
            className={`text-[0.58rem] font-semibold uppercase tracking-[0.22em] ${
              darkMode ? "text-white/40" : "text-muted"
            }`}
          >
            Weight
          </p>
          <p
            className={`mt-0.5 font-[var(--font-outfit)] text-lg font-semibold ${
              darkMode ? "text-white" : "text-foreground"
            }`}
          >
            31.4 kg
          </p>
          <p
            className={`text-[0.62rem] ${darkMode ? "text-emerald-300/70" : "text-emerald-700/80"}`}
          >
            BCS 5/9 &middot; Ideal
          </p>
        </div>
        <div>
          <p
            className={`text-[0.58rem] font-semibold uppercase tracking-[0.22em] ${
              darkMode ? "text-white/40" : "text-muted"
            }`}
          >
            Next Vet
          </p>
          <p
            className={`mt-0.5 font-[var(--font-outfit)] text-lg font-semibold ${
              darkMode ? "text-white" : "text-foreground"
            }`}
          >
            Mar 21
          </p>
          <p
            className={`text-[0.62rem] ${darkMode ? "text-white/45" : "text-muted"}`}
          >
            Bellaire Vet
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── DATA ─────────────────────────── */

const heroStats = [
  { value: "6", label: "Species supported" },
  { value: "9", label: "Care actions" },
  { value: "24 / 7", label: "Recall monitoring" },
];

const bentoSmalls = [
  {
    title: "Vet Records",
    icon: ClipboardIcon,
    body:
      "Visits, prescriptions, vaccination ledger with expiry tracking, and OCR-parsed discharge papers — one tidy clinical history per pet.",
  },
  {
    title: "Smart Device Pairing",
    icon: DevicesIcon,
    body:
      "Smart feeders, pet doors, smart litter, aquariums, and cameras all link to specific pets. \"Feed Luna\" triggers the right device.",
  },
  {
    title: "Sitter Handoff",
    icon: WalkIcon,
    body:
      "Time-limited sitter sessions with granular permissions (meds, feeding, both, neither) and GPS-tracked walks. Revokes automatically at session end.",
  },
  {
    title: "Multi-Pet, Multi-Species",
    icon: PawGlyph,
    body:
      "Dogs, cats, birds, reptiles, fish, and small mammals — each with full profiles, primary caregivers, and per-pet permissions.",
  },
];

const voiceTurns = [
  {
    user: "Did Max get his pill?",
    assistant:
      "Yes — Apoquel administered at 7:42 AM by Sarah. Next dose at 7:00 PM.",
  },
  {
    user: "The cat threw up.",
    assistant:
      "Logging for Luna. Severity 1–5? When was her last meal? Anything unusual eaten today?",
  },
  {
    user: "Order more kibble.",
    assistant:
      "Adding Royal Canin Medium Adult to the shopping list — you're 4 days from running out.",
  },
  {
    user: "Schedule Max's vet visit.",
    assistant:
      "Bellaire Vet has Mar 21 at 10:00 AM open. Want me to book it for the annual?",
  },
];

const speciesPictograms = [
  { label: "Dog", glyph: "𓃡" },
  { label: "Cat", glyph: "𓃠" },
  { label: "Bird", glyph: "𓅂" },
  { label: "Reptile", glyph: "𓆗" },
  { label: "Fish", glyph: "𓆟" },
  { label: "Small mammal", glyph: "🐇" },
];

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function CleverPetsContent() {
  const heroRef = useFadeIn<HTMLDivElement>({ y: 24, duration: 1.0 });
  const profileRef = useFadeIn<HTMLDivElement>({ y: 30, delay: 0.15 });
  const manifestoRef = useFadeIn<HTMLDivElement>({ y: 16 });
  const bentoRef = useStaggerReveal<HTMLDivElement>(".bento-card", {
    stagger: 0.08,
    y: 24,
  });
  const voiceRef = useStaggerReveal<HTMLDivElement>(".voice-turn", {
    stagger: 0.08,
    y: 16,
  });
  const codaRef = useFadeIn<HTMLDivElement>({ y: 20 });

  return (
    <>
      {/* ──────────── § COVER — THE DOSSIER ──────────── */}
      <section className="relative isolate overflow-hidden bg-warm-gray px-6 pb-28 pt-32 md:pt-44">
        {/* Atmospheric gold radial behind the title */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 25% 35%, rgba(212,168,67,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Giant marginalia paw — bleeds off the right edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-8 select-none text-accent/5 md:-right-10"
        >
          <PawGlyph className="h-[480px] w-[480px]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-x-16 gap-y-12 md:grid-cols-12">
          {/* Left — copy */}
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
              For Pet Households &middot; Article I
            </p>
            <h1 className="mt-5 font-[var(--font-outfit)] text-[3.5rem] font-bold leading-[0.95] tracking-tight text-white md:text-[5.5rem]">
              Clever<span className="font-serif italic font-light text-accent-light">Pets</span>
            </h1>
            <p className="mt-7 max-w-xl font-serif text-xl italic leading-snug text-white/65 md:text-2xl">
              A living dossier for every member of the household —
              meds, meals, vets, and worry, all kept by the same
              assistant that runs the rest of your home.
            </p>

            {/* Inline mini-stats */}
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
                href="#capabilities"
                className="text-sm font-medium uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white"
              >
                Read the dossier ↓
              </a>
            </div>
          </div>

          {/* Right — profile card */}
          <div
            ref={profileRef}
            className="relative flex justify-center md:col-span-5 md:justify-end"
          >
            <div className="relative">
              <ProfileCard tone="light" />
              {/* Subtle accent ring behind the card */}
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

        {/* Foil rule */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px"
          style={DOSSIER_RULE_STYLE}
        />
      </section>

      {/* ──────────── § MANIFESTO ──────────── */}
      <section className="relative isolate overflow-hidden bg-section-alt px-6 py-28 md:py-36">
        <div ref={manifestoRef} className="relative mx-auto max-w-4xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent-text">
            Article II &middot; The Promise
          </p>
          <h2 className="mt-6 font-[var(--font-outfit)] text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Six species.{" "}
            <span className="font-serif italic font-light text-accent-text">
              One assistant.
            </span>{" "}
            Everything they need.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-lg italic leading-relaxed text-muted md:text-xl">
            Pet care isn&apos;t a separate app — it&apos;s a domain of the same
            household orchestrator. The voice that turns off the lights also
            knows when Max&apos;s heartworm pill is due, when Luna&apos;s last
            vet visit was, and whether the kibble in the pantry was just
            recalled.
          </p>

          {/* Species pictograms row */}
          <div className="mt-14 flex flex-wrap items-end justify-center gap-x-10 gap-y-4">
            {speciesPictograms.map((s) => (
              <div key={s.label} className="text-center">
                <span
                  className="block text-3xl text-accent-text md:text-4xl"
                  aria-hidden
                >
                  {s.glyph}
                </span>
                <span className="mt-2 block font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted/70">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── § CAPABILITIES BENTO ──────────── */}
      <section
        id="capabilities"
        className="relative isolate overflow-hidden bg-warm-gray px-6 py-28 md:py-36"
      >
        {/* Section opener */}
        <div className="mx-auto mb-16 max-w-6xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent">
            Article III &middot; Capabilities
          </p>
          <h2 className="mt-5 max-w-3xl font-[var(--font-outfit)] text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">
            What it{" "}
            <span className="font-serif italic font-light text-accent-light">
              actually does
            </span>{" "}
            for the household.
          </h2>
        </div>

        <div
          ref={bentoRef}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-[auto_auto_auto]"
        >
          {/* HERO CARD A — Medication with schedule */}
          <article className="bento-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#23211e] p-7 transition-colors duration-300 hover:border-accent/40 md:col-span-2 md:row-span-2">
            <div className="flex items-center gap-2 text-accent-light">
              <PillIcon className="h-5 w-5" />
              <span className="font-[var(--font-outfit)] text-[0.6rem] font-semibold uppercase tracking-[0.32em]">
                Medication
              </span>
            </div>
            <h3 className="mt-4 font-[var(--font-outfit)] text-2xl font-semibold leading-tight text-white md:text-3xl">
              Every dose, accounted for.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Eight administration routes, every standard frequency, refills
              tracked, prescribing vet on file. Doses are logged the moment
              they&apos;re given — by anyone in the household.
            </p>

            {/* Schedule mockup */}
            <div className="mt-7 rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="mb-3 flex items-baseline justify-between">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-light">
                  Today &middot; Mar 14
                </p>
                <p className="font-mono text-[0.6rem] tracking-wide text-white/40">
                  2/3 administered
                </p>
              </div>
              <ul className="space-y-2.5">
                {[
                  { time: "07:00", drug: "Apoquel 16 mg", who: "Sarah", state: "done" },
                  { time: "12:00", drug: "Cosequin DS", who: "Jake", state: "done" },
                  { time: "19:00", drug: "Apoquel + Cosequin", who: "—", state: "pending" },
                ].map((d) => (
                  <li
                    key={d.time}
                    className="flex items-center justify-between gap-3 border-l-2 pl-3 text-sm"
                    style={{
                      borderColor:
                        d.state === "done"
                          ? "rgba(110,200,140,0.6)"
                          : "rgba(212,168,67,0.55)",
                    }}
                  >
                    <span className="font-mono text-xs text-white/45">{d.time}</span>
                    <span className="flex-1 text-white/85">{d.drug}</span>
                    <span
                      className={`font-mono text-[0.62rem] tracking-wider ${
                        d.state === "done" ? "text-emerald-300/85" : "text-accent-light"
                      }`}
                    >
                      {d.state === "done" ? `✓ ${d.who}` : "○ Pending"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* HERO CARD B — Triage with conversation */}
          <article className="bento-card group relative overflow-hidden rounded-2xl border border-white/10 bg-[#23211e] p-7 transition-colors duration-300 hover:border-accent/40 md:col-span-2">
            <div className="flex items-center gap-2 text-accent-light">
              <StethoscopeIcon className="h-5 w-5" />
              <span className="font-[var(--font-outfit)] text-[0.6rem] font-semibold uppercase tracking-[0.32em]">
                AI Symptom Triage
              </span>
            </div>
            <h3 className="mt-4 font-[var(--font-outfit)] text-2xl font-semibold leading-tight text-white">
              Severity. Within seconds.
            </h3>

            {/* Conversation mockup */}
            <div className="mt-5 space-y-3 font-serif italic">
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-accent/20 px-4 py-2.5 text-sm text-white/85">
                &ldquo;The cat threw up.&rdquo;
              </div>
              <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white/[0.06] px-4 py-2.5 text-sm text-white/75">
                Severity 1–5? When was Luna&apos;s last meal? Anything unusual
                eaten today?
              </div>
            </div>

            {/* Triage badges */}
            <div className="mt-5 flex flex-wrap gap-2 not-italic">
              <span className="rounded-full border border-red-400/40 bg-red-400/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-red-300">
                Emergency
              </span>
              <span className="rounded-full border border-accent-light/40 bg-accent/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-accent-light">
                Call Vet
              </span>
              <span className="rounded-full border border-emerald-300/40 bg-emerald-400/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-emerald-300">
                Monitor
              </span>
            </div>
          </article>

          {/* SMALL CARD — Recalls */}
          <article className="bento-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#23211e] p-6 transition-colors duration-300 hover:border-accent/40">
            <div className="flex items-center gap-2 text-accent-light">
              <AlertTriangleIcon className="h-5 w-5" />
              <span className="font-[var(--font-outfit)] text-[0.58rem] font-semibold uppercase tracking-[0.3em]">
                Recalls
              </span>
            </div>
            <h3 className="mt-3 font-[var(--font-outfit)] text-lg font-semibold leading-snug text-white">
              Real-time food safety.
            </h3>

            <div className="mt-4 rounded-lg border-l-2 border-red-400/70 bg-red-400/10 px-3 py-2.5">
              <p className="font-mono text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-red-300">
                Severe &middot; Mar 11
              </p>
              <p className="mt-1 text-xs leading-snug text-white/80">
                Royal Canin Medium Adult, Lot RC8392 — matched to your pantry.
              </p>
            </div>
          </article>

          {/* SMALL CARD — Devices */}
          <article className="bento-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#23211e] p-6 transition-colors duration-300 hover:border-accent/40">
            <div className="flex items-center gap-2 text-accent-light">
              <DevicesIcon className="h-5 w-5" />
              <span className="font-[var(--font-outfit)] text-[0.58rem] font-semibold uppercase tracking-[0.3em]">
                Devices
              </span>
            </div>
            <h3 className="mt-3 font-[var(--font-outfit)] text-lg font-semibold leading-snug text-white">
              Hardware that listens.
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-white/55">
              Smart feeders, pet doors, smart litter, aquariums, cameras —
              each linked to a specific pet.
            </p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {["Feeder", "Door", "Litter", "Cam", "Tank"].map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-white/55"
                >
                  {d}
                </span>
              ))}
            </div>
          </article>

          {/* WIDE CARD — Vet records */}
          <article className="bento-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#23211e] p-7 transition-colors duration-300 hover:border-accent/40 md:col-span-2">
            <div className="flex items-center gap-2 text-accent-light">
              <ClipboardIcon className="h-5 w-5" />
              <span className="font-[var(--font-outfit)] text-[0.6rem] font-semibold uppercase tracking-[0.32em]">
                Vet Records
              </span>
            </div>
            <h3 className="mt-4 font-[var(--font-outfit)] text-xl font-semibold leading-tight text-white md:text-2xl">
              A clinical history, kept in order.
            </h3>

            {/* Vaccination ledger snippet */}
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {[
                { name: "Rabies", date: "Jul 2027", state: "current" },
                { name: "Distemper", date: "Sep 2026", state: "current" },
                { name: "Bordetella", date: "Apr 2026", state: "due-soon" },
              ].map((v) => (
                <div
                  key={v.name}
                  className="rounded-lg border border-white/10 bg-black/30 px-3 py-2.5"
                >
                  <p className="font-mono text-[0.55rem] uppercase tracking-wider text-white/40">
                    {v.name}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white/90">
                    {v.date}
                  </p>
                  <p
                    className={`mt-0.5 font-mono text-[0.55rem] tracking-wider ${
                      v.state === "current"
                        ? "text-emerald-300/85"
                        : "text-accent-light"
                    }`}
                  >
                    {v.state === "current" ? "✓ Current" : "○ Due soon"}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-white/55">
              OCR-parsed discharge papers, telemedicine providers, and primary
              vet assignment per pet.
            </p>
          </article>

          {/* WIDE CARD — Feeding */}
          <article className="bento-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#23211e] p-7 transition-colors duration-300 hover:border-accent/40 md:col-span-2">
            <div className="flex items-center gap-2 text-accent-light">
              <BowlIcon className="h-5 w-5" />
              <span className="font-[var(--font-outfit)] text-[0.6rem] font-semibold uppercase tracking-[0.32em]">
                Feeding &amp; Nutrition
              </span>
            </div>
            <h3 className="mt-4 font-[var(--font-outfit)] text-xl font-semibold leading-tight text-white md:text-2xl">
              Meals tracked. Pantry watched.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Manual feeding logs and smart-feeder integration in one ledger.
              Per-meal kcal tracking, AAFCO-grade food database, allergen
              tags, and barcode or photo capture of new food bags.
            </p>

            {/* Mini stat row */}
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
              {[
                { v: "318", u: "kcal", l: "Today" },
                { v: "Royal Canin", u: "", l: "Preferred" },
                { v: "4 days", u: "", l: "Until reorder" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="font-[var(--font-outfit)] text-base font-semibold text-white">
                    {s.v}
                    {s.u && <span className="ml-1 text-xs text-white/45">{s.u}</span>}
                  </p>
                  <p className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-white/40">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Remaining smalls — Sitter, Multi-species */}
          {bentoSmalls.slice(2).map((f) => {
            const Icon = f.icon;
            return (
              <article
                key={f.title}
                className="bento-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#23211e] p-6 transition-colors duration-300 hover:border-accent/40 md:col-span-2"
              >
                <div className="flex items-center gap-2 text-accent-light">
                  <Icon className="h-5 w-5" />
                  <span className="font-[var(--font-outfit)] text-[0.58rem] font-semibold uppercase tracking-[0.3em]">
                    {f.title}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  {f.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ──────────── § VOICE SHOWCASE ──────────── */}
      <section className="relative isolate overflow-hidden bg-section-alt px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent-text">
              Article IV &middot; In Conversation
            </p>
            <h2 className="mt-6 font-[var(--font-outfit)] text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl">
              The way it{" "}
              <span className="font-serif italic font-light text-accent-text">
                feels
              </span>{" "}
              to use.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl font-serif text-base italic leading-relaxed text-muted md:text-lg">
              Pet care lives inside the same orchestrator that answers
              everything else. No app to open. No menu to find.
            </p>
          </div>

          <div
            ref={voiceRef}
            className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2"
          >
            {voiceTurns.map((t, i) => (
              <div
                key={i}
                className="voice-turn relative flex flex-col gap-3 border-l-2 border-accent/50 pl-6"
              >
                <span className="absolute -left-3.5 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 bg-section-alt text-accent">
                  <MicIcon className="h-3.5 w-3.5" />
                </span>
                <div className="rounded-2xl rounded-tl-md border border-card-border bg-card px-5 py-3 shadow-[var(--shadow-card)]">
                  <p className="font-serif text-base italic leading-snug text-foreground md:text-lg">
                    &ldquo;{t.user}&rdquo;
                  </p>
                </div>
                <div className="ml-6 rounded-2xl rounded-tl-md bg-accent/10 px-5 py-3">
                  <p className="text-sm leading-snug text-foreground/85">
                    {t.assistant}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── § CODA ──────────── */}
      <section className="relative isolate overflow-hidden bg-warm-gray px-6 py-32 text-center md:py-40">
        {/* Foil rule */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={DOSSIER_RULE_STYLE}
        />
        {/* Atmospheric glow */}
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
            Add the pets{" "}
            <span className="font-serif italic font-light text-accent-light">
              to the household.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl font-serif text-lg italic leading-relaxed text-white/60 md:text-xl">
            We&apos;ll design a CleverPets setup around your family —
            however many paws, fins, feathers, or scales are involved.
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

          {/* Species punctuation */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-3xl text-white/30 md:text-4xl">
            {speciesPictograms.map((s) => (
              <span key={s.label} aria-label={s.label}>
                {s.glyph}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
