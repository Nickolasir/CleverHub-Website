"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal } from "@/hooks/useGSAP";

const features = [
  {
    title: "Voice Control",
    description:
      "Say \"Clever\" in any room. Sub-second response for lights, locks, thermostat, scenes, and more.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    title: "Presence Detection",
    description:
      "BLE scanning knows who's home and which room they're in. Automate lights, climate, and music accordingly.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Energy Management",
    description:
      "Pre-cool before guests arrive. Optimize HVAC based on occupancy. Average 23% energy savings.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Security & Access",
    description:
      "Smart locks, cameras, and alerts — all processed locally. No video ever leaves your home.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Scene Automation",
    description:
      "\"Good Morning\", \"Good Night\", \"I'm Leaving\" — one command orchestrates dozens of devices at once.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Multi-Room Audio",
    description:
      "Speakers in every satellite node. Music follows you from room to room, controlled by voice.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
      </svg>
    ),
  },
  {
    title: "Family Agents",
    description:
      "Every family member gets their own named AI with a custom wake word. Age-appropriate permissions keep kids safe and parents in control.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Assisted Living",
    description:
      "Medication reminders, wellness check-ins, fall detection, and caregiver alerts for elderly family members — all voice-first.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    title: "Mobile App",
    description:
      "Full device control, family management, and voice commands from your phone. Available on iOS and Android.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
      </svg>
    ),
  },
  {
    title: "Smart Notifications",
    description:
      "Telegram, WhatsApp, and push alerts for caregiver needs, parental controls, guest arrivals, and security events.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
  },
  {
    title: "Security & Audit",
    description:
      "Every device command logged with user, timestamp, and room. 19 tracked audit actions with role-based access and automated security testing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    title: "TV Dashboard",
    description:
      "Your TV becomes an always-on command center. Device status, scene controls, and activity feed — all navigable with your TV remote.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <path d="M12 17v4M7 21h10" />
      </svg>
    ),
  },
  {
    title: "Satellite Nodes",
    description:
      "ESP32-S3 satellite nodes in every room. Voice, sensors, and presence detection with on-device wake word recognition in under 10ms.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M5 12.55a11 11 0 0114.08 0" />
        <path d="M1.42 9a16 16 0 0121.16 0" />
        <path d="M8.53 16.11a6 6 0 016.95 0" />
        <line x1="12" y1="20" x2="12" y2="20.01" />
      </svg>
    ),
  },
];

export function FeaturesGrid() {
  const gridRef = useStaggerReveal<HTMLDivElement>(".feature-card", {
    stagger: 0.06,
    y: 16,
  });

  return (
    <SectionWrapper id="features" className="bg-section-alt">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Capabilities
        </p>
        <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold tracking-tight md:text-5xl">
          Everything Your Home Needs
        </h2>
      </div>

      <div
        ref={gridRef}
        className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className="feature-card rounded-2xl bg-card p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent/8 text-accent">
              {feature.icon}
            </div>
            <h3 className="mt-4 font-[var(--font-outfit)] text-base font-semibold">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
