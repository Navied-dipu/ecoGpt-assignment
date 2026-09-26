import Link from "next/link";

import { HeroSection } from "@/components/landing/HeroSection";
import { Navbar } from "@/components/landing/Navbar";

const FEATURES = [
  {
    id: "multi-ai",
    title: "One inbox for every model",
    description:
      "Send the same question to GPT-4, Gemini, Claude and more, then compare the answers side by side.",
  },
  {
    id: "extension",
    title: "Works where you work",
    description:
      "Use the full web app or the Chrome extension to reach EchoGPT from any tab, without switching windows.",
  },
  {
    id: "privacy",
    title: "Free to start",
    description:
      "Try every feature with a free tier. No card required, and your conversations stay yours.",
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <HeroSection />

        <section
          id="features"
          className="border-t border-border/70 bg-background px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
              Everything you need to chat with AI
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <article
                  key={feature.id}
                  className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-colors hover:border-foreground/20"
                >
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/get-started"
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
              >
                Try Web App Free
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
