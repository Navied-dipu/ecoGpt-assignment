"use client";

import { motion } from "framer-motion";

import { useRevealVariants } from "@/lib/motion";
import { AI_MODELS } from "@/lib/models";
import type { AIModel } from "@/lib/models";

import { SectionHeading } from "./SectionHeading";

function ModelAvatar({ model, size }: { model: AIModel; size: "sm" | "lg" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl font-semibold tracking-tight ${model.accent.avatar} ${
        size === "lg" ? "h-12 w-12 text-base" : "h-8 w-8 text-xs"
      }`}
    >
      {model.initials}
    </span>
  );
}

function ModelTicker() {
  return (
    <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee items-center motion-reduce:animate-none hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex shrink-0 items-center gap-3 pr-3"
          >
            {AI_MODELS.map((model) => (
              <li
                key={`${copy}-${model.id}`}
                className="flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 backdrop-blur-md dark:bg-white/5"
              >
                <ModelAvatar model={model} size="sm" />
                <span className="text-sm font-medium">{model.name}</span>
                <span className="text-xs text-muted-foreground">
                  {model.provider}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function AIModelsSection() {
  const variants = useRevealVariants();

  return (
    <section
      id="models"
      aria-labelledby="models-title"
      className="relative scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          id="models"
          label="Supported Models"
          title="All your favorite AIs, one interface"
          description="No more switching tabs. Access every major AI model from EchoGPT."
          labelClassName="from-blue-600 via-violet-600 to-cyan-500"
        />

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={variants.container}
          className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {AI_MODELS.map((model) => (
            <motion.li
              key={model.id}
              variants={variants.card}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`motion-reveal relative isolate overflow-hidden rounded-3xl border border-border bg-background p-6 shadow-sm transition-colors duration-300 hover:shadow-xl dark:bg-white/5 sm:p-7 ${model.accent.border} ${model.accent.glow}`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${model.accent.gradient}`}
              />

              <div className="flex items-center gap-3">
                <ModelAvatar model={model} size="lg" />
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold tracking-tight sm:text-lg">
                    {model.name}
                  </h3>
                  <p className="truncate text-xs text-muted-foreground sm:text-sm">
                    {model.provider}
                  </p>
                </div>
              </div>

              <p
                className={`mt-5 inline-flex rounded-full px-3 py-1 text-xs font-medium ${model.accent.tag}`}
              >
                {model.capability}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        <ModelTicker />
      </div>
    </section>
  );
}

export default AIModelsSection;
