"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useStaggerReveal } from "@/hooks/useGSAP";

const hubFeatures = [
  "40 TOPS AI accelerator (Hailo-10H)",
  "Raspberry Pi 5 (8GB) compute core",
  "Sub-1-second local voice processing",
  "MEMS microphone + 3W speaker",
  "Temperature & humidity sensor",
  "Ambient light sensor",
  "mmWave presence detection",
  "Air quality / VOC monitoring",
  "NFC reader for tap automations",
  "IR blaster for legacy device control",
  "RGB status LED",
  "WiFi 5 + Bluetooth 5.0",
];

const apartmentSatelliteFeatures = [
  "1x satellite node included",
  "ESP32 with WiFi + Bluetooth",
  "Voice mic + speaker",
  "Temperature & humidity",
  "Ambient light sensing",
  "mmWave human presence detection",
  "Air quality / VOC monitoring",
  "IR blaster for legacy devices",
  "RGB status LED",
];

const standardSatelliteFeatures = [
  "4x satellite nodes included",
  "ESP32 with WiFi + Bluetooth",
  "Voice mic + speaker per room",
  "Temperature & humidity per room",
  "Ambient light sensing",
  "mmWave human presence detection",
  "Air quality / VOC monitoring",
  "IR blaster for legacy devices",
  "RGB status LED",
];

function CheckIcon() {
  return (
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
  );
}

export function Pricing() {
  const cardRef = useStaggerReveal<HTMLDivElement>(".pricing-item", {
    stagger: 0.06,
    y: 16,
  });

  return (
    <SectionWrapper id="pricing">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">
          Pricing
        </p>
        <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold tracking-tight md:text-5xl">
          One System. Every Room.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Everything you need to make your home intelligent — choose the system
          that fits your space.
        </p>
      </div>

      <div
        ref={cardRef}
        className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2"
      >
        {/* Apartment Tier */}
        <div className="relative overflow-hidden rounded-2xl bg-card shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="h-px bg-card-border" />
          <div className="p-10 md:p-12">
            {/* Price */}
            <div className="text-center">
              <p className="pricing-item text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">
                CleverHub Apartment
              </p>
              <div className="mt-4 flex items-baseline justify-center gap-1">
                <span className="pricing-item font-[var(--font-outfit)] text-5xl font-semibold tracking-tight md:text-6xl">
                  $1,899
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">
                One-time purchase. Hub + 1 satellite node + all sensors.
              </p>
              <p className="mt-1 text-xs text-muted/50">
                Cloud AI features available for $100/mo
              </p>
            </div>

            <div className="my-8 h-px bg-card-border" />

            {/* Hub features */}
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
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-6 h-px bg-card-border" />

            {/* Satellite features */}
            <div>
              <h3 className="pricing-item font-[var(--font-outfit)] text-base font-semibold">
                Satellite Node (x1)
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {apartmentSatelliteFeatures.map((f) => (
                  <li
                    key={f}
                    className="pricing-item flex items-start gap-2 text-sm text-muted"
                  >
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <a
                href="#consultation"
                data-track="cta_pricing_apartment"
                className="inline-flex items-center gap-2 rounded-full border border-accent px-8 py-3.5 text-base font-medium text-accent transition-all duration-300 hover:bg-accent hover:text-white"
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

        {/* Standard Tier */}
        <div className="relative overflow-hidden rounded-2xl bg-card shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] ring-2 ring-accent/20">
          {/* Popular badge */}
          <div className="absolute right-6 top-6">
            <span className="pricing-item rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              Most Popular
            </span>
          </div>
          <div className="h-px bg-accent/30" />
          <div className="p-10 md:p-12">
            {/* Price */}
            <div className="text-center">
              <p className="pricing-item text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">
                CleverHub Standard
              </p>
              <div className="mt-4 flex items-baseline justify-center gap-1">
                <span className="pricing-item font-[var(--font-outfit)] text-5xl font-semibold tracking-tight md:text-6xl">
                  $2,999
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">
                One-time purchase. Hub + 4 satellite nodes + all sensors.
              </p>
              <p className="mt-1 text-xs text-muted/50">
                Cloud AI features available for $100/mo
              </p>
            </div>

            <div className="my-8 h-px bg-card-border" />

            {/* Hub features */}
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
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-6 h-px bg-card-border" />

            {/* Satellite features */}
            <div>
              <h3 className="pricing-item font-[var(--font-outfit)] text-base font-semibold">
                Satellite Nodes (x4)
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {standardSatelliteFeatures.map((f) => (
                  <li
                    key={f}
                    className="pricing-item flex items-start gap-2 text-sm text-muted"
                  >
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <a
                href="#consultation"
                data-track="cta_pricing_standard"
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

      {/* Additional satellites note */}
      <p className="mx-auto mt-8 max-w-5xl text-center text-sm text-muted">
        Need more coverage? Additional satellite nodes available for{" "}
        <span className="font-semibold text-foreground">$650 each</span>.
      </p>
    </SectionWrapper>
  );
}
