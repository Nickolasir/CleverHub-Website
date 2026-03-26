import type { Metadata } from "next";
import { HeroVideo } from "@/components/hero/HeroVideo";
import { ProductOverview } from "@/components/sections/ProductOverview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FamilyIntelligence } from "@/components/sections/FamilyIntelligence";
import { MarketVerticals } from "@/components/sections/MarketVerticals";
import { MobileApp } from "@/components/sections/MobileApp";
import { TVDashboard } from "@/components/sections/TVDashboard";
import { Pricing } from "@/components/sections/Pricing";
import { KitchenHub } from "@/components/sections/KitchenHub";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { ConsultationSection } from "@/components/sections/ConsultationSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "CleverHub Smart Home Product Showcase",
  description:
    "See how CleverHub AI-powered smart home automation works with sub-1-second voice control and satellite nodes in every room.",
  thumbnailUrl: "https://cleverhub.space/images/keyframe-01.png",
  uploadDate: "2026-03-01",
  contentUrl: "https://cleverhub.space/video/cleverhub-hero.mp4",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />

      <HeroVideo />

      {/* CTA band between hero and product */}
      <section className="bg-section-alt px-6 py-10 text-center md:py-14">
        <p className="mb-6 font-[var(--font-outfit)] text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Smart Home Automation That Just Works
        </p>
        <a
          href="#consultation"
          className="inline-block rounded-full bg-accent px-10 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-accent-light md:px-12 md:py-5 md:text-lg"
        >
          Schedule Your Consultation
        </a>
      </section>

      <ProductOverview />
      <HowItWorks />
      <FamilyIntelligence />
      <MarketVerticals />
      <MobileApp />
      <TVDashboard />
      <Pricing />
      <KitchenHub />
      <FeaturesGrid />
      <ConsultationSection />
    </>
  );
}
