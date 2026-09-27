import Link from "next/link";

export function CTASection() {
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
          href="/#pricing"
          className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        >
          See pricing
        </Link>
      </div>
    </section>
  );
}
