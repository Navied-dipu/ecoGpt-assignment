export interface PricingPlan {
  readonly id: string;
  readonly name: string;
  readonly blurb: string;
  readonly monthly: number;
  readonly yearly: number;
  readonly features: readonly string[];
  readonly highlighted: boolean;
}

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    blurb: "Everything you need to try EchoGPT.",
    monthly: 0,
    yearly: 0,
    features: [
      "1 AI model at a time",
      "Unlimited messages",
      "Web app on desktop and mobile",
      "7-day conversation history",
      "Community support",
    ],
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    blurb: "Every model, every tool, no limits.",
    monthly: 15,
    yearly: 12,
    features: [
      "All 6 AI models in one inbox",
      "Side-by-side answer comparison",
      "Chrome extension with Ctrl+Shift+E",
      "Webpage summarizer and text explainer",
      "90-day conversation history",
      "Priority routing and support",
    ],
    highlighted: true,
  },
  {
    id: "team",
    name: "Team",
    blurb: "Shared workspaces for small teams.",
    monthly: 29,
    yearly: 24,
    features: [
      "Everything in Pro",
      "Shared team workspaces",
      "Centralized billing and seats",
      "Team usage analytics",
      "SSO and admin controls",
      "Dedicated support channel",
    ],
    highlighted: false,
  },
];
