export interface ModelAccent {
  readonly avatar: string;
  readonly gradient: string;
  readonly glow: string;
  readonly border: string;
  readonly tag: string;
}

export interface AIModel {
  readonly id: string;
  readonly name: string;
  readonly provider: string;
  readonly initials: string;
  readonly capability: string;
  readonly accent: ModelAccent;
}

export const AI_MODELS: readonly AIModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    initials: "G4",
    capability: "Best for coding",
    accent: {
      avatar:
        "bg-emerald-500/10 text-emerald-600 ring-1 ring-inset ring-emerald-500/25 dark:text-emerald-400",
      gradient: "from-emerald-500 to-teal-500",
      glow: "hover:shadow-emerald-500/30",
      border: "hover:border-emerald-500/40",
      tag: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    },
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    initials: "Ge",
    capability: "Best for long context",
    accent: {
      avatar:
        "bg-blue-500/10 text-blue-600 ring-1 ring-inset ring-blue-500/25 dark:text-blue-400",
      gradient: "from-blue-500 to-indigo-500",
      glow: "hover:shadow-blue-500/30",
      border: "hover:border-blue-500/40",
      tag: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    },
  },
  {
    id: "claude-3-5",
    name: "Claude 3.5",
    provider: "Anthropic",
    initials: "C3",
    capability: "Best for long-form writing",
    accent: {
      avatar:
        "bg-orange-500/10 text-orange-600 ring-1 ring-inset ring-orange-500/25 dark:text-orange-400",
      gradient: "from-orange-500 to-amber-500",
      glow: "hover:shadow-orange-500/30",
      border: "hover:border-orange-500/40",
      tag: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
    },
  },
  {
    id: "llama-3",
    name: "Llama 3",
    provider: "Meta",
    initials: "L3",
    capability: "Best for private, on-device use",
    accent: {
      avatar:
        "bg-violet-500/10 text-violet-600 ring-1 ring-inset ring-violet-500/25 dark:text-violet-400",
      gradient: "from-violet-500 to-purple-500",
      glow: "hover:shadow-violet-500/30",
      border: "hover:border-violet-500/40",
      tag: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
    },
  },
  {
    id: "mistral",
    name: "Mistral",
    provider: "Mistral AI",
    initials: "Mi",
    capability: "Best for speed and cost",
    accent: {
      avatar:
        "bg-teal-500/10 text-teal-600 ring-1 ring-inset ring-teal-500/25 dark:text-teal-400",
      gradient: "from-teal-500 to-cyan-500",
      glow: "hover:shadow-teal-500/30",
      border: "hover:border-teal-500/40",
      tag: "bg-teal-500/10 text-teal-700 dark:text-teal-300",
    },
  },
  {
    id: "grok",
    name: "Grok",
    provider: "xAI",
    initials: "X",
    capability: "Best for live web trends",
    accent: {
      avatar:
        "bg-zinc-500/10 text-zinc-600 ring-1 ring-inset ring-zinc-500/25 dark:text-zinc-300",
      gradient: "from-zinc-500 to-slate-500",
      glow: "hover:shadow-zinc-500/30",
      border: "hover:border-zinc-500/40",
      tag: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-200",
    },
  },
];
