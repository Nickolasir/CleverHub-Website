import type { Metadata } from "next";
import CleverAideContent from "./Content";

export const metadata: Metadata = {
  title: "CleverAide - Smart Home Assisted Living Care",
  description:
    "Voice-first assisted living care in Houston, TX. Medication reminders, fall detection, wellness check-ins, and caregiver alerts powered by AI.",
  alternates: { canonical: "/cleveraide" },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CleverAide",
  provider: { "@type": "Organization", name: "CleverHub" },
  description:
    "Voice-first assisted living care with medication management, fall detection, wellness check-ins, and caregiver alert systems.",
  areaServed: { "@type": "City", name: "Houston, TX" },
  serviceType: "Smart Home Assisted Living Care",
};

export default function CleverAidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <CleverAideContent />
    </>
  );
}
