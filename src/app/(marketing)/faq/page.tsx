import type { Metadata } from "next";
import FaqContent from "./Content";
import { faqs } from "./faq-data";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description:
    "Common questions about CleverHub smart home automation in Houston, TX. Learn about installation, pricing, voice control, privacy, and compatibility.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqContent />
    </>
  );
}
