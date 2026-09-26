import Link from "next/link";

import { Navbar } from "@/components/landing/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 pb-24 pt-40 text-center sm:px-6 sm:pt-48 lg:px-8">
        <p className="rounded-full border border-border bg-muted px-4 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          EchoGPT
        </p>
        <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Clear answers for a greener planet
        </h1>
        <p className="max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
          Ask anything about climate, energy, waste, or sustainability and get
          practical guidance in plain language.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/get-started"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            Get Started
          </Link>
          <Link
            href="/features"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            See what it does
          </Link>
        </div>
      </main>
    </div>
  );
}
