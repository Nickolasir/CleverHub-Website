import type { Metadata } from "next";
import CleverHomeContent from "./Content";

export const metadata: Metadata = {
  title: "CleverHome - Smart Home Automation for Builders",
  description:
    "Pre-installed smart home intelligence for new construction in Houston, TX. Voice control, family AI agents, and builder revenue share.",
  alternates: { canonical: "/cleverhome" },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CleverHome",
  provider: { "@type": "Organization", name: "CleverHub" },
  description:
    "Pre-installed smart home intelligence for new construction. Voice control in every room, family-aware AI agents, and turnkey setup from move-in day.",
  areaServed: { "@type": "City", name: "Houston, TX" },
  serviceType: "Smart Home Installation for Builders",
};

export default function CleverHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <CleverHomeContent />
    </>
  );
}
