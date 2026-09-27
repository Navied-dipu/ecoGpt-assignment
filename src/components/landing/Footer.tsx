import Link from "next/link";

const PRODUCT_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "AI Models", href: "/#models" },
  { label: "Product Preview", href: "/#preview" },
  { label: "Why EchoGPT", href: "/#why" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
] as const;

const MODEL_LINKS = [
  "GPT-4o",
  "Gemini Pro",
  "Claude 3.5",
  "Llama 3",
  "Mistral",
  "Grok",
] as const;

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <path
        d="M10 12.5a4.5 4.5 0 0 0 0 7"
        stroke="currentColor"
        className="text-primary-foreground"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M15 10a7 7 0 0 0 0 12"
        stroke="currentColor"
        className="text-primary-foreground"
        strokeWidth="2.25"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M20 13.5a3 3 0 0 1 0 5"
        stroke="currentColor"
        className="text-primary-foreground"
        strokeWidth="2.25"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background/80 px-4 pb-10 pt-14 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/#hero"
              className="inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            >
              <LogoMark className="h-8 w-8 text-foreground" />
              <span className="text-base font-semibold tracking-tight">EchoGPT</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              One interface for every frontier AI model. Chat, summarize and explain
              without leaving the page you are on.
            </p>
          </div>

          <nav aria-label="Product">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Product
            </h2>
            <ul className="mt-4 space-y-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Models
            </h2>
            <ul className="mt-4 space-y-2.5">
              {MODEL_LINKS.map((name) => (
                <li key={name}>
                  <Link
                    href="/#models"
                    className="rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Get started
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Free forever for one model. Upgrade when you need all six.
            </p>
            <Link
              href="/#pricing"
              className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            >
              See pricing
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EchoGPT. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
