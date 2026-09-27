"use client";

import { motion } from "framer-motion";

import { FEATURES } from "@/lib/features";
import { useRevealVariants } from "@/lib/motion";

import { SectionHeading } from "./SectionHeading";

export function FeaturesSection() {
  const variants = useRevealVariants();

  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="relative scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          id="features"
          label="Features"
          title="Everything you need in one AI platform"
          description="Six tools that turn any browser tab into a faster, smarter workspace — powered by the AI models you already use."
        />

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={variants.container}
          className="mt-14 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-6 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <motion.li
              key={feature.id}
              variants={variants.card}
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
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default FeaturesSection;
