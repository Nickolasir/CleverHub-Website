import type { Metadata } from "next";
import CleverPetsContent from "./Content";

export const metadata: Metadata = {
  title: "CleverPets - AI Pet Care for the Smart Home",
  description:
    "Voice-first pet care in Houston, TX. Medication reminders, feeding logs, vet records, AI symptom triage, and real-time food-recall alerts — powered by the same Clever home assistant.",
  alternates: { canonical: "/cleverpets" },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CleverPets",
  provider: { "@type": "Organization", name: "CleverHub" },
  description:
    "Voice-first pet care with medication management, feeding logs, vet records, AI symptom triage, and food-recall alerts.",
  areaServed: { "@type": "City", name: "Houston, TX" },
  serviceType: "Smart Home Pet Care",
};

export default function CleverPetsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <CleverPetsContent />
    </>
  );
}
