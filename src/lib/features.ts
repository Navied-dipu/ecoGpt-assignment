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
    description: "Select any text on the web and get an instant explanation",
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
