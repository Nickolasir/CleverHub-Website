import { HeroVideo } from "@/components/hero/HeroVideo";
import { ProductOverview } from "@/components/sections/ProductOverview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MarketVerticals } from "@/components/sections/MarketVerticals";
import { Pricing } from "@/components/sections/Pricing";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";

export default function Home() {
  return (
    <>
      <HeroVideo />
      <ProductOverview />
      <HowItWorks />
      <MarketVerticals />
      <Pricing />
      <FeaturesGrid />
    </>
  );
}
