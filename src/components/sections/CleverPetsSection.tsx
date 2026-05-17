"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useFadeIn, useStaggerReveal } from "@/hooks/useGSAP";

/* Glyphs */

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

function AlertTriangleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M12 3l10 18H2L12 3z" strokeLinejoin="round" />
      <line x1="12" y1="10" x2="12" y2="14" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12" y2="17.5" strokeLinecap="round" />
    </svg>
  );
}

const highlights = [
  {
    icon: PillIcon,
    title: "Medication on schedule",
    body: "Voice-confirmed doses with the prescribing vet on file.",
  },
  {
    icon: StethoscopeIcon,
    title: "AI symptom triage",
    body: "Emergency keywords escalate; routine concerns get a vet-call or monitor plan.",
  },
  {
    icon: AlertTriangleIcon,
    title: "Real-time recall alerts",
    body: "The pantry is matched against a live recall feed, 24 hours a day.",
  },
];

export function CleverPetsSection() {
  const copyRef = useFadeIn<HTMLDivElement>({ y: 24 });
  const cardRef = useFadeIn<HTMLDivElement>({ y: 30, delay: 0.12 });
  const itemsRef = useStaggerReveal<HTMLDivElement>(".pets-highlight", {
    stagger: 0.08,
    y: 14,
  });

  return (
    <SectionWrapper id="pets" className="bg-section-alt">
      <div className="relative grid items-center gap-x-16 gap-y-14 md:grid-cols-12">
        {/* Background marginalia paw — bleeds off the right */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-24 select-none text-accent/[0.06] md:-right-4"
        >
          <PawGlyph className="h-[340px] w-[340px]" />
        </div>

        {/* Left — copy */}
        <div ref={copyRef} className="relative md:col-span-7">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-accent-text">
            Pet Care Inside the Home
          </p>
          <h2 className="mt-4 font-[var(--font-outfit)] text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            Care for the smallest{" "}
            <span className="font-serif italic font-light text-accent-text">
              members
            </span>{" "}
            of the household.
          </h2>
          <p className="mt-6 max-w-xl font-serif text-lg italic leading-relaxed text-muted">
            Meds, meals, vets, and worry — all kept by the same assistant that
            runs the rest of your home. Voice-first, household-scoped, and
            built around how families actually live with pets.
          </p>

          {/* Highlights */}
          <div ref={itemsRef} className="mt-10 flex flex-col gap-5">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.title} className="pets-highlight flex items-start gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-[var(--font-outfit)] text-base font-semibold text-foreground">
                      {h.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {h.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="/cleverpets"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent transition-all duration-300 hover:gap-3 hover:text-accent-text"
          >
            Explore CleverPets
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        {/* Right — Profile card mockup */}
        <div
          ref={cardRef}
          className="relative flex justify-center md:col-span-5 md:justify-end"
        >
          {/* Accent glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,168,67,0.14) 0%, transparent 70%)",
            }}
          />

          <div className="relative w-full max-w-[360px] rounded-2xl border border-card-border bg-card p-6 shadow-[0_30px_60px_-25px_rgba(120,90,30,0.45),0_4px_12px_rgba(120,90,30,0.08)]">
            <div className="absolute right-5 top-5 flex items-center gap-2">
              <PawGlyph className="h-3.5 w-3.5 text-accent/70" />
              <span className="font-[var(--font-outfit)] text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-accent">
                Profile № 01
              </span>
            </div>

            <h3 className="font-[var(--font-outfit)] text-[2.5rem] font-bold leading-none tracking-tight text-foreground">
              Max
            </h3>
            <p className="mt-2 font-serif text-base italic leading-snug text-muted">
              Golden Retriever &middot; Male &middot; 4 yrs
            </p>
            <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted/60">
              Microchip 985&nbsp;121&nbsp;003
            </p>

            <div className="mt-6 border-t border-card-border pt-4">
              <p className="font-[var(--font-outfit)] text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-accent-text">
                Active Meds
              </p>
              <ul className="mt-2.5 flex flex-col gap-2">
                {[
                  { drug: "Apoquel 16 mg", schedule: "1× daily" },
                  { drug: "Cosequin DS", schedule: "2× daily" },
                ].map((m) => (
                  <li key={m.drug} className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {m.drug}
                    </span>
                    <span className="font-mono text-[0.65rem] tracking-wide text-muted">
                      {m.schedule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-card-border pt-4">
              <div>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-muted">
                  Weight
                </p>
                <p className="mt-0.5 font-[var(--font-outfit)] text-lg font-semibold text-foreground">
                  31.4 kg
                </p>
                <p className="text-[0.62rem] text-emerald-700/80">
                  BCS 5/9 &middot; Ideal
                </p>
              </div>
              <div>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-muted">
                  Next Vet
                </p>
                <p className="mt-0.5 font-[var(--font-outfit)] text-lg font-semibold text-foreground">
                  Mar 21
                </p>
                <p className="text-[0.62rem] text-muted">Bellaire Vet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
