"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useRevealVariants } from "@/lib/motion";

import { SectionHeading } from "./SectionHeading";

type PreviewId = "chat" | "summarize" | "explain";

interface PreviewTab {
  readonly id: PreviewId;
  readonly label: string;
  readonly title: string;
  readonly description: string;
}

const PREVIEW_TABS: readonly PreviewTab[] = [
  {
    id: "chat",
    label: "Multi-model chat",
    title: "Ask once, compare every model",
    description:
      "Send the same prompt to GPT-4o, Gemini Pro, Claude 3.5 and more, then read the answers side by side without losing the thread.",
  },
  {
    id: "summarize",
    label: "Webpage summarizer",
    title: "Summarize any page in one click",
    description:
      "Long articles become a short, skimmable brief with the key points pulled out first.",
  },
  {
    id: "explain",
    label: "Text explainer",
    title: "Explain anything you select",
    description:
      "Select a sentence on any page and get a plain-language explanation in a popover that never leaves your tab.",
  },
];

function WindowFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-background/80 shadow-2xl shadow-black/10 backdrop-blur-xl dark:bg-white/5 dark:shadow-black/50 sm:rounded-3xl">
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
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

function ChatMock() {
  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]">
      <div className="hidden flex-col gap-1.5 sm:flex">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Comparing
        </p>
        {["GPT-4o", "Gemini Pro", "Claude 3.5", "Grok"].map((name) => (
          <div
            key={name}
            className="flex items-center gap-2 rounded-lg bg-accent/70 px-2 py-1.5 text-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" aria-hidden="true" />
            {name}
          </div>
        ))}
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-xs text-primary-foreground sm:text-sm">
          How do I cut my office energy bill by a third?
        </div>
        <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-xs text-foreground sm:text-sm">
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            GPT-4o
          </span>
          Start with HVAC scheduling and lighting. Together they are usually 55–65% of
          the load, and both are cheap wins.
        </div>
        <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-xs text-foreground sm:text-sm">
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Claude 3.5
          </span>
          Add a heat-pump pilot before committing to a full retrofit — payback is
          usually under four years.
        </div>
      </div>
    </div>
  );
}

function SummarizeMock() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2.5 rounded-2xl border border-border bg-muted/30 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Article
        </p>
        <div className="h-2.5 w-3/4 rounded-full bg-foreground/15" />
        <div className="h-2 w-full rounded-full bg-foreground/10" />
        <div className="h-2 w-11/12 rounded-full bg-foreground/10" />
        <div className="h-2 w-full rounded-full bg-foreground/10" />
        <div className="h-2 w-2/3 rounded-full bg-foreground/10" />
        <div className="pt-1 text-[10px] text-muted-foreground">2,480 words</div>
      </div>

      <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
          Summary
        </p>
        <ul className="mt-3 space-y-2.5">
          {[
            "Heat pumps now beat gas in 80% of EU homes.",
            "Payback window dropped to under 4 years.",
            "Grid carbon intensity fell 12% year on year.",
          ].map((line) => (
            <li key={line} className="flex gap-2 text-xs text-foreground sm:text-sm">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500"
                aria-hidden="true"
              />
              {line}
            </li>
          ))}
        </ul>
        <span className="mt-4 inline-flex items-center rounded-full bg-foreground px-3 py-1 text-[10px] font-medium text-background">
          Copy brief
        </span>
      </div>
    </div>
  );
}

function ExplainMock() {
  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
        Grid operators balance supply and demand in real time, using
        <span className="mx-1 rounded bg-violet-500/20 px-1.5 py-0.5 font-medium text-foreground ring-1 ring-inset ring-violet-500/30">
          frequency response
        </span>
        to keep the system inside safe limits.
      </p>

      <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
          EchoGPT
        </p>
        <p className="mt-2 text-xs leading-relaxed text-foreground sm:text-sm">
          Batteries that respond within seconds are paid to help the grid. Your
          device charges when power is cheap or plentiful, and sells back when
          demand spikes.
        </p>
      </div>
    </div>
  );
}

const PREVIEW_MOCKS: Record<PreviewId, () => React.JSX.Element> = {
  chat: ChatMock,
  summarize: SummarizeMock,
  explain: ExplainMock,
};

export function ProductPreviewSection() {
  const [active, setActive] = useState<PreviewId>("chat");
  const variants = useRevealVariants();
  const tab = PREVIEW_TABS.find((item) => item.id === active) ?? PREVIEW_TABS[0];
  const Mock = PREVIEW_MOCKS[tab.id];

  return (
    <section
      id="preview"
      aria-labelledby="preview-title"
      className="relative scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={variants.container}
        className="mx-auto w-full max-w-5xl"
      >
        <SectionHeading
          id="preview"
          label="Product Preview"
          title="See it working before you install anything"
          description="Three tools, one interface. Switch between them to preview the real product."
          labelClassName="from-cyan-600 via-blue-600 to-violet-600"
        />

        <motion.div
          variants={variants.card}
          className="motion-reveal mt-12"
          role="tablist"
          aria-label="Product preview"
        >
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
            {PREVIEW_TABS.map((item) => {
              const selected = item.id === active;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`preview-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={`preview-panel-${item.id}`}
                  onClick={() => setActive(item.id)}
                  className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 ${
                    selected
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {selected ? (
                    <motion.span
                      layoutId="preview-tab-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {item.label}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`preview-panel-${tab.id}`}
            aria-labelledby={`preview-tab-${tab.id}`}
            className="mt-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <WindowFrame>
                  <div className="min-h-[16rem] sm:min-h-[15rem]">
                    <Mock />
                  </div>
                </WindowFrame>

                <div className="mt-6 text-center">
                  <h3 className="text-base font-semibold sm:text-lg">{tab.title}</h3>
                  <p className="mx-auto mt-2 max-w-xl text-balance text-sm text-muted-foreground">
                    {tab.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ProductPreviewSection;
