import type { Metadata } from "next";
import CleverBuildingContent from "./Content";

export const metadata: Metadata = {
  title: "CleverBuilding - Smart Building Automation for Apartments",
  description:
    "Building-wide smart home intelligence for apartment complexes in Houston, TX. Energy management, tenant privacy, and centralized access control.",
  alternates: { canonical: "/cleverbuilding" },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CleverBuilding",
  provider: { "@type": "Organization", name: "CleverHub" },
  description:
    "Building-wide smart home intelligence with unit-level privacy. Energy management, security, and maintenance automation for apartment complexes.",
  areaServed: { "@type": "City", name: "Houston, TX" },
  serviceType: "Smart Building Automation for Apartments",
};

export default function CleverBuildingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <CleverBuildingContent />
    </>
  );
}
