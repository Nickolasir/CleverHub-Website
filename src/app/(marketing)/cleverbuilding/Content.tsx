"use client";

import Link from "next/link";
import { useFadeIn, useStaggerReveal } from "@/hooks/useGSAP";

/* ─────────────────────────── ICONS ─────────────────────────── */

function BuildingIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <line x1="9" y1="6" x2="9" y2="6.01" strokeLinecap="round" />
      <line x1="15" y1="6" x2="15" y2="6.01" strokeLinecap="round" />
      <line x1="9" y1="10" x2="9" y2="10.01" strokeLinecap="round" />
      <line x1="15" y1="10" x2="15" y2="10.01" strokeLinecap="round" />
      <line x1="9" y1="14" x2="9" y2="14.01" strokeLinecap="round" />
      <line x1="15" y1="14" x2="15" y2="14.01" strokeLinecap="round" />
      <path d="M9 22v-4h6v4" />
    </svg>
  );
}

function ShieldIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WrenchIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path
        d="M14 7a4 4 0 015 5l-7 7-4-4 7-7a4 4 0 01-1-1z"
        strokeLinejoin="round"
      />
      <path d="M5 16l-2 2 4 4 2-2" strokeLinejoin="round" />
    </svg>
  );
}

function GroupIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="3.5" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function BoltIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M13 2L4 14h7l-1 8 10-12h-7l1-8z" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}

function DropletIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M12 3s7 8 7 13a7 7 0 11-14 0c0-5 7-13 7-13z" strokeLinejoin="round" />
    </svg>
  );
}

function GridIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

/* ─────────────────────────── SHARED ─────────────────────────── */

const FOIL_RULE: React.CSSProperties = {
  background:
    "linear-gradient(90deg, transparent 0%, rgba(212,168,67,0.55) 20%, rgba(244,210,122,0.85) 50%, rgba(212,168,67,0.55) 80%, transparent 100%)",
};

/* Building Plate — architectural cross-section card.
   The centerpiece artifact: a stylized SVG cross-section of a 6-floor
   building with floor labels and live operational stats. */
function BuildingPlate() {
  return (
    <div className="relative w-full max-w-[420px] rounded-2xl border border-card-border bg-card p-6 shadow-[0_30px_60px_-25px_rgba(120,90,30,0.45),0_4px_12px_rgba(120,90,30,0.08)]">
      <div className="absolute right-5 top-5 flex items-center gap-2">
        <BuildingIcon className="h-3.5 w-3.5 text-accent/70" />
        <span className="font-[var(--font-outfit)] text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-accent">
          Plate № A1
        </span>
      </div>

      <p className="mt-1 font-[var(--font-outfit)] text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-accent-text">
        Cross section &middot; West façade
      </p>
      <h3 className="mt-1 font-[var(--font-outfit)] text-[2rem] font-bold leading-none tracking-tight text-foreground md:text-[2.4rem]">
        Live Oak Commons
      </h3>
      <p className="mt-2 font-serif text-base italic leading-snug text-muted">
        West University &middot; 22 units &middot; 18,400 sf
      </p>

      {/* SVG cross-section */}
      <div className="mt-6 rounded-xl border border-card-border bg-section-alt/50 p-4">
        <svg
          viewBox="0 0 200 260"
          className="h-auto w-full"
          aria-hidden
        >
          {/* Roof */}
          <path
            d="M 10 30 L 100 6 L 190 30"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeLinejoin="round"
          />

          {[
            { y: 30, label: "F5", units: 4, kind: "resi", note: "Residential" },
            { y: 65, label: "F4", units: 4, kind: "resi", note: "Residential" },
            { y: 100, label: "F3", units: 4, kind: "resi", note: "Residential" },
            { y: 135, label: "F2", units: 4, kind: "amen", note: "Amenity + Resi" },
            { y: 170, label: "F1", units: 0, kind: "lobby", note: "Lobby · Mail" },
            { y: 205, label: "B1", units: 0, kind: "garage", note: "Parking" },
          ].map((floor, i) => {
            const isCommon = floor.kind === "amen" || floor.kind === "lobby" || floor.kind === "garage";
            return (
              <g key={i}>
                {/* Floor outline */}
                <rect
                  x="14"
                  y={floor.y}
                  width="172"
                  height="34"
                  fill={isCommon ? "rgba(212,168,67,0.10)" : "transparent"}
                  stroke="var(--foreground)"
                  strokeOpacity="0.45"
                  strokeWidth="0.8"
                />
                {/* Unit divisions (residential floors only) */}
                {floor.units > 0 &&
                  Array.from({ length: floor.units - 1 }).map((_, j) => (
                    <line
                      key={j}
                      x1={14 + ((j + 1) * 172) / floor.units}
                      y1={floor.y}
                      x2={14 + ((j + 1) * 172) / floor.units}
                      y2={floor.y + 34}
                      stroke="var(--foreground)"
                      strokeOpacity="0.25"
                      strokeWidth="0.6"
                    />
                  ))}
                {/* Lobby door */}
                {floor.kind === "lobby" && (
                  <>
                    <rect
                      x="90"
                      y={floor.y + 12}
                      width="20"
                      height="22"
                      fill="rgba(212,168,67,0.18)"
                      stroke="var(--accent)"
                      strokeWidth="0.7"
                    />
                    <circle cx="106" cy={floor.y + 24} r="0.8" fill="var(--accent)" />
                  </>
                )}
                {/* Garage line */}
                {floor.kind === "garage" && (
                  <>
                    <line
                      x1="20"
                      y1={floor.y + 17}
                      x2="180"
                      y2={floor.y + 17}
                      stroke="var(--accent)"
                      strokeOpacity="0.5"
                      strokeWidth="0.8"
                      strokeDasharray="3 3"
                    />
                  </>
                )}

                {/* Floor label */}
                <text
                  x="6"
                  y={floor.y + 22}
                  fontFamily="var(--font-outfit)"
                  fontSize="7"
                  fontWeight="700"
                  fill="var(--accent-text)"
                  letterSpacing="0.05em"
                >
                  {floor.label}
                </text>
                {/* Floor description (right of building) */}
                <text
                  x="195"
                  y={floor.y + 22}
                  fontFamily="var(--font-outfit)"
                  fontSize="6"
                  fill="var(--muted)"
                  letterSpacing="0.02em"
                  textAnchor="start"
                  style={{ opacity: 0.7 }}
                >
                  {floor.note}
                </text>
              </g>
            );
          })}

          {/* Ground line */}
          <line
            x1="0"
            y1="239"
            x2="200"
            y2="239"
            stroke="var(--accent)"
            strokeWidth="0.7"
          />
          {/* Hatch marks below ground */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={i}
              x1={i * 10 + 2}
              y1="239"
              x2={i * 10 + 6}
              y2="247"
              stroke="var(--accent)"
              strokeOpacity="0.4"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Operational metrics */}
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-card-border pt-4">
        {[
          { v: "22 / 22", l: "Units online" },
          { v: "4×", l: "Sensors / unit" },
          { v: "-12%", l: "Energy YoY", positive: true },
        ].map((s) => (
          <div key={s.l} className="text-center">
            <p
              className={`font-[var(--font-outfit)] text-base font-semibold ${
                s.positive ? "text-emerald-700" : "text-foreground"
              }`}
            >
              {s.v}
            </p>
            <p className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/70">
              {s.l}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── PAGE DATA ─────────────────────────── */

const heroStats = [
  { value: "22", label: "Units, one brain" },
  { value: "8×", label: "Sensors per floor" },
  { value: "-12%", label: "Energy YoY" },
];

const portfolioBuildings = [
  {
    name: "Live Oak Commons",
    sub: "West University · 22 units",
    state: "Stable",
    metric: "98% occ",
    energy: "-12%",
  },
  {
    name: "Magnolia Block",
    sub: "Heights · 14 units",
    state: "Stable",
    metric: "100% occ",
    energy: "-8%",
  },
  {
    name: "Bayou Lofts",
    sub: "Montrose · 36 units",
    state: "Maintenance",
    metric: "F3 HVAC alert",
    energy: "-15%",
  },
  {
    name: "Bagby Yards",
    sub: "Midtown · 48 units",
    state: "Onboarding",
    metric: "Phase 2 install",
    energy: "—",
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function CleverBuildingContent() {
  const heroRef = useFadeIn<HTMLDivElement>({ y: 24, duration: 1.0 });
  const plateRef = useFadeIn<HTMLDivElement>({ y: 30, delay: 0.15 });
  const manifestoRef = useFadeIn<HTMLDivElement>({ y: 16 });
  const levelsRef = useStaggerReveal<HTMLElement>(".level-chapter", {
    stagger: 0.1,
    y: 28,
  });
  const portfolioRef = useStaggerReveal<HTMLDivElement>(".building-row", {
    stagger: 0.06,
    y: 12,
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
        {/* Marginalia: stacked floor labels bleeding off the right edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none flex flex-col items-end pr-4 gap-3 opacity-[0.06]"
        >
          {["F5", "F4", "F3", "F2", "F1", "B1"].map((f) => (
            <span
              key={f}
              className="font-[var(--font-outfit)] text-[5rem] font-black uppercase leading-none tracking-tight text-accent md:text-[7rem]"
            >
              {f}
            </span>
          ))}
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
              For Apartment Complexes &middot; Article I
            </p>
            <h1 className="mt-5 font-[var(--font-outfit)] text-[3.5rem] font-bold leading-[0.95] tracking-tight text-white md:text-[5.5rem]">
              Clever<span className="font-serif italic font-light text-accent-light">Building</span>
            </h1>
            <p className="mt-7 max-w-xl font-serif text-xl italic leading-snug text-white/65 md:text-2xl">
              Building-wide intelligence with unit-level privacy. The
              lobby, the hallways, the gym, the garage — all on one
              brain. Every unit, its own sealed smart home.
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
                href="#levels"
                className="text-sm font-medium uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white"
              >
                Walk the floors ↓
              </a>
            </div>
          </div>

          <div
            ref={plateRef}
            className="relative flex justify-center md:col-span-5 md:justify-end"
          >
            <div className="relative">
              <BuildingPlate />
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
            Many doors.{" "}
            <span className="font-serif italic font-light text-accent-text">
              One brain.
            </span>{" "}
            Zero shared data.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-lg italic leading-relaxed text-muted md:text-xl">
            The plant runs the building — energy, access, sensors,
            maintenance — without ever crossing into a tenant&apos;s
            unit. Every apartment is a sealed smart home with its own
            data, its own routines, its own voice.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {[
              { icon: BuildingIcon, label: "Common areas" },
              { icon: LockIcon, label: "Unit isolation" },
              { icon: ShieldIcon, label: "Access control" },
              { icon: WrenchIcon, label: "Maintenance" },
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

      {/* ──────────── § THE LEVELS ──────────── */}
      <section
        id="levels"
        ref={levelsRef}
        className="relative isolate overflow-hidden bg-warm-gray px-6 py-28 md:py-36"
      >
        <div className="mx-auto mb-20 max-w-6xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent">
            Article III &middot; The Levels
          </p>
          <h2 className="mt-5 max-w-3xl font-[var(--font-outfit)] text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">
            From the lobby up,{" "}
            <span className="font-serif italic font-light text-accent-light">
              level by level.
            </span>
          </h2>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-24">
          {/* §I COMMON AREAS */}
          <article className="level-chapter grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-light/85 md:text-[8rem]">
                  §I
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-light">
                    Above grade
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Common Areas
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-white/65">
                Lobby, hallways, gym, pool, package room — all tuned by
                occupancy. Lighting dims when no one&apos;s there.
                Climate tracks the season. Sound dampens at 10 p.m.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-light">
                <BoltIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
                  Lobby &middot; Hallways &middot; Gym &middot; Pool
                </span>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#23211e] p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-light">
                  Common areas &middot; Live
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { area: "Lobby", occ: 3, light: "100%", climate: "72°F" },
                    { area: "Gym", occ: 1, light: "80%", climate: "68°F" },
                    { area: "Pool deck", occ: 0, light: "Off", climate: "—" },
                    { area: "Hallways", occ: "—", light: "30%", climate: "73°F" },
                  ].map((c) => (
                    <div
                      key={c.area}
                      className="rounded-xl border border-white/10 bg-black/30 p-3"
                    >
                      <p className="font-[var(--font-outfit)] text-sm font-semibold text-white">
                        {c.area}
                      </p>
                      <div className="mt-2 flex items-baseline justify-between font-mono text-[0.6rem] text-white/55">
                        <span>Occ {String(c.occ)}</span>
                        <span>{c.light}</span>
                        <span>{c.climate}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                  <p className="font-mono text-[0.6rem] uppercase tracking-wider text-white/40">
                    Today&apos;s common-area energy
                  </p>
                  <p className="font-mono text-[0.7rem] font-semibold text-emerald-300/85">
                    -12% vs. last March
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* §II UNIT-LEVEL */}
          <article className="level-chapter grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:order-2 md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-light/85 md:text-[8rem]">
                  §II
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-light">
                    Inside the door
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Unit-Level Privacy
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-white/65">
                Each apartment is a fully isolated smart home. Voice,
                routines, preferences — none of it leaves the unit, and
                none of it crosses into another. Move-in provisions
                automatic; move-out wipes everything.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-light">
                <LockIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
                  Sealed unit &middot; Tenant-controlled
                </span>
              </div>
            </div>

            <div className="md:order-1 md:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#23211e] p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-light">
                  Unit 4B &middot; Lease span
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    { stage: "Move-in provisioned", date: "Jan 04, 2026", state: "done" },
                    { stage: "Tenant voice profile created", date: "Jan 05, 2026", state: "done" },
                    { stage: "Family routines configured", date: "Jan 12, 2026", state: "done" },
                    { stage: "Move-out wipe", date: "Scheduled", state: "queued" },
                  ].map((d) => (
                    <div
                      key={d.stage}
                      className={`flex items-center gap-4 border-l-2 pl-3 ${
                        d.state === "done"
                          ? "border-emerald-300/55"
                          : "border-accent-light/55"
                      }`}
                    >
                      <span className="flex-1 text-sm text-white/85">{d.stage}</span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-wider text-white/45">
                        {d.date}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
                  {[
                    { l: "Cross-unit data", v: "Zero" },
                    { l: "Tenant overrides", v: "Always" },
                    { l: "Wipe categories", v: "6" },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
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

          {/* §III ACCESS */}
          <article className="level-chapter grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-light/85 md:text-[8rem]">
                  §III
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-light">
                    Every door
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Security &amp; Access
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-white/65">
                Building entry, parking, amenities, units — NFC and
                smart-lock integration from one console. Move-ins,
                guests, maintenance — every code is auditable, every
                door is on a schedule.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-light">
                <ShieldIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
                  Audit trail &middot; Schedules &middot; Revocation
                </span>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#23211e] p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-light">
                  Today&apos;s door log &middot; Mar 14
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    { t: "07:42", door: "Main entry", who: "Resident 3B", state: "ok" },
                    { t: "08:14", door: "Garage", who: "Resident 2A", state: "ok" },
                    { t: "09:30", door: "Package room", who: "Courier · Verified", state: "ok" },
                    { t: "11:02", door: "Unit 4B", who: "Maintenance · scheduled", state: "scheduled" },
                  ].map((d, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 border-l-2 border-emerald-300/55 pl-3"
                    >
                      <span className="font-mono text-xs text-white/45">{d.t}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white/90">{d.door}</p>
                        <p className="mt-0.5 font-serif text-xs italic text-white/55">
                          {d.who}
                        </p>
                      </div>
                      <span className="font-mono text-[0.55rem] uppercase tracking-wider text-emerald-300/80">
                        {d.state === "scheduled" ? "Scheduled" : "Verified"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          {/* §IV MAINTENANCE */}
          <article className="level-chapter grid grid-cols-1 items-start gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:order-2 md:col-span-5">
              <div className="flex items-end gap-4">
                <span aria-hidden className="font-serif text-[6rem] font-light italic leading-none text-accent-light/85 md:text-[8rem]">
                  §IV
                </span>
                <div className="pb-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-light">
                    Before it breaks
                  </p>
                  <h3 className="mt-2 font-[var(--font-outfit)] text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Maintenance Intelligence
                  </h3>
                </div>
              </div>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-white/65">
                Temperature, humidity, and air-quality sensors detect
                issues before they become tickets. Leaks. HVAC drift.
                Mold conditions. The building tells you what&apos;s
                wrong, often before the tenant has noticed.
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent-light">
                <DropletIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
                  Sensors &middot; Anomalies &middot; Triage
                </span>
              </div>
            </div>

            <div className="md:order-1 md:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#23211e] p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]">
                <div className="mb-4 flex items-baseline justify-between">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-light">
                    Active anomalies &middot; 2
                  </p>
                  <span className="rounded-full border border-accent-light/40 bg-accent/15 px-2.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-accent-light">
                    Triage
                  </span>
                </div>
                <ul className="space-y-3">
                  {[
                    {
                      tag: "HVAC drift",
                      loc: "Floor 3 · supply line",
                      body: "Return temp diverging by 4°F over 48h. Likely failing damper.",
                      sev: "watch",
                    },
                    {
                      tag: "Humidity spike",
                      loc: "Unit 1A · bathroom",
                      body: "78% peak after shower, slow decay. Exhaust fan check recommended.",
                      sev: "info",
                    },
                  ].map((a) => (
                    <li
                      key={a.tag}
                      className={`rounded-xl border-l-2 px-4 py-3 ${
                        a.sev === "watch"
                          ? "border-accent-light/70 bg-accent/10"
                          : "border-emerald-300/55 bg-emerald-500/[0.06]"
                      }`}
                    >
                      <div className="flex items-baseline justify-between">
                        <p className="font-[var(--font-outfit)] text-sm font-semibold text-white/90">
                          {a.tag}
                        </p>
                        <span className="font-mono text-[0.55rem] uppercase tracking-wider text-white/45">
                          {a.loc}
                        </span>
                      </div>
                      <p className="mt-1 font-serif text-xs italic leading-relaxed text-white/55">
                        {a.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ──────────── § PORTFOLIO ──────────── */}
      <section className="relative isolate overflow-hidden bg-section-alt px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-x-16 gap-y-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-accent-text">
                Article IV &middot; The Portfolio
              </p>
              <h2 className="mt-5 font-[var(--font-outfit)] text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl">
                Every building.{" "}
                <span className="font-serif italic font-light text-accent-text">
                  One console.
                </span>
              </h2>
              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-muted">
                A property manager sees every building, every floor,
                every unit, every sensor — from a single view.
                Compare energy. Track maintenance. Stage rollouts.
              </p>
              <div className="mt-8 flex items-center gap-2 text-accent-text">
                <GridIcon className="h-5 w-5" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">
                  Portfolio operations
                </span>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card-hover)] md:p-7">
                <div className="flex items-baseline justify-between border-b border-card-border pb-4">
                  <p className="font-[var(--font-outfit)] text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-accent-text">
                    Portfolio &middot; March
                  </p>
                  <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                    4 buildings &middot; 120 units
                  </p>
                </div>

                <div ref={portfolioRef} className="mt-4 flex flex-col divide-y divide-card-border">
                  {portfolioBuildings.map((b) => (
                    <div
                      key={b.name}
                      className="building-row grid grid-cols-12 items-baseline gap-3 py-3.5"
                    >
                      <div className="col-span-5">
                        <p className="font-[var(--font-outfit)] text-sm font-semibold text-foreground">
                          {b.name}
                        </p>
                        <p className="mt-0.5 font-serif text-xs italic text-muted">
                          {b.sub}
                        </p>
                      </div>
                      <div className="col-span-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-wider ${
                            b.state === "Stable"
                              ? "bg-emerald-600/10 text-emerald-700"
                              : b.state === "Maintenance"
                              ? "bg-accent/15 text-accent-text"
                              : "bg-muted/15 text-muted"
                          }`}
                        >
                          {b.state}
                        </span>
                      </div>
                      <div className="col-span-2 text-right">
                        <p className="font-mono text-[0.55rem] uppercase tracking-wider text-muted">
                          Status
                        </p>
                        <p className="mt-0.5 font-mono text-xs font-semibold text-foreground">
                          {b.metric}
                        </p>
                      </div>
                      <div className="col-span-2 text-right">
                        <p className="font-mono text-[0.55rem] uppercase tracking-wider text-muted">
                          Energy
                        </p>
                        <p
                          className={`mt-0.5 font-mono text-xs font-semibold ${
                            b.energy.startsWith("-")
                              ? "text-emerald-700"
                              : "text-muted"
                          }`}
                        >
                          {b.energy}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
            One brain.{" "}
            <span className="font-serif italic font-light text-accent-light">
              Every floor.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl font-serif text-lg italic leading-relaxed text-white/60 md:text-xl">
            We&apos;ll scope a CleverBuilding rollout for one property
            or a whole portfolio — phased, audited, and tenant-safe
            from day one.
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
            {[BuildingIcon, LockIcon, ShieldIcon, GroupIcon].map((Icon, i) => (
              <Icon key={i} className="h-7 w-7" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
