"use client";

import { useEffect, useMemo, useRef } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useConsultationForm } from "@/hooks/useConsultationForm";
import { DateTimePicker } from "@/components/ui/DateTimePicker";
import { useAnalytics } from "@/components/providers/AnalyticsProvider";

export function ConsultationSection() {
  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    submitError,
    updateField,
    updateTimeSlots,
    submit,
  } = useConsultationForm();
  const { trackConsultationFunnel } = useAnalytics();
  const hasTrackedView = useRef(false);
  const hasTrackedStart = useRef(false);

  // Track when user scrolls to see this section
  useEffect(() => {
    const section = document.getElementById("consultation");
    if (!section || hasTrackedView.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          hasTrackedView.current = true;
          trackConsultationFunnel("view");
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [trackConsultationFunnel]);

  // Track when user starts filling the form
  const handleFieldFocus = () => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackConsultationFunnel("start");
    }
  };

  const selectedSlots = useMemo(
    () =>
      [
        formData.preferredTime1,
        formData.preferredTime2,
        formData.preferredTime3,
      ].filter(Boolean),
    [formData.preferredTime1, formData.preferredTime2, formData.preferredTime3]
  );

  return (
    <SectionWrapper id="consultation" dark>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Let&apos;s Talk
        </p>
        <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Schedule Your Free Consultation
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
          Tell us about your property and pick three times that work for you.
          We&apos;ll design a CleverHub setup tailored to your space.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-2xl">
        {isSuccess ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-8 w-8 text-green-400"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-white">
              We&apos;ll Be in Touch!
            </p>
            <p className="mt-2 text-sm text-white/50">
              We&apos;ll confirm your consultation time within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              trackConsultationFunnel("submit");
              submit();
            }}
            onFocus={handleFieldFocus}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-md md:p-8"
          >
            {submitError && (
              <div className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {submitError}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/80">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="John Smith"
                  className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.name ? "border-red-500/50" : "border-white/10"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/80">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="john@example.com"
                  className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.email ? "border-red-500/50" : "border-white/10"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/80">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="(713) 555-0100"
                  className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.phone ? "border-red-500/50" : "border-white/10"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/80">
                  Property Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="123 Main St, Houston, TX 77001"
                  className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.address ? "border-red-500/50" : "border-white/10"
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-red-400">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/80">
                  Number of Bedrooms *
                </label>
                <select
                  value={formData.bedrooms}
                  onChange={(e) =>
                    updateField("bedrooms", parseInt(e.target.value))
                  }
                  className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.bedrooms ? "border-red-500/50" : "border-white/10"
                  }`}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} className="bg-[#1a1a1a]">
                      {n} {n === 1 ? "bedroom" : "bedrooms"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.hasOffice}
                    onChange={(e) =>
                      updateField("hasOffice", e.target.checked)
                    }
                    className="h-5 w-5 rounded border-white/20 bg-white/5 text-accent focus:ring-accent"
                  />
                  <span className="text-sm font-medium text-white/80">
                    Property has a home office
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-6">
              <div className="[&_p]:text-white/80 [&_span]:text-white/50 [&_button]:border-white/10 [&_.text-foreground]:text-white [&_.text-muted]:text-white/50 [&_.bg-card]:bg-white/5 [&_.border-card-border]:border-white/10 [&_.bg-background]:bg-white/5">
                <DateTimePicker
                  selectedSlots={selectedSlots}
                  onSlotsChange={updateTimeSlots}
                />
              </div>
              {(errors.preferredTime1 ||
                errors.preferredTime2 ||
                errors.preferredTime3) && (
                <p className="mt-2 text-xs text-red-400">
                  Please select 3 preferred consultation times
                </p>
              )}
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-10 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        className="opacity-75"
                      />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Schedule My Consultation"
                )}
              </button>
              <p className="mt-3 text-xs text-white/30">
                We&apos;ll confirm your time within 24 hours. No spam, ever.
              </p>
            </div>
          </form>
        )}
      </div>
    </SectionWrapper>
  );
}
