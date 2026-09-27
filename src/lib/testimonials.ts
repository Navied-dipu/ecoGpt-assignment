export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly initials: string;
  readonly rating: number;
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "ayesha",
    quote:
      "I used to keep four browser tabs open to compare models. Now I send one prompt and read four answers without leaving the page.",
    name: "Ayesha Rahman",
    role: "Product manager",
    initials: "AR",
    rating: 5,
  },
  {
    id: "daniel",
    quote:
      "The summarize and explain tools are what made me keep it. The extension feels like a superpower on a long research day.",
    name: "Daniel Kovač",
    role: "Frontend developer",
    initials: "DK",
    rating: 5,
  },
  {
    id: "marta",
    quote:
      "Switching between Claude and GPT with the context intact changed how our team reviews drafts. It is a small thing that adds up fast.",
    name: "Marta Silva",
    role: "Research lead",
    initials: "MS",
    rating: 4,
  },
];
