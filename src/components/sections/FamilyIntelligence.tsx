"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal, useFadeIn } from "@/hooks/useGSAP";
import Link from "next/link";

const familyMembers = [
  { name: "Dad", agent: "Jarvis", tier: "Adult", access: "Full access", color: "bg-accent" },
  { name: "Mom", agent: "Friday", tier: "Adult", access: "Full access", color: "bg-accent" },
  { name: "Teen", agent: "Luna", tier: "Teenager", access: "No locks or cameras", color: "bg-amber-400" },
  { name: "Child", agent: "Buddy", tier: "Child", access: "Own room only", color: "bg-emerald-400" },
];

const stats = [
  { label: "Age Tiers", value: "6" },
  { label: "Custom Wake Words", value: "Per Member" },
  { label: "Parental Alerts", value: "Real-Time" },
];

export function FamilyIntelligence() {
  const cardsRef = useStaggerReveal<HTMLDivElement>(".family-card", {
    stagger: 0.1,
    y: 20,
  });
  const textRef = useFadeIn<HTMLDivElement>({ y: 24 });

  return (
    <SectionWrapper id="family">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left — Copy */}
        <div ref={textRef}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Family Intelligence
          </p>
          <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold tracking-tight md:text-5xl">
            Every Family Member.{" "}
            <span className="text-accent">Their Own AI.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Each person gets a named AI agent with age-appropriate behavior,
            custom wake words, and granular permissions — all managed by parents
            from the dashboard or mobile app.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            Toddlers get a friendly companion with zero device access. Teenagers
            get near-adult privileges minus security controls. Adults get full
            reign. And every interaction is logged for complete transparency.
          </p>
          <Link
            href="/cleverhome"
            className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors duration-300 hover:text-accent-light"
          >
            Learn more about CleverHome
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 transition-transform duration-300 hover:translate-x-1"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        {/* Right — Agent Cards */}
        <div ref={cardsRef} className="grid grid-cols-2 gap-4">
          {familyMembers.map((member) => (
            <div
              key={member.name}
              className="family-card rounded-2xl border border-card-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${member.color} text-sm font-bold text-white`}
                >
                  {member.name[0]}
                </div>
                <div>
                  <p className="font-[var(--font-outfit)] text-sm font-semibold">
                    {member.name}
                  </p>
                  <p className="text-xs text-muted">
                    &ldquo;Hey {member.agent}&rdquo;
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Tier</span>
                  <span className="text-xs font-medium">{member.tier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Access</span>
                  <span className="text-xs font-medium">{member.access}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="mt-16 grid grid-cols-3 gap-6 border-t border-card-border pt-12">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-[var(--font-outfit)] text-2xl font-bold text-accent md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
