export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "models",
    question: "Which AI models can I use?",
    answer:
      "EchoGPT currently gives you access to GPT-4o, Gemini Pro, Claude 3.5, Llama 3, Mistral and Grok. New models are added as soon as their providers release them.",
  },
  {
    id: "install",
    question: "Do I have to install anything?",
    answer:
      "No. The web app runs in any modern browser on desktop and mobile. The Chrome extension is optional and adds the sidebar, the page summarizer and the text explainer.",
  },
  {
    id: "privacy",
    question: "Is my data private?",
    answer:
      "Yes. There is no third-party tracking and no advertising profile. Your conversations stay yours and are never used to train a model. You can delete your history at any time.",
  },
  {
    id: "context",
    question: "Can I switch models mid-conversation?",
    answer:
      "That is the whole point. Change the model in one click and the conversation context comes with you, so you can compare how two models approach the same problem.",
  },
  {
    id: "cost",
    question: "What does it cost?",
    answer:
      "The Free plan is free forever. Pro is $15 per month or $12 per month billed yearly, and Team starts at $29 per user per month. You can cancel whenever you want.",
  },
  {
    id: "shortcut",
    question: "How do I open EchoGPT from any tab?",
    answer:
      "Install the Chrome extension and press Ctrl+Shift+E. EchoGPT opens as a sidebar next to whatever you are reading, with the page context already attached.",
  },
];
