import { AIModelsSection } from "@/components/landing/AIModelsSection";
import { CTASection } from "@/components/landing/CTASection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { Navbar } from "@/components/landing/Navbar";
import { SectionDivider } from "@/components/landing/SectionDivider";

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

        <CTASection />
      </main>
    </div>
  );
}
