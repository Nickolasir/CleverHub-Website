"use client";

import { useConsultationForm } from "@/hooks/useConsultationForm";
import { DateTimePicker } from "@/components/ui/DateTimePicker";
import { useFadeIn } from "@/hooks/useGSAP";

export function ConsultationCTA() {
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

  const ref = useFadeIn<HTMLElement>({ y: 30 });

  const selectedSlots = [
    formData.preferredTime1,
    formData.preferredTime2,
    formData.preferredTime3,
  ].filter(Boolean);

  if (isSuccess) {
    return (
      <section
        id="consultation"
        ref={ref}
        className="bg-warm-gray px-6 py-32 text-center"
      >
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-10 w-10 text-green-400"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-[var(--font-outfit)] text-4xl font-bold text-white">
            We&apos;ll Be in Touch!
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Thanks for your interest in CleverHub. We&apos;ll confirm one of
            your preferred consultation times within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="consultation" ref={ref} className="bg-warm-gray px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Free Consultation
          </p>
          <h2 className="mt-3 font-[var(--font-outfit)] text-4xl font-bold text-white md:text-5xl">
            Ready to Make Your Space Intelligent?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Schedule a free consultation. We&apos;ll design a CleverHub setup
            tailored to your property.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10"
        >
          {submitError && (
            <div className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {submitError}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}
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

            {/* Email */}
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

            {/* Phone */}
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

            {/* Address */}
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

            {/* Bedrooms */}
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
                  <option key={n} value={n} className="bg-warm-gray">
                    {n} {n === 1 ? "bedroom" : "bedrooms"}
                  </option>
                ))}
              </select>
            </div>

            {/* Office */}
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.hasOffice}
                  onChange={(e) => updateField("hasOffice", e.target.checked)}
                  className="h-5 w-5 rounded border-white/20 bg-white/5 text-accent focus:ring-accent"
                />
                <span className="text-sm font-medium text-white/80">
                  Property has a home office
                </span>
              </label>
            </div>
          </div>

          {/* Date/Time Picker */}
          <div className="mt-8">
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

          {/* Submit */}
          <div className="mt-10 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-10 py-4 text-base font-semibold text-white transition-all hover:bg-accent-light hover:shadow-xl hover:shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <p className="mt-4 text-xs text-white/30">
              We&apos;ll confirm your time within 24 hours. No spam, ever.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
