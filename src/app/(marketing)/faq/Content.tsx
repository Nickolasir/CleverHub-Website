"use client";

import { useState } from "react";
import { useFadeIn } from "@/hooks/useGSAP";
import { faqs } from "./faq-data";

const categories = [
  { key: "all", label: "All Questions" },
  { key: "product", label: "Product & System" },
  { key: "privacy", label: "Privacy & Security" },
  { key: "pricing", label: "Installation & Pricing" },
  { key: "features", label: "Family & Features" },
  { key: "professional", label: "For Professionals" },
];

export default function FaqContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const heroRef = useFadeIn<HTMLDivElement>({ y: 30 });

  const filtered =
    activeCategory === "all"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-gray px-6 pb-16 pt-32 md:pt-40">
        <div ref={heroRef} className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-light">
            Support
          </p>
          <h1 className="mt-4 font-[var(--font-outfit)] text-4xl font-bold text-white md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Everything you need to know about CleverHub smart home automation.
            Can&apos;t find what you&apos;re looking for?{" "}
            <a
              href="/#consultation"
              className="text-accent underline underline-offset-2 hover:text-accent-light"
            >
              Schedule a free consultation
            </a>
            .
          </p>
        </div>
      </section>

      {/* Filter + FAQ List */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setOpenFaq(null);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-accent text-white"
                    : "bg-section-alt text-muted hover:bg-card-border hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="flex flex-col divide-y divide-card-border">
            {filtered.map((faq, i) => {
              const globalIndex = faqs.indexOf(faq);
              return (
                <div key={globalIndex} className="py-5">
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === globalIndex ? null : globalIndex)
                    }
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="pr-4 text-base font-medium text-foreground">
                      {faq.q}
                    </span>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                        openFaq === globalIndex ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === globalIndex
                        ? "mt-3 max-h-60 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm leading-relaxed text-muted">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-muted">
              No questions in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-warm-gray px-6 py-20 text-center text-white md:py-28">
        <h2 className="font-[var(--font-outfit)] text-3xl font-semibold tracking-tight md:text-4xl">
          Still Have Questions?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-white/50">
          Schedule a free consultation and we&apos;ll walk you through
          everything.
        </p>
        <a
          href="/#consultation"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-accent-light"
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
      </section>
    </>
  );
}
