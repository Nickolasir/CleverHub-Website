import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "CleverHub privacy policy. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="px-6 pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-[var(--font-outfit)] text-4xl font-bold tracking-tight md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg text-muted">
          Last updated: March 25, 2026
        </p>

        <div className="mt-12 space-y-8 text-base leading-relaxed text-muted">
          <div>
            <h2 className="font-[var(--font-outfit)] text-xl font-semibold text-foreground">
              1. Information We Collect
            </h2>
            <p className="mt-3">
              We collect information you provide directly, such as your name,
              email address, phone number, and property address when you
              schedule a consultation or sign up for our affiliate program. We
              also collect usage data through analytics to improve our website
              experience.
            </p>
          </div>

          <div>
            <h2 className="font-[var(--font-outfit)] text-xl font-semibold text-foreground">
              2. How We Use Your Information
            </h2>
            <p className="mt-3">
              We use your information to provide and improve our services,
              process consultation requests, communicate with you about our
              products, and comply with legal obligations.
            </p>
          </div>

          <div>
            <h2 className="font-[var(--font-outfit)] text-xl font-semibold text-foreground">
              3. Data Processing &amp; Privacy
            </h2>
            <p className="mt-3">
              CleverHub smart home systems process voice commands locally using
              on-device AI. No audio recordings are transmitted to external
              servers. All voice processing occurs on the 40 TOPS AI
              accelerator within your home.
            </p>
          </div>

          <div>
            <h2 className="font-[var(--font-outfit)] text-xl font-semibold text-foreground">
              4. Contact Us
            </h2>
            <p className="mt-3">
              If you have questions about this privacy policy, please contact us
              at{" "}
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
