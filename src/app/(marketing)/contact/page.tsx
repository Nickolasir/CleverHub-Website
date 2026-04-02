import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with CleverHub. Send us a message and we'll get back to you within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="px-6 pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-[var(--font-outfit)] text-4xl font-bold tracking-tight md:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-muted">
          Have a question or want to learn more about CleverHub? Send us a
          message and we&apos;ll get back to you within 24 hours.
        </p>

        <ContactForm />
      </div>
    </section>
  );
}
