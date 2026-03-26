import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "CleverHub terms of service. Read the terms and conditions governing use of our smart home products and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="px-6 pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-[var(--font-outfit)] text-4xl font-bold tracking-tight md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-lg text-muted">
          Last updated: March 25, 2026
        </p>

        <div className="mt-12 space-y-8 text-base leading-relaxed text-muted">
          <div>
            <h2 className="font-[var(--font-outfit)] text-xl font-semibold text-foreground">
              1. Acceptance of Terms
            </h2>
            <p className="mt-3">
              By accessing or using CleverHub products and services, you agree
              to be bound by these Terms of Service. If you do not agree to
              these terms, please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="font-[var(--font-outfit)] text-xl font-semibold text-foreground">
              2. Services
            </h2>
            <p className="mt-3">
              CleverHub provides AI-powered smart home automation systems
              including hardware, software, installation, and ongoing support
              services. Service availability and features may vary by product
              line (CleverHome, CleverHost, CleverBuilding, CleverAide).
            </p>
          </div>

          <div>
            <h2 className="font-[var(--font-outfit)] text-xl font-semibold text-foreground">
              3. Limitation of Liability
            </h2>
            <p className="mt-3">
              CleverHub shall not be liable for any indirect, incidental,
              special, or consequential damages arising from the use or
              inability to use our products and services.
            </p>
          </div>

          <div>
            <h2 className="font-[var(--font-outfit)] text-xl font-semibold text-foreground">
              4. Contact Us
            </h2>
            <p className="mt-3">
              If you have questions about these terms, please contact us at{" "}
              <a
                href="mailto:nickolasir@msn.com"
                className="text-accent underline underline-offset-2 hover:text-accent-light"
              >
                nickolasir@msn.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
