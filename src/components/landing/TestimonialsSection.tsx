"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { useRevealVariants } from "@/lib/motion";
import { TESTIMONIALS } from "@/lib/testimonials";
import type { Testimonial } from "@/lib/testimonials";

import { SectionHeading } from "./SectionHeading";

function Stars({ rating }: { rating: number }) {
  return (
    <p className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={`text-sm ${
            index < rating ? "text-amber-500" : "text-muted-foreground/30"
          }`}
        >
          ★
        </span>
      ))}
    </p>
  );
}

function TestimonialCard({
  item,
  cardVariants,
}: {
  item: Testimonial;
  cardVariants: Variants;
}) {
  return (
    <motion.li
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="motion-reveal flex h-full flex-col rounded-3xl border border-border bg-background/60 p-6 backdrop-blur-md transition-colors hover:border-foreground/20 dark:bg-white/5 sm:p-7"
    >
      <Stars rating={item.rating} />

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground sm:text-base">
        “{item.quote}”
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-xs font-semibold text-white"
        >
          {item.initials}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium">
            {item.name}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {item.role}
          </span>
        </span>
      </figcaption>
    </motion.li>
  );
}

export function TestimonialsSection() {
  const variants = useRevealVariants();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
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
          id="testimonials"
          label="Testimonials"
          title="Loved by people who read a lot"
          description="Placeholder quotes for this build — swap in real reviews before launch."
          labelClassName="from-amber-600 via-rose-600 to-violet-600"
        />

        <motion.ul
          variants={variants.container}
          className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((item) => (
            <TestimonialCard
              key={item.id}
              item={item}
              cardVariants={variants.card}
            />
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}

export default TestimonialsSection;
