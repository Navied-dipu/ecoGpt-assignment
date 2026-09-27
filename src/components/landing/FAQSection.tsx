"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FAQ_ITEMS } from "@/lib/faq";
import { useRevealVariants } from "@/lib/motion";

import { SectionHeading } from "./SectionHeading";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const variants = useRevealVariants();

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={variants.container}
        className="mx-auto w-full max-w-3xl"
      >
        <SectionHeading
          id="faq"
          label="FAQ"
          title="Questions, answered"
          description="Everything people ask before they switch."
          labelClassName="from-blue-600 via-cyan-600 to-emerald-600"
        />

        <motion.ul
          variants={variants.container}
          className="motion-reveal mt-12 divide-y divide-border border-y border-border"
        >
          {FAQ_ITEMS.map((item) => {
            const open = openId === item.id;

            return (
              <motion.li key={item.id} variants={variants.card}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : item.id)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${item.id}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-medium transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 sm:text-base"
                  >
                    {item.question}
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border"
                    >
                      <span className="absolute h-0.5 w-2.5 rounded-full bg-current" />
                      <span className="absolute h-2.5 w-0.5 rounded-full bg-current" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key="panel"
                      id={`faq-panel-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </section>
  );
}

export default FAQSection;
