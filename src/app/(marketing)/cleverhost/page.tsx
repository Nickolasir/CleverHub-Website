import type { Metadata } from "next";
import CleverHostContent from "./Content";

export const metadata: Metadata = {
  title: "CleverHost - Smart Home Automation for Airbnb & STR Hosts",
  description:
    "Automate your Airbnb or short-term rental in Houston, TX. WiFi rotation, guest profile wipes, voice concierge, and energy management.",
  alternates: { canonical: "/cleverhost" },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CleverHost",
  provider: { "@type": "Organization", name: "CleverHub" },
  description:
    "Smart home automation for Airbnb and short-term rental hosts. Automated guest lifecycle management, WiFi rotation, and voice concierge.",
  areaServed: { "@type": "City", name: "Houston, TX" },
  serviceType: "Smart Home Automation for Short-Term Rentals",
};

export default function CleverHostPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <CleverHostContent />
    </>
  );
}
