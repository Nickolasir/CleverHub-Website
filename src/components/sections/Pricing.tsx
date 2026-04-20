"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal } from "@/hooks/useGSAP";

const hubFeatures = [
  "Dedicated on-device AI accelerator",
  "High-performance compute core",
  "Sub-1-second local voice processing",
  "High-sensitivity microphone + 3W speaker",
  "Temperature & humidity sensor",
  "Ambient light sensor",
  "Precision presence detection",
  "Air quality / VOC monitoring",
  "NFC reader for tap automations",
  "IR blaster for legacy device control",
  "RGB status LED",
  "WiFi 5 + Bluetooth 5.0",
];

const satelliteFeatures = [
  "4x satellite nodes included",
  "Low-power wireless compute with WiFi + Bluetooth",
  "Voice mic + speaker per room",
  "Temperature & humidity per room",
  "Ambient light sensing",
  "Precision human presence detection",
  "Air quality / VOC monitoring",
  "IR blaster for legacy devices",
  "RGB status LED",
];

export function Pricing() {
  const cardRef = useStaggerReveal<HTMLDivElement>(".pricing-item", {
    stagger: 0.06,
    y: 16,
  });

  return (
    <SectionWrapper id="pricing">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Pricing
        </p>
        <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold tracking-tight md:text-5xl">
          One System. Every Room.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Everything you need to make your home intelligent — hub, four satellite
          nodes, and all the sensors built in.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        {/* Main pricing card */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl bg-card shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
        >
          {/* Subtle top line */}
          <div className="h-px bg-card-border" />

          <div className="p-10 md:p-14">
            {/* Price */}
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                CleverHub Standard System
              </p>
              <div className="mt-4 flex items-baseline justify-center gap-1">
                <span className="font-[var(--font-outfit)] text-6xl font-semibold tracking-tight md:text-7xl">
                  $2,500
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">
                One-time purchase. Hub + 4 satellite nodes + all sensors.
              </p>
              {/* Deemphasized monthly */}
              <p className="mt-1 text-xs text-muted/50">
                Cloud AI features available for $100/mo
              </p>
            </div>

            {/* Divider */}
            <div className="my-10 h-px bg-card-border" />

            {/* Two-column features */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Hub */}
              <div>
                <h3 className="pricing-item font-[var(--font-outfit)] text-base font-semibold">
                  Central Hub
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {hubFeatures.map((f) => (
                    <li
                      key={f}
                      className="pricing-item flex items-start gap-2 text-sm text-muted"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Satellites */}
              <div>
                <h3 className="pricing-item font-[var(--font-outfit)] text-base font-semibold">
                  Satellite Nodes (x4)
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {satelliteFeatures.map((f) => (
                    <li
                      key={f}
                      className="pricing-item flex items-start gap-2 text-sm text-muted"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <a
                href="#consultation"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-accent-light"
              >
                Schedule a Consultation
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
