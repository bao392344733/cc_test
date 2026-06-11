import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoryNav } from "@/components/home/CategoryNav";
import { Bestsellers } from "@/components/home/Bestsellers";
import { WhyPawRomer } from "@/components/home/WhyPawRomer";
import { Testimonials } from "@/components/home/Testimonials";
import { OurStory } from "@/components/home/OurStory";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoryNav />
      <Bestsellers />
      <WhyPawRomer />
      <Testimonials />
      <OurStory />
      <HomeFAQ />
      <FinalCTA />
      <Newsletter />
    </>
  );
}
