import { AIModelsSection } from "@/components/landing/AIModelsSection";
import { CTASection } from "@/components/landing/CTASection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { Navbar } from "@/components/landing/Navbar";
import { PricingSection } from "@/components/landing/PricingSection";
import { ProductPreviewSection } from "@/components/landing/ProductPreviewSection";
import { SectionDivider } from "@/components/landing/SectionDivider";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { WhyChooseSection } from "@/components/landing/WhyChooseSection";

export default function Home() {
  return (
    <div className="bg-dot-grid relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Navbar />

      <main>
        <HeroSection />

        <SectionDivider />

        <FeaturesSection />

        <SectionDivider />

        <AIModelsSection />

        <SectionDivider />

        <ProductPreviewSection />

        <SectionDivider />

        <WhyChooseSection />

        <SectionDivider />

        <PricingSection />

        <SectionDivider />

        <FAQSection />

        <SectionDivider />

        <TestimonialsSection />

        <SectionDivider />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
