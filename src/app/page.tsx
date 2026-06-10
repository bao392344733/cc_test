import { HeroSection } from "@/components/home/HeroSection";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CategoryNav } from "@/components/home/CategoryNav";
import { Bestsellers } from "@/components/home/Bestsellers";
import { FeatureBanner } from "@/components/home/FeatureBanner";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <CategoryNav />
      <Bestsellers />
      <FeatureBanner />
      <Newsletter />
    </>
  );
}
