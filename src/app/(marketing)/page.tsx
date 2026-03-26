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

export default function Home() {
  return (
    <>
      <HeroVideo />

      {/* CTA band between hero and product */}
      <section className="bg-section-alt px-6 py-10 text-center md:py-14">
        <p className="mb-6 font-[var(--font-outfit)] text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Ready to get started?
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
