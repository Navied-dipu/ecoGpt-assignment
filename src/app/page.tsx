import Link from "next/link";

import { AIModelsSection } from "@/components/landing/AIModelsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { Navbar } from "@/components/landing/Navbar";

function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto h-px w-[min(100%,72rem)] bg-gradient-to-r from-transparent via-border to-transparent"
    />
  );
}

function ClosingCta() {
  return (
    <section
      aria-labelledby="get-started-title"
      className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
        <h2
          id="get-started-title"
          className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Start chatting with every model in one place
        </h2>
        <p className="text-balance text-base text-muted-foreground">
          Free to start. No card required, and your conversations stay yours.
        </p>
        <Link
          href="/get-started"
          className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        >
          Try Web App Free
        </Link>
      </div>
    </section>
  );
}

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

        <ClosingCta />
      </main>
    </div>
  );
}
