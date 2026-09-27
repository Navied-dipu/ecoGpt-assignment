"use client";

import { motion } from "framer-motion";

import { useRevealVariants } from "@/lib/motion";

import { SectionHeading } from "./SectionHeading";

interface Reason {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

const REASONS: readonly Reason[] = [
  {
    id: "one-window",
    index: "01",
    title: "One window for every model",
    description:
      "Six frontier models behind a single composer. Compare replies side by side instead of juggling six browser tabs.",
  },
  {
    id: "private",
    index: "02",
    title: "Private by default",
    description:
      "No third-party trackers, no ad profiles, and your conversations are never used to train a model.",
  },
  {
    id: "where-you-work",
    index: "03",
    title: "It works where you already work",
    description:
      "Use the responsive web app on desktop or mobile, or press Ctrl+Shift+E from any Chrome tab.",
  },
  {
    id: "actionable",
    index: "04",
    title: "Answers you can act on",
    description:
      "Summarize a long report, explain a paragraph you do not understand, and keep the source context in view.",
  },
];

export function WhyChooseSection() {
  const variants = useRevealVariants();

  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="relative scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={variants.container}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeading
          id="why"
          label="Why EchoGPT"
          title="Why people switch to EchoGPT"
          description="The reasons that keep coming up in every review and every team chat."
          labelClassName="from-emerald-600 via-cyan-600 to-blue-600"
        />

        <motion.ul
          variants={variants.container}
          className="mt-14 grid gap-x-10 gap-y-8 sm:mt-16 lg:grid-cols-2"
        >
          {REASONS.map((reason) => (
            <motion.li
              key={reason.id}
              variants={variants.card}
              className="motion-reveal border-t border-border pt-6"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="font-mono text-sm font-semibold text-muted-foreground"
                >
                  {reason.index}
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}

export default WhyChooseSection;
