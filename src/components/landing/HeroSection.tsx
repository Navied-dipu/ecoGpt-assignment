"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { AI_MODELS } from "@/lib/models";

export const CHROME_STORE_URL = "https://chromewebstore.google.com/";

interface StatItem {
  readonly id: string;
  readonly label: string;
  readonly value: number | null;
  readonly suffix?: string;
  readonly decimals?: number;
}

const STAT_ITEMS: readonly StatItem[] = [
  { id: "users", label: "Users", value: 10000, suffix: "+" },
  { id: "models", label: "AI Models", value: 5, suffix: "+" },
  { id: "rating", label: "Rating", value: 4.9, suffix: "★", decimals: 1 },
  { id: "pricing", label: "Free to Start", value: null },
];

const CHAT_MODELS = AI_MODELS.map((model) => ({
  name: model.name,
  tone: model.accent.gradient,
}));

const MESSAGES = [
  {
    id: "q1",
    from: "user" as const,
    text: "Draft a release note for our Chrome extension.",
  },
  {
    id: "a1",
    from: "GPT-4o" as const,
    text: "Here is a tight version: faster sidebar, fewer bugs, one-click page summaries.",
  },
  {
    id: "a2",
    from: "Claude 3.5" as const,
    text: "Shorter still: “Faster sidebar, fewer bugs, one-click summaries — out now.”",
  },
];

const GRADIENT_STYLE = {
  backgroundImage:
    "linear-gradient(120deg, #7c3aed 0%, #4f46e5 35%, #2563eb 60%, #06b6d4 100%)",
  backgroundSize: "200% 200%",
} as const;

function useCountUp(target: number, active: boolean, duration = 1500) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!active) return;

    if (reduceMotion) {
      setValue(target);
      return;
    }

    setValue(0);
    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, reduceMotion]);

  return value;
}

function ChromeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="11" fill="#fff" />
      <path
        d="M12 1a11 11 0 0 1 9.53 5.5H12a5.5 5.5 0 0 0-4.9 2.98L4.06 4.4A11 11 0 0 1 12 1z"
        fill="#ea4335"
      />
      <path
        d="M3.36 5.62 8.1 13.48a5.5 5.5 0 0 0 7.8-6.66L12 12l-3.1 5.36a11 11 0 0 1-5.54-11.74z"
        fill="#fbbc05"
      />
      <path
        d="M23 12a11 11 0 0 1-17.9 8.5L8.1 13.48a5.5 5.5 0 0 0 7.8 6.66L12 12h11z"
        fill="#34a853"
      />
      <circle cx="12" cy="12" r="4" fill="#4285f4" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute -inset-x-1/4 top-[-20%] h-[70vh] w-[120%] animate-gradient-pan opacity-60 blur-3xl dark:opacity-35"
        style={GRADIENT_STYLE}
      />
      <div
        className="absolute -left-24 top-24 h-72 w-72 animate-float rounded-full bg-violet-500/30 blur-3xl dark:bg-violet-500/20"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute -right-16 top-10 h-80 w-80 animate-float rounded-full bg-cyan-400/30 blur-3xl dark:bg-cyan-400/20"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-64 w-64 animate-drift-x rounded-full bg-blue-500/25 blur-3xl dark:bg-blue-500/20"
        style={{ animationDelay: "-6s" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_35%,var(--background)_100%)]" />
    </div>
  );
}

function ShimmerBadge() {
  return (
    <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-white/5 sm:text-sm">
      <span className="relative z-10">✨ Multi-AI Chat Platform</span>
      <span className="absolute inset-0 -z-0 animate-sheen bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </span>
  );
}

function Stat({ item, active }: { item: StatItem; active: boolean }) {
  const count = useCountUp(item.value ?? 0, active && item.value !== null);

  if (item.value === null) {
    return (
      <li className="flex items-center gap-2 text-sm font-medium text-foreground/80 sm:text-base">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
        {item.label}
      </li>
    );
  }

  const formatted =
    item.decimals === undefined
      ? Math.round(count).toLocaleString("en-US")
      : count.toFixed(item.decimals);

  return (
    <li className="flex items-center gap-2 text-sm font-medium text-foreground/80 sm:text-base">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
      <span className="tabular-nums text-foreground">
        {formatted}
        {item.suffix}
      </span>
      {item.label}
    </li>
  );
}

function ChatPreview() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background/70 backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-border/70 bg-muted/40 px-3 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-md bg-background/80 px-3 py-1 text-[10px] text-muted-foreground sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          echogpt.app/chat
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-40 shrink-0 flex-col gap-1 border-r border-border/70 p-3 sm:flex">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Models
          </p>
          {CHAT_MODELS.map((model, index) => (
            <div
              key={model.name}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs",
                index === 0
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "h-4 w-4 rounded-full bg-gradient-to-br",
                  model.tone,
                )}
                aria-hidden="true"
              />
              {model.name}
            </div>
          ))}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-5">
          {MESSAGES.map((message) => {
            const isUser = message.from === "user";

            return (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col gap-1",
                  isUser ? "items-end" : "items-start",
                )}
              >
                {!isUser ? (
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {message.from}
                  </span>
                ) : null}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed sm:text-sm",
                    isUser
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-muted text-foreground",
                  )}
                >
                  {message.text}
                </div>
              </div>
            );
          })}

          <div className="mt-auto flex items-center gap-2 rounded-xl border border-border bg-background/80 px-3 py-2.5">
            <span className="flex-1 truncate text-xs text-muted-foreground">
              Ask any model…
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-[10px] font-semibold text-primary-foreground">
              ↵
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowserMockup() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="animate-rise-in relative motion-reduce:animate-none"
      style={{ animationDelay: "520ms" }}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-violet-500/30 via-blue-500/20 to-cyan-400/30 blur-2xl dark:from-violet-500/20 dark:via-blue-500/10 dark:to-cyan-400/20"
      />
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="overflow-hidden rounded-2xl border border-border/80 bg-background/70 shadow-2xl shadow-black/10 backdrop-blur-xl dark:shadow-black/50 sm:rounded-3xl"
      >
        <ChatPreview />
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const statsRef = useRef<HTMLUListElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });

  return (
    <section
      id="hero"
      className="relative isolate scroll-mt-20 overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8 lg:pt-36"
    >
      <Background />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <div className="animate-rise-in motion-reduce:animate-none">
          <ShimmerBadge />
        </div>

        <h1
          className="mt-6 max-w-4xl animate-rise-in text-balance text-4xl font-bold leading-[1.1] tracking-tight motion-reduce:animate-none sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Chat with Every AI, In One Place
        </h1>

        <p
          className="mt-5 max-w-2xl animate-rise-in text-balance text-base text-muted-foreground motion-reduce:animate-none sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          EchoGPT brings GPT-4, Gemini, Claude and more into a single beautiful
          interface. On the web and in your browser.
        </p>

        <div
          className="mt-8 flex w-full animate-rise-in flex-col items-stretch justify-center gap-3 motion-reduce:animate-none sm:w-auto sm:flex-row sm:items-center"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            href="/#pricing"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 px-7 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-100"
          >
            Try Web App Free
          </Link>
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-7 text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            <ChromeIcon className="h-5 w-5 rounded-full" />
            Add to Chrome
          </a>
        </div>

        <ul
          ref={statsRef}
          className="mt-10 flex animate-rise-in flex-wrap items-center justify-center gap-x-6 gap-y-3 motion-reduce:animate-none sm:gap-x-8"
          style={{ animationDelay: "320ms" }}
        >
          {STAT_ITEMS.map((item) => (
            <Stat key={item.id} item={item} active={statsInView} />
          ))}
        </ul>

        <div className="mt-14 w-full sm:mt-20">
          <BrowserMockup />
        </div>

        <motion.a
          href="#features"
          aria-label="Scroll to features"
          className="mt-12 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 sm:mt-16"
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDownIcon className="h-5 w-5" />
        </motion.a>
      </div>
    </section>
  );
}

export default HeroSection;
