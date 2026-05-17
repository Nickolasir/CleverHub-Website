"use client";

import Link from "next/link";
import { useFadeIn, useStaggerReveal } from "@/hooks/useGSAP";

/* ─────────────────────────── ICONS ─────────────────────────── */

function SunriseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <circle cx="12" cy="14" r="4" />
      <line x1="12" y1="3" x2="12" y2="6" strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
      <line x1="5.6" y1="11.6" x2="7" y2="13" strokeLinecap="round" />
      <line x1="18.4" y1="11.6" x2="17" y2="13" strokeLinecap="round" />
    </svg>
  );
}

function SunIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4.2" />
      <line x1="12" y1="3" x2="12" y2="5.5" strokeLinecap="round" />
      <line x1="12" y1="18.5" x2="12" y2="21" strokeLinecap="round" />
      <line x1="3" y1="12" x2="5.5" y2="12" strokeLinecap="round" />
      <line x1="18.5" y1="12" x2="21" y2="12" strokeLinecap="round" />
      <line x1="5.6" y1="5.6" x2="7.4" y2="7.4" strokeLinecap="round" />
      <line x1="16.6" y1="16.6" x2="18.4" y2="18.4" strokeLinecap="round" />
      <line x1="5.6" y1="18.4" x2="7.4" y2="16.6" strokeLinecap="round" />
      <line x1="16.6" y1="7.4" x2="18.4" y2="5.6" strokeLinecap="round" />
    </svg>
  );
}

function SunsetIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M5 16a7 7 0 0114 0" />
      <line x1="3" y1="20" x2="21" y2="20" strokeLinecap="round" />
      <line x1="12" y1="3" x2="12" y2="6" strokeLinecap="round" />
      <line x1="5" y1="9" x2="6.5" y2="10.5" strokeLinecap="round" />
      <line x1="19" y1="9" x2="17.5" y2="10.5" strokeLinecap="round" />
      <path d="M9 20l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MoonIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M20 14.5A8.5 8.5 0 119.5 4a7 7 0 0010.5 10.5z" strokeLinejoin="round" />
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

function HeartPulseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M12 20s-7-4.5-7-10a4.5 4.5 0 018-2.8A4.5 4.5 0 0119 10c0 5.5-7 10-7 10z" strokeLinejoin="round" />
      <path d="M7 12h2l1.5-2 2 4 1.5-2H17" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HandsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path
        d="M7 13.5V8a1.5 1.5 0 113 0v4M10 12V6.5a1.5 1.5 0 113 0V11M13 11V7a1.5 1.5 0 113 0v5M16 11v-2a1.5 1.5 0 013 0v6.5c0 3-2.5 5.5-5.5 5.5h-2A5.5 5.5 0 016 16v-3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M12 3l10 18H2L12 3z" strokeLinejoin="round" />
      <line x1="12" y1="10" x2="12" y2="14" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12" y2="17.5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="6" y="3" width="12" height="18" rx="2.5" />
      <line x1="11" y1="18" x2="13" y2="18" strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────────────────── SHARED ─────────────────────────── */

const FOIL_RULE: React.CSSProperties = {
  background:
    "linear-gradient(90deg, transparent 0%, rgba(212,168,67,0.55) 20%, rgba(244,210,122,0.85) 50%, rgba(212,168,67,0.55) 80%, transparent 100%)",
};

/* Brief №01 for Eleanor — supports a dark tone for the now-light hero. */
function BriefCard({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div
      className={`relative w-full max-w-[380px] rounded-2xl p-6 shadow-[0_30px_60px_-25px_rgba(120,90,30,0.45),0_4px_12px_rgba(120,90,30,0.08)] ${
        dark ? "border border-white/10 bg-[#23211e] backdrop-blur-sm" : "border border-card-border bg-card"
      }`}
    >
      <div className="absolute right-5 top-5 flex items-center gap-2">
        <HandsIcon className={`h-3.5 w-3.5 ${dark ? "text-accent-light" : "text-accent/70"}`} />
        <span className={`font-[var(--font-outfit)] text-[0.55rem] font-semibold uppercase tracking-[0.32em] ${dark ? "text-accent-light" : "text-accent"}`}>
          Brief № 01
        </span>
      </div>

      <div className="mt-1">
        <h3 className={`font-[var(--font-outfit)] text-[2.5rem] font-bold leading-none tracking-tight ${dark ? "text-white" : "text-foreground"}`}>
          Eleanor M.
        </h3>
        <p className={`mt-2 font-serif text-base italic leading-snug ${dark ? "text-white/70" : "text-muted"}`}>
          Age 78 &middot; Bellaire &middot; Independent
        </p>
        <p className={`mt-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] ${dark ? "text-white/35" : "text-muted/60"}`}>
          Care ID 074 &middot; 2A
        </p>
      </div>

      <div className={`mt-6 border-t pt-4 ${dark ? "border-white/10" : "border-card-border"}`}>
        <p className={`font-[var(--font-outfit)] text-[0.58rem] font-semibold uppercase tracking-[0.3em] ${dark ? "text-accent-light" : "text-accent-text"}`}>
          Conditions
        </p>
        <ul className="mt-2.5 flex flex-col gap-1.5">
          {["Type 2 Diabetes", "Mild Hypertension", "Osteoarthritis (knees)"].map((c) => (
            <li key={c} className={`flex items-baseline gap-2 text-sm ${dark ? "text-white/90" : "text-foreground"}`}>
              <span className={dark ? "text-accent-light" : "text-accent"}>·</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`mt-5 grid grid-cols-3 gap-2 border-t pt-4 ${dark ? "border-white/10" : "border-card-border"}`}>
        {[
          { v: "3", l: "Meds" },
          { v: "3", l: "Check-ins" },
          { v: "1", l: "Family" },
        ].map((s) => (
          <div key={s.l} className="text-center">
            <p className={`font-[var(--font-outfit)] text-2xl font-semibold ${dark ? "text-white" : "text-foreground"}`}>
              {s.v}
            </p>
            <p className={`mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.22em] ${dark ? "text-white/45" : "text-muted/70"}`}>
              {s.l}
            </p>
          </div>
        ))}
      </div>

      <div className={`mt-5 grid grid-cols-2 gap-4 border-t pt-4 ${dark ? "border-white/10" : "border-card-border"}`}>
        <div>
          <p className={`text-[0.58rem] font-semibold uppercase tracking-[0.22em] ${dark ? "text-white/40" : "text-muted"}`}>
            Last fall
          </p>
          <p className={`mt-0.5 font-[var(--font-outfit)] text-base font-semibold ${dark ? "text-white" : "text-foreground"}`}>
            14 days ago
          </p>
          <p className={`text-[0.62rem] ${dark ? "text-emerald-300/85" : "text-emerald-700/80"}`}>None today</p>
        </div>
        <div>
          <p className={`text-[0.58rem] font-semibold uppercase tracking-[0.22em] ${dark ? "text-white/40" : "text-muted"}`}>
            Wellbeing
          </p>
          <p className={`mt-0.5 font-[var(--font-outfit)] text-base font-semibold ${dark ? "text-white" : "text-foreground"}`}>
            4 / 5
          </p>
          <p className={`text-[0.62rem] ${dark ? "text-white/50" : "text-muted"}`}>Sarah · Sat visit</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── DATA ─────────────────────────── */

const heroStats = [
  { value: "2,000+", label: "Daily reassurances" },
  { value: "< 1s", label: "Emergency response" },
  { value: "3", label: "Wellness check-ins" },
];

const caregiverEvents = [
  { time: "07:42", severity: "info", title: "Morning meds administered", body: "Metformin & Lisinopril taken on schedule. Mood 4/5." },
  { time: "10:15", severity: "info", title: "Mild knee stiffness reported", body: "Eleanor mentioned soreness; suggested PRN Tylenol Arthritis." },
  { time: "12:34", severity: "watch", title: "Hydration prompt missed", body: "Eleanor declined second water reminder. Will retry at 13:30." },
  { time: "20:00", severity: "info", title: "Daily digest sent", body: "Three check-ins logged. Sleep prep started at 21:30." },
];

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function CleverAideContent() {
  const heroRef = useFadeIn<HTMLDivElement>({ y: 24, duration: 1.0 });
  const briefRef = useFadeIn<HTMLDivElement>({ y: 30, delay: 0.15 });
  const manifestoRef = useFadeIn<HTMLDivElement>({ y: 16 });
  const dayRef = useStaggerReveal<HTMLElement>(".day-chapter", { stagger: 0.1, y: 30 });
  const caregiverRef = useFadeIn<HTMLDivElement>({ y: 22 });
  const eventsRef = useStaggerReveal<HTMLUListElement>(".caregiver-event", { stagger: 0.06, y: 12 });
  const codaRef = useFadeIn<HTMLDivElement>({ y: 20 });

  return (
    <>
      {/* ──────────── § COVER (LIGHT) ──────────── */}
      <section className="relative isolate overflow-hidden bg-section-alt px-6 pb-28 pt-32 md:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 30% 35%, rgba(212,168,67,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Marginalia: day band text bleeding behind the hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap"
          style={{
            transform: "translateY(-50%) rotate(-90deg) translateX(40%)",
            transformOrigin: "right center",
          }}
        >
          <span className="font-[var(--font-outfit)] text-[6rem] font-black uppercase leading-none tracking-[0.4em] text-accent/[0.07] md:text-[9rem]">
            Morning · Midday · Evening · Night
          </span>
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-x-16 gap-y-12 md:grid-cols-12">
          <div ref={heroRef} className="md:col-span-7">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-accent-text transition-colors hover:text-accent"
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

            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent-text">
              For Assisted Living &middot; Article I
            </p>
            <h1 className="mt-5 font-[var(--font-outfit)] text-[3.5rem] font-bold leading-[0.95] tracking-tight text-foreground md:text-[5.5rem]">
              Clever<span className="font-serif italic font-light text-accent-text">Aide</span>
            </h1>
            <p className="mt-7 max-w-xl font-serif text-xl italic leading-snug text-muted md:text-2xl">
              Independence, with quiet backup. The same voice that runs the
              home walks alongside your loved one — morning meds, midday
              check-ins, evening routines, night-watch — and writes home
              when something matters.
            </p>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-card-border pt-6">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <dt className="font-[var(--font-outfit)] text-2xl font-semibold text-accent-text md:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-muted">
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
              <a href="#day" className="text-sm font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground">
                Walk through the day ↓
              </a>
            </div>
          </div>

          <div ref={briefRef} className="relative flex justify-center md:col-span-5 md:justify-end">
            <div className="relative">
              <BriefCard tone="dark" />
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,168,67,0.18) 0%, transparent 70%)",
                }}
              />
            </div>
          </div>
        </div>

        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={FOIL_RULE} />
      </section>

      {/* ──────────── § MANIFESTO (DARK) ──────────── */}
      <section className="relative isolate overflow-hidden bg-warm-gray px-6 py-28 md:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,168,67,0.14) 0%, transparent 70%)",
          }}
        />
        <div ref={manifestoRef} className="relative mx-auto max-w-4xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent-light">
            Article II &middot; The Promise
          </p>
          <h2 className="mt-6 font-[var(--font-outfit)] text-4xl font-light leading-[1.05] tracking-tight text-white md:text-6xl">
            Two thousand small{" "}
            <span className="font-serif italic font-light text-accent-light">
              reassurances.
            </span>{" "}
            A day at a time.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-lg italic leading-relaxed text-white/65 md:text-xl">
            The hard part of caring for an aging parent isn&apos;t any
            single moment — it&apos;s the thousand quiet ones in between.
            CleverAide handles the small things on time and writes
            home when the small ones turn large.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {[
              { icon: PillIcon, label: "Meds on time" },
              { icon: HeartPulseIcon, label: "Wellness logged" },
              { icon: AlertIcon, label: "Falls detected" },
              { icon: PhoneIcon, label: "Family informed" },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.label} className="flex flex-col items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-light/40 bg-accent/15 text-accent-light">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/55">
                    {p.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────── § THE DAY (LIGHT) ──────────── */}
      <section
        id="day"
        ref={dayRef}
        className="relative isolate overflow-hidden bg-section-alt px-6 py-28 md:py-36"
      >
        <div className="mx-auto mb-20 max-w-6xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent-text">
            Article III &middot; The Day
          </p>
          <h2 className="mt-5 max-w-3xl font-[var(--font-outfit)] text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            One day,{" "}
            <span className="font-serif italic font-light text-accent-text">
              chapter by chapter.
            </span>
          </h2>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-24">
          {/* §I MORNING */}
          <article className="day-chapter relative grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-text/85 md:text-[8rem]">
                  §I
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-text">
                    07:00 — 11:00
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-foreground md:text-4xl">
                    Morning
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-muted">
                The day starts with a soft &ldquo;Good morning, Eleanor.
                How was the night?&rdquo; — then meds, then a check-in.
                Stiffness, pain, dizziness, mood. Logged. Shared.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-text">
                <SunriseIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">
                  Wake &middot; Meds &middot; Wellness check-in
                </span>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="mb-4 flex items-baseline justify-between">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-text">
                    Today's Morning &middot; Mar 14
                  </p>
                  <p className="font-mono text-[0.6rem] tracking-wide text-muted">
                    3 / 3 completed
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    { time: "07:00", title: "Wake greeting", note: "Good morning, Eleanor." },
                    { time: "07:30", title: "Metformin 500 mg", note: "Administered · Sarah confirmed" },
                    { time: "07:45", title: "Lisinopril 10 mg", note: "Administered · self-confirmed" },
                    { time: "08:30", title: "Mood & body check", note: "4/5 — \"Bit stiff in the knees today\"" },
                  ].map((d) => (
                    <li key={d.time} className="flex items-start gap-4 border-l-2 border-emerald-600/55 pl-4">
                      <span className="mt-0.5 font-mono text-xs text-muted">{d.time}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{d.title}</p>
                        <p className="mt-0.5 font-serif text-xs italic text-muted">{d.note}</p>
                      </div>
                      <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-emerald-700">
                        ✓
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          {/* §II MIDDAY */}
          <article className="day-chapter relative grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:order-2 md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-text/85 md:text-[8rem]">
                  §II
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-text">
                    11:00 — 16:00
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-foreground md:text-4xl">
                    Midday
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-muted">
                Lunch reminder if the kitchen has been quiet. Hydration
                prompts. A check-in with no pressure — voice-first, no
                phone to pick up, no app to open.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-text">
                <SunIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">
                  Hydration &middot; Activity &middot; Lunch
                </span>
              </div>
            </div>

            <div className="md:order-1 md:col-span-7">
              <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-text">
                  Activity &middot; 11:00 — 16:00
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { v: "412", u: "steps", l: "Gentle pace" },
                    { v: "4", u: "rooms", l: "Kitchen → garden" },
                    { v: "2 / 3", u: "", l: "Hydration prompts" },
                  ].map((s, i) => (
                    <div key={i} className="rounded-lg border border-card-border bg-section-alt/70 p-3">
                      <p className="font-[var(--font-outfit)] text-xl font-semibold text-foreground">
                        {s.v}
                        {s.u && <span className="ml-1 text-xs font-normal text-muted">{s.u}</span>}
                      </p>
                      <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-wider text-muted/70">
                        {s.l}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-2.5 font-serif italic">
                  <div className="max-w-[80%] rounded-2xl rounded-tl-md border border-card-border bg-section-alt/70 px-4 py-2.5 text-sm text-muted">
                    Time for a glass of water, Eleanor. Want me to start
                    the kettle for some tea instead?
                  </div>
                  <div className="ml-auto max-w-[60%] rounded-2xl rounded-tr-md bg-accent/20 px-4 py-2.5 text-sm text-foreground">
                    &ldquo;Tea, please. Earl Grey.&rdquo;
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* §III EVENING */}
          <article className="day-chapter relative grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-text/85 md:text-[8rem]">
                  §III
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-text">
                    16:00 — 21:00
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-foreground md:text-4xl">
                    Evening
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-muted">
                Dinner medication. The day&apos;s digest written for the
                family. Lights warm, ambient music low, the room
                ready to wind down. Sundown is softened, not endured.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-text">
                <SunsetIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">
                  Dinner meds &middot; Family digest &middot; Wind-down
                </span>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="mb-4 flex items-baseline justify-between">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-text">
                    Evening &middot; In progress
                  </p>
                  <p className="font-mono text-[0.6rem] tracking-wide text-muted">
                    2 / 4 completed
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    { time: "18:00", title: "Metformin 500 mg", note: "Administered · self-confirmed", state: "done" },
                    { time: "19:30", title: "Family digest sent", note: "Sarah · Marcus · WhatsApp + email", state: "done" },
                    { time: "20:30", title: "Wind-down routine", note: "Lighting → warm, music → soft jazz", state: "pending" },
                    { time: "21:30", title: "Sleep prep", note: "Bathroom check · pillow refresh · door check", state: "pending" },
                  ].map((d) => (
                    <li
                      key={d.time}
                      className={`flex items-start gap-4 border-l-2 pl-4 ${
                        d.state === "done" ? "border-emerald-600/55" : "border-accent/65"
                      }`}
                    >
                      <span className="mt-0.5 font-mono text-xs text-muted">{d.time}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{d.title}</p>
                        <p className="mt-0.5 font-serif text-xs italic text-muted">{d.note}</p>
                      </div>
                      <span
                        className={`mt-1 font-mono text-[0.6rem] uppercase tracking-wider ${
                          d.state === "done" ? "text-emerald-700" : "text-accent-text"
                        }`}
                      >
                        {d.state === "done" ? "✓" : "○"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          {/* §IV NIGHT */}
          <article className="day-chapter relative grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:order-2 md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-text/85 md:text-[8rem]">
                  §IV
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-text">
                    21:00 — 07:00
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-foreground md:text-4xl">
                    Night
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-muted">
                Sleep monitored without cameras. Falls and prolonged
                inactivity escalate gracefully — verbal check-in first,
                then caregiver, then emergency. &ldquo;Help&rdquo; is
                always heard.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-text">
                <MoonIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">
                  Sleep &middot; Fall watch &middot; Emergency
                </span>
              </div>
            </div>

            <div className="md:order-1 md:col-span-7">
              <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="mb-4 flex items-baseline justify-between">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-text">
                    Night Watch &middot; Last 24h
                  </p>
                  <span className="rounded-full border border-emerald-600/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-emerald-700">
                    All clear
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { v: "22:47 → 06:42", l: "Sleep window", sub: "7h 55m" },
                    { v: "2", l: "Bathroom trips", sub: "Within normal" },
                    { v: "Armed", l: "Fall detection", sub: "Graduated response" },
                    { v: "Listening", l: "Emergency phrases", sub: '"Help" · "I fell"' },
                  ].map((s, i) => (
                    <div key={i} className="rounded-lg border border-card-border bg-section-alt/70 px-3 py-3">
                      <p className="font-mono text-[0.55rem] uppercase tracking-wider text-muted">
                        {s.l}
                      </p>
                      <p className="mt-1 font-[var(--font-outfit)] text-base font-semibold text-foreground">
                        {s.v}
                      </p>
                      <p className="mt-0.5 font-serif text-[0.65rem] italic text-muted">
                        {s.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ──────────── § CAREGIVER BRIEF (DARK) ──────────── */}
      <section className="relative isolate overflow-hidden bg-warm-gray px-6 py-28 md:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 40%, rgba(212,168,67,0.14) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div ref={caregiverRef} className="grid grid-cols-1 items-start gap-x-16 gap-y-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent-light">
                Article IV &middot; The Family View
              </p>
              <h2 className="mt-5 font-[var(--font-outfit)] text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
                What the{" "}
                <span className="font-serif italic font-light text-accent-light">
                  family
                </span>{" "}
                sees.
              </h2>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-white/65">
                A daily digest at 8 p.m. The routine things stay
                routine — only what matters interrupts. Severity-based
                escalation routes alerts through push, Telegram, or
                WhatsApp, to the right person, in the right tone.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { tag: "INFO", body: "Daily digest · 8 pm" },
                  { tag: "WATCH", body: "Two missed prompts in a row" },
                  { tag: "CALL", body: "Unusual symptom · medication change" },
                  { tag: "EMERG", body: "Fall · prolonged inactivity · \"Help\"" },
                ].map((t) => (
                  <div key={t.tag} className="flex items-center gap-3">
                    <span
                      className={`inline-flex w-20 justify-center rounded-full px-3 py-1 font-mono text-[0.55rem] font-semibold uppercase tracking-wider ${
                        t.tag === "INFO"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : t.tag === "WATCH"
                          ? "bg-accent/20 text-accent-light"
                          : t.tag === "CALL"
                          ? "bg-orange-500/20 text-orange-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {t.tag}
                    </span>
                    <span className="text-sm text-white/70">{t.body}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Caregiver dashboard (dark variant) */}
            <div className="md:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#23211e] p-6 backdrop-blur-sm shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)] md:p-8">
                <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="font-[var(--font-outfit)] text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-accent-light">
                      Daily Digest &middot; Mar 14
                    </p>
                    <h3 className="mt-1 font-[var(--font-outfit)] text-xl font-bold text-white md:text-2xl">
                      Eleanor M.
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[0.55rem] uppercase tracking-[0.22em] text-white/40">To</p>
                    <p className="mt-0.5 font-[var(--font-outfit)] text-sm font-semibold text-white">
                      Sarah &middot; Marcus
                    </p>
                  </div>
                </div>

                <ul ref={eventsRef} className="mt-5 flex flex-col gap-3">
                  {caregiverEvents.map((e, i) => (
                    <li
                      key={i}
                      className="caregiver-event flex items-start gap-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3"
                    >
                      <span className="mt-0.5 font-mono text-[0.65rem] tracking-wider text-white/50">
                        {e.time}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 font-mono text-[0.5rem] font-semibold uppercase tracking-wider ${
                              e.severity === "info"
                                ? "bg-emerald-500/15 text-emerald-300"
                                : "bg-accent/20 text-accent-light"
                            }`}
                          >
                            {e.severity}
                          </span>
                          <p className="font-[var(--font-outfit)] text-sm font-semibold text-white/90">
                            {e.title}
                          </p>
                        </div>
                        <p className="mt-1 font-serif text-xs italic leading-relaxed text-white/55">
                          {e.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <p className="font-serif text-xs italic text-white/55">
                    Sent via WhatsApp · email · portal
                  </p>
                  <span className="inline-flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-wider text-accent-light">
                    <PhoneIcon className="h-3 w-3" />
                    7 / 30 days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── § CODA (LIGHT) ──────────── */}
      <section className="relative isolate overflow-hidden bg-section-alt px-6 py-32 text-center md:py-40">
        <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={FOIL_RULE} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 60%, rgba(212,168,67,0.16) 0%, transparent 70%)",
          }}
        />

        <div ref={codaRef} className="relative mx-auto max-w-3xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-accent-text">
            Coda
          </p>
          <h2 className="mt-6 font-[var(--font-outfit)] text-5xl font-light leading-[1.05] tracking-tight text-foreground md:text-7xl">
            Care that{" "}
            <span className="font-serif italic font-light text-accent-text">
              doesn&apos;t sleep.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl font-serif text-lg italic leading-relaxed text-muted md:text-xl">
            We&apos;ll design a CleverAide setup around your loved one&apos;s
            day — their conditions, their routines, their family.
            Independence, with backup.
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

          <div className="mt-16 flex items-center justify-center gap-10 text-accent-text/55">
            {[SunriseIcon, SunIcon, SunsetIcon, MoonIcon].map((Icon, i) => (
              <Icon key={i} className="h-7 w-7" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
