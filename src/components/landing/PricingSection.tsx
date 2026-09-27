"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { useRevealVariants } from "@/lib/motion";
import { PRICING_PLANS } from "@/lib/pricing";
import type { PricingPlan } from "@/lib/pricing";

import { SectionHeading } from "./SectionHeading";

type BillingCycle = "monthly" | "yearly";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 10.5 8 14.5 16 6" />
    </svg>
  );
}

function PlanCard({
  plan,
  cycle,
  cardVariants,
}: {
  plan: PricingPlan;
  cycle: BillingCycle;
  cardVariants: Variants;
}) {
  const price = cycle === "yearly" ? plan.yearly : plan.monthly;

  return (
    <motion.li
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`motion-reveal relative flex h-full flex-col rounded-3xl border p-6 backdrop-blur-md sm:p-7 ${
        plan.highlighted
          ? "border-foreground/20 bg-foreground/[0.04] shadow-xl shadow-black/5 dark:bg-white/10"
          : "border-border bg-background/60 dark:bg-white/5"
      }`}
    >
      {plan.highlighted ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
          Most popular
        </span>
      ) : null}

      <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{plan.blurb}</p>

      <p className="mt-6 flex items-end gap-1.5">
        <span className="text-4xl font-bold tracking-tight tabular-nums">
          ${price}
        </span>
        <span className="pb-1.5 text-sm text-muted-foreground">
          {price === 0 ? "forever" : "/ month"}
        </span>
      </p>
      {price > 0 ? (
        <p className="mt-1 text-xs text-muted-foreground">
          {cycle === "yearly"
            ? "Billed yearly — 20% off"
            : "Billed monthly, cancel anytime"}
        </p>
      ) : (
        <p className="mt-1 text-xs text-muted-foreground">No card required</p>
      )}

      <ul className="mt-6 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <CheckIcon
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                plan.highlighted
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/#preview"
        className={`mt-8 inline-flex h-11 w-full items-center justify-center rounded-full px-6 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 ${
          plan.highlighted
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-background/60 text-foreground"
        }`}
      >
        {price === 0 ? "Start free" : `Choose ${plan.name}`}
      </Link>
    </motion.li>
  );
}

export function PricingSection() {
  const [cycle, setCycle] = useState<BillingCycle>("yearly");
  const variants = useRevealVariants();

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={variants.container}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeading
          id="pricing"
          label="Pricing"
          title="Simple plans that scale with you"
          description="Start free, upgrade when you need more models. Cancel whenever you want."
          labelClassName="from-violet-600 via-blue-600 to-cyan-500"
        >
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-background/70 p-1 backdrop-blur-md">
            {(["monthly", "yearly"] as const).map((option) => {
              const selected = option === cycle;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCycle(option)}
                  aria-pressed={selected}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 ${
                    selected
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {selected ? (
                    <motion.span
                      layoutId="pricing-cycle-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {option === "monthly" ? "Monthly" : "Yearly"}
                  {option === "yearly" ? (
                    <span className="ml-1.5 text-[10px] uppercase tracking-wide opacity-80">
                      -20%
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </SectionHeading>

        <motion.ul
          variants={variants.container}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-start"
        >
          {PRICING_PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              cycle={cycle}
              cardVariants={variants.card}
            />
          ))}
        </motion.ul>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Prices are placeholders for this build — update them in
          <span className="font-mono"> src/lib/pricing.ts</span> before launch.
        </p>
      </motion.div>
    </section>
  );
}

export default PricingSection;
