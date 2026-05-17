"use client";

import Link from "next/link";
import { useFadeIn, useStaggerReveal } from "@/hooks/useGSAP";

/* ─────────────────────────── ICONS ─────────────────────────── */

function KeyIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h10M19 12v3M16 12v3" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" strokeLinecap="round" />
      <line x1="16" y1="3" x2="16" y2="7" strokeLinecap="round" />
    </svg>
  );
}

function DoorIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="6" y="3" width="12" height="18" rx="1" />
      <circle cx="14.5" cy="12" r="0.6" fill="currentColor" />
      <line x1="3" y1="21" x2="21" y2="21" strokeLinecap="round" />
    </svg>
  );
}

function HouseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M3 11l9-8 9 8v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" strokeLinejoin="round" />
      <line x1="9" y1="22" x2="9" y2="14" />
      <line x1="15" y1="22" x2="15" y2="14" />
    </svg>
  );
}

function SparkleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" strokeLinecap="round" />
    </svg>
  );
}

function WifiIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M2 9a16 16 0 0120 0M5 13a11 11 0 0114 0M8.5 17a6 6 0 017 0" strokeLinecap="round" />
      <circle cx="12" cy="20" r="0.7" fill="currentColor" />
    </svg>
  );
}

function AirIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M3 8h11a3 3 0 100-6M3 12h17a3 3 0 110 6M3 16h7a2 2 0 110 4" strokeLinecap="round" />
    </svg>
  );
}

function MapIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" strokeLinejoin="round" />
      <line x1="9" y1="4" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="20" />
    </svg>
  );
}

/* ─────────────────────────── SHARED ─────────────────────────── */

const FOIL_RULE: React.CSSProperties = {
  background:
    "linear-gradient(90deg, transparent 0%, rgba(212,168,67,0.55) 20%, rgba(244,210,122,0.85) 50%, rgba(212,168,67,0.55) 80%, transparent 100%)",
};

/* Reservation №2841 — the through-line booking for this page. */
function ReservationCard() {
  return (
    <div className="relative w-full max-w-[400px] rounded-2xl border border-card-border bg-card p-6 shadow-[0_30px_60px_-25px_rgba(120,90,30,0.45),0_4px_12px_rgba(120,90,30,0.08)]">
      <div className="absolute right-5 top-5 flex items-center gap-2">
        <KeyIcon className="h-3.5 w-3.5 text-accent/70" />
        <span className="font-[var(--font-outfit)] text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-accent">
          Reservation № 2841
        </span>
      </div>

      <p className="mt-1 font-[var(--font-outfit)] text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-accent-text">
        Sarah &amp; family
      </p>
      <h3 className="mt-1 font-[var(--font-outfit)] text-3xl font-bold leading-none tracking-tight text-foreground md:text-[2.4rem]">
        Mar 14 — 17
      </h3>
      <p className="mt-2 font-serif text-base italic leading-snug text-muted">
        3 nights &middot; 2 adults &middot; 2 kids
      </p>
      <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted/60">
        4421 Magnolia &middot; The Heights
      </p>

      {/* Stage row */}
      <div className="mt-6 grid grid-cols-4 gap-1.5">
        {[
          { tag: "Booked", state: "done" },
          { tag: "Arrival", state: "done" },
          { tag: "Stay", state: "active" },
          { tag: "Depart", state: "queued" },
        ].map((s) => (
          <div
            key={s.tag}
            className={`rounded-md border px-2 py-1.5 text-center ${
              s.state === "done"
                ? "border-emerald-600/30 bg-emerald-600/8"
                : s.state === "active"
                ? "border-accent/45 bg-accent/12"
                : "border-card-border bg-section-alt/60"
            }`}
          >
            <span
              className={`font-mono text-[0.55rem] uppercase tracking-wider ${
                s.state === "done"
                  ? "text-emerald-700"
                  : s.state === "active"
                  ? "text-accent-text"
                  : "text-muted/70"
              }`}
            >
              {s.tag}
            </span>
          </div>
        ))}
      </div>

      {/* Live details */}
      <div className="mt-5 border-t border-card-border pt-4">
        <p className="font-[var(--font-outfit)] text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-accent-text">
          In progress
        </p>
        <ul className="mt-2.5 space-y-2">
          {[
            { label: "Smart code", value: "8 4 2 9 ●●", icon: KeyIcon },
            { label: "WiFi handoff", value: "guest-2841-temp", icon: WifiIcon },
            { label: "Climate", value: "Family preset · 71°F", icon: HouseIcon },
          ].map((r) => {
            const Icon = r.icon;
            return (
              <li key={r.label} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm text-foreground">
                  <Icon className="h-3.5 w-3.5 text-accent-text" />
                  {r.label}
                </span>
                <span className="font-mono text-[0.65rem] tracking-wide text-muted">
                  {r.value}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Property health */}
      <div className="mt-5 grid grid-cols-4 gap-2 border-t border-card-border pt-4">
        {[
          { label: "Air", state: "ok" },
          { label: "HVAC", state: "ok" },
          { label: "Locks", state: "ok" },
          { label: "Power", state: "ok" },
        ].map((h) => (
          <div key={h.label} className="text-center">
            <p className="font-mono text-[0.55rem] uppercase tracking-wider text-muted">
              {h.label}
            </p>
            <p className="mt-0.5 font-[var(--font-outfit)] text-sm font-semibold text-emerald-700">
              ✓
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── PAGE DATA ─────────────────────────── */

const heroStats = [
  { value: "6", label: "Cleanup categories" },
  { value: "< 5 min", label: "Turnover handoff" },
  { value: "30%", label: "Energy savings" },
];

const properties = [
  {
    name: "Magnolia · Heights",
    bedrooms: "3 BR",
    state: "Booked",
    stateColor: "active",
    sub: "Sarah · Mar 14–17",
    revenue: "$1,420",
  },
  {
    name: "Bayou · Montrose",
    bedrooms: "2 BR",
    state: "Vacant",
    stateColor: "idle",
    sub: "Next: Mar 19",
    revenue: "$960",
  },
  {
    name: "Live Oak · West U",
    bedrooms: "4 BR",
    state: "Turning over",
    stateColor: "warn",
    sub: "Wipe in progress",
    revenue: "$2,180",
  },
  {
    name: "Bagby · Midtown",
    bedrooms: "1 BR",
    state: "Booked",
    stateColor: "active",
    sub: "Marcus · Mar 13–16",
    revenue: "$640",
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function CleverHostContent() {
  const heroRef = useFadeIn<HTMLDivElement>({ y: 24, duration: 1.0 });
  const cardRef = useFadeIn<HTMLDivElement>({ y: 30, delay: 0.15 });
  const manifestoRef = useFadeIn<HTMLDivElement>({ y: 16 });
  const cycleRef = useStaggerReveal<HTMLElement>(".cycle-chapter", {
    stagger: 0.1,
    y: 28,
  });
  const atlasRef = useFadeIn<HTMLDivElement>({ y: 22 });
  const portfolioRef = useStaggerReveal<HTMLDivElement>(".portfolio-card", {
    stagger: 0.07,
    y: 14,
  });
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
        {/* Marginalia key glyph */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-8 select-none text-accent/[0.05] md:-right-4"
        >
          <KeyIcon className="h-[420px] w-[420px]" />
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
              For Airbnb &amp; STR Hosts &middot; Article I
            </p>
            <h1 className="mt-5 font-[var(--font-outfit)] text-[3.5rem] font-bold leading-[0.95] tracking-tight text-white md:text-[5.5rem]">
              Clever<span className="font-serif italic font-light text-accent-light">Host</span>
            </h1>
            <p className="mt-7 max-w-xl font-serif text-xl italic leading-snug text-white/65 md:text-2xl">
              A property that books itself in, hands off cleanly, and resets
              between every guest — the same intelligence handles the front
              door, the WiFi, the climate, and the goodbye.
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
                href="#cycle"
                className="text-sm font-medium uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white"
              >
                Walk the reservation ↓
              </a>
            </div>
          </div>

          <div
            ref={cardRef}
            className="relative flex justify-center md:col-span-5 md:justify-end"
          >
            <div className="relative">
              <ReservationCard />
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
            Every guest.{" "}
            <span className="font-serif italic font-light text-accent-text">
              A perfect handoff.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-lg italic leading-relaxed text-muted md:text-xl">
            Hosting at scale is choreography — and CleverHost runs it on
            beat. Codes rotate. Profiles wipe. Climate pre-cools. WiFi
            rotates. The property arrives at the next reservation as
            though no one had ever been there.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {[
              { icon: KeyIcon, label: "Codes per stay" },
              { icon: WifiIcon, label: "WiFi rotation" },
              { icon: SparkleIcon, label: "6-cat profile wipe" },
              { icon: AirIcon, label: "Air & climate" },
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

      {/* ──────────── § THE CYCLE ──────────── */}
      <section
        id="cycle"
        ref={cycleRef}
        className="relative isolate overflow-hidden bg-warm-gray px-6 py-28 md:py-36"
      >
        <div className="mx-auto mb-20 max-w-6xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent">
            Article III &middot; The Cycle
          </p>
          <h2 className="mt-5 max-w-3xl font-[var(--font-outfit)] text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">
            One reservation,{" "}
            <span className="font-serif italic font-light text-accent-light">
              start to finish.
            </span>
          </h2>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-24">
          {/* §I CONFIRMED */}
          <article className="cycle-chapter grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-light/85 md:text-[8rem]">
                  §I
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-light">
                    T-minus 48h
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Confirmed
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-white/65">
                The booking platform pings. CleverHost reads the dates,
                guest count, and notes, then queues the property
                forward — codes, climate, welcome message, all on a
                timer.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-light">
                <CalendarIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
                  Reservation ingested &middot; Property scheduled
                </span>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#23211e] p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-light">
                  Pre-arrival checklist
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    { label: "Smart code generated", note: "8 4 2 9 ●● · Sat→Mon", state: "done" },
                    { label: "Climate pre-cool scheduled", note: "Sat 13:00 · Family preset", state: "done" },
                    { label: "WiFi temp credentials minted", note: "guest-2841-temp · expires Mon", state: "done" },
                    { label: "Welcome message queued", note: "WhatsApp · Sat 14:30", state: "queued" },
                  ].map((d) => (
                    <li
                      key={d.label}
                      className={`flex items-start gap-4 border-l-2 pl-4 ${
                        d.state === "done"
                          ? "border-emerald-300/60"
                          : "border-accent-light/55"
                      }`}
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white/90">{d.label}</p>
                        <p className="mt-0.5 font-serif text-xs italic text-white/55">
                          {d.note}
                        </p>
                      </div>
                      <span
                        className={`mt-1 font-mono text-[0.6rem] uppercase tracking-wider ${
                          d.state === "done"
                            ? "text-emerald-300/85"
                            : "text-accent-light"
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

          {/* §II ARRIVAL */}
          <article className="cycle-chapter grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:order-2 md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-light/85 md:text-[8rem]">
                  §II
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-light">
                    Sat 16:00
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Arrival
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-white/65">
                The smart lock greets the family by name. Lights step up.
                Climate finishes the last degree. The TV asks if
                they&apos;d like the welcome video. Zero host
                involvement.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-light">
                <DoorIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
                  Code &middot; WiFi &middot; Welcome
                </span>
              </div>
            </div>

            <div className="md:order-1 md:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#23211e] p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-light">
                  Door event &middot; 16:04
                </p>

                <div className="mt-4 rounded-xl border border-white/10 bg-black/30 px-4 py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/85">
                      Smart lock unlocked: <span className="font-mono">8 4 2 9 ● ●</span>
                    </p>
                    <span className="rounded-full border border-emerald-300/40 bg-emerald-400/10 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-emerald-300">
                      Verified
                    </span>
                  </div>
                  <p className="mt-1 font-serif text-xs italic text-white/55">
                    Recognized: Sarah&apos;s reservation 2841
                  </p>
                </div>

                {/* Welcome conversation */}
                <div className="mt-4 space-y-2.5 font-serif italic">
                  <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-white/[0.06] px-4 py-2.5 text-sm text-white/75">
                    Welcome, Sarah. WiFi&apos;s on the fridge tag — or say
                    &ldquo;Clever, WiFi&rdquo; and I&apos;ll text it to
                    your phone.
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { l: "WiFi", v: "guest-2841-temp" },
                    { l: "Climate", v: "Family · 71°F" },
                    { l: "Codes", v: "Expires Mon 11:00" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                      <p className="font-mono text-[0.55rem] uppercase tracking-wider text-white/40">
                        {s.l}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-white/85">
                        {s.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* §III STAY */}
          <article className="cycle-chapter grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-light/85 md:text-[8rem]">
                  §III
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-light">
                    Sat — Mon
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Stay
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-white/65">
                Voice concierge handles questions guests would have
                texted you. House rules, the closest taco place, the
                pool code. Air-quality sensors quietly watch for
                smoke, vape, or moisture spikes.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-light">
                <HouseIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
                  Concierge &middot; Sensors &middot; Quiet host
                </span>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#23211e] p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]">
                <div className="space-y-2.5 font-serif italic">
                  <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-md bg-accent/20 px-4 py-2.5 text-sm text-white/85">
                    &ldquo;Clever, what&apos;s the WiFi?&rdquo;
                  </div>
                  <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-white/[0.06] px-4 py-2.5 text-sm text-white/75">
                    The network is <span className="font-mono not-italic">guest-2841-temp</span> — password texted to your phone.
                  </div>
                  <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-md bg-accent/20 px-4 py-2.5 text-sm text-white/85">
                    &ldquo;Where&apos;s a good taqueria nearby?&rdquo;
                  </div>
                  <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-white/[0.06] px-4 py-2.5 text-sm text-white/75">
                    Tacos Tierra Caliente — six blocks east on White Oak.
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                  {[
                    { l: "VOC", v: "Normal", c: "ok" },
                    { l: "Humidity", v: "48%", c: "ok" },
                    { l: "Smoke", v: "Clear", c: "ok" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-center">
                      <p className="font-mono text-[0.55rem] uppercase tracking-wider text-white/40">
                        {s.l}
                      </p>
                      <p className="mt-0.5 font-[var(--font-outfit)] text-sm font-semibold text-emerald-300/85">
                        {s.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* §IV DEPARTURE */}
          <article className="cycle-chapter grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:order-2 md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-light/85 md:text-[8rem]">
                  §IV
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-light">
                    Mon 11:00
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Departure &amp; Turnover
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-white/65">
                The smart lock revokes the code. Six categories of guest
                data wipe in sequence — streaming logins, voice
                history, smart-home preferences, routines, pairings,
                WiFi credentials. The property returns to neutral.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-light">
                <SparkleIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
                  Wipe &middot; Rotate &middot; Reset
                </span>
              </div>
            </div>

            <div className="md:order-1 md:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#23211e] p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]">
                <div className="mb-4 flex items-baseline justify-between">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-light">
                    Six-category wipe &middot; In sequence
                  </p>
                  <p className="font-mono text-[0.6rem] tracking-wide text-white/40">
                    4 / 6 complete
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {[
                    { label: "WiFi credentials rotated", state: "done" },
                    { label: "Streaming logins cleared", state: "done" },
                    { label: "Voice history purged", state: "done" },
                    { label: "Smart-home preferences reset", state: "done" },
                    { label: "Saved routines deleted", state: "active" },
                    { label: "Device pairings revoked", state: "queued" },
                  ].map((d) => (
                    <li
                      key={d.label}
                      className={`flex items-center gap-4 border-l-2 pl-3 ${
                        d.state === "done"
                          ? "border-emerald-300/60"
                          : d.state === "active"
                          ? "border-accent-light/85"
                          : "border-white/15"
                      }`}
                    >
                      <span
                        className={`flex-1 text-sm ${
                          d.state === "queued" ? "text-white/50" : "text-white/90"
                        }`}
                      >
                        {d.label}
                      </span>
                      <span
                        className={`font-mono text-[0.6rem] uppercase tracking-wider ${
                          d.state === "done"
                            ? "text-emerald-300/85"
                            : d.state === "active"
                            ? "text-accent-light"
                            : "text-white/35"
                        }`}
                      >
                        {d.state === "done" ? "✓" : d.state === "active" ? "↺" : "○"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ──────────── § ATLAS ──────────── */}
      <section className="relative isolate overflow-hidden bg-section-alt px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div ref={atlasRef} className="grid grid-cols-1 items-start gap-x-16 gap-y-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent-text">
                Article IV &middot; The Atlas
              </p>
              <h2 className="mt-5 font-[var(--font-outfit)] text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl">
                Many properties,{" "}
                <span className="font-serif italic font-light text-accent-text">
                  one view.
                </span>
              </h2>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-muted">
                Every door, every reservation, every alert — across the
                whole portfolio. Filter by city, by neighborhood, by
                turnover state. The host who runs ten properties
                handles them like one.
              </p>
              <div className="mt-8 flex items-center gap-2 text-accent-text">
                <MapIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">
                  Portfolio dashboard
                </span>
              </div>
            </div>

            <div ref={portfolioRef} className="md:col-span-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {properties.map((p) => (
                  <article
                    key={p.name}
                    className="portfolio-card relative rounded-2xl border border-card-border bg-card p-5 shadow-[var(--shadow-card)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted">
                          {p.bedrooms}
                        </p>
                        <h3 className="mt-1 font-[var(--font-outfit)] text-base font-semibold text-foreground">
                          {p.name}
                        </h3>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-wider ${
                          p.stateColor === "active"
                            ? "bg-emerald-600/10 text-emerald-700"
                            : p.stateColor === "warn"
                            ? "bg-accent/15 text-accent-text"
                            : "bg-muted/15 text-muted"
                        }`}
                      >
                        {p.state}
                      </span>
                    </div>
                    <p className="mt-3 font-serif text-xs italic text-muted">
                      {p.sub}
                    </p>
                    <div className="mt-3 flex items-baseline justify-between border-t border-card-border pt-3">
                      <span className="font-mono text-[0.55rem] uppercase tracking-wider text-muted">
                        Month-to-date
                      </span>
                      <span className="font-[var(--font-outfit)] text-base font-semibold text-foreground">
                        {p.revenue}
                      </span>
                    </div>
                  </article>
                ))}
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
            Hand the keys{" "}
            <span className="font-serif italic font-light text-accent-light">
              over to it.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl font-serif text-lg italic leading-relaxed text-white/60 md:text-xl">
            We&apos;ll design a CleverHost rollout for one property or
            fifty — the same handoff, repeated cleanly, every time.
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
            {[CalendarIcon, DoorIcon, HouseIcon, SparkleIcon].map((Icon, i) => (
              <Icon key={i} className="h-7 w-7" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
