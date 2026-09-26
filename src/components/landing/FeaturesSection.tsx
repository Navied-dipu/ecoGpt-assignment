"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

export interface Feature {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly gradient: string;
}

export const FEATURES: readonly Feature[] = [
  {
    id: "multi-model-chat",
    icon: "🤖",
    title: "Multi-Model Chat",
    description:
      "Switch between GPT-4, Gemini, Claude and more without losing context",
    gradient: "from-violet-500 to-blue-500",
  },
  {
    id: "webpage-summarizer",
    icon: "🌐",
    title: "Webpage Summarizer",
    description: "Summarize any article or page in seconds with one click",
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    id: "text-explainer",
    icon: "💡",
    title: "Text Explainer",
    description:
      "Select any text on the web and get an instant explanation",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: "secure-private",
    icon: "🔒",
    title: "Secure & Private",
    description: "No third-party tracking. Your data stays yours.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "keyboard-shortcuts",
    icon: "⌨️",
    title: "Keyboard Shortcuts",
    description: "Open EchoGPT instantly with Ctrl+Shift+E from any tab",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    id: "dark-mode",
    icon: "🌙",
    title: "Dark Mode",
    description: "Easy on the eyes, day or night",
    gradient: "from-indigo-500 to-purple-500",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <motion.li
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="motion-reveal group relative isolate rounded-3xl"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-violet-500/70 via-blue-500/60 to-cyan-400/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 -z-10 rounded-[2rem] bg-gradient-to-br from-violet-500/40 via-blue-500/30 to-cyan-400/40 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
      />

      <div className="relative h-full rounded-3xl border border-white/60 bg-white/60 p-5 backdrop-blur-md transition-colors duration-300 group-hover:border-white/80 dark:border-white/10 dark:bg-white/5 dark:group-hover:border-white/20 sm:p-7">
        <span
          aria-hidden="true"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-xl shadow-lg shadow-black/10 dark:shadow-black/40 sm:h-12 sm:w-12 sm:text-2xl`}
        >
          {feature.icon}
        </span>

        <h3 className="mt-4 text-sm font-semibold tracking-tight sm:mt-5 sm:text-base lg:text-lg">
          {feature.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {feature.description}
        </p>
      </div>
    </motion.li>
  );
}

export function FeaturesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="relative scroll-mt-20 border-t border-border/70 bg-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-transparent">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500/60"
            />
            <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text">
              Features
            </span>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500/60"
            />
          </p>

          <h2
            id="features-title"
            className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Everything you need in one AI platform
          </h2>

          <p className="mt-4 text-balance text-base text-muted-foreground sm:text-lg">
            Six tools that turn any browser tab into a faster, smarter workspace —
            powered by the AI models you already use.
          </p>
        </div>

        <motion.ul
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="mt-14 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-6 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default FeaturesSection;
