# EchoGPT — Web

**Live site:** **[https://ecogptlp.vercel.app](https://ecogptlp.vercel.app)**

Marketing site and web client for **EchoGPT** — a multi-model AI assistant that puts
GPT-4o, Gemini Pro, Claude 3.5, Llama 3, Mistral and Grok behind a single interface, on
the web and in a Chrome extension. Built with Next.js 14 (App Router), TypeScript,
Tailwind CSS and Framer Motion, and deployed on Vercel.

---

## Overview

**The problem.** Comparing AI models today means opening one browser tab per vendor,
re-pasting the same prompt, and losing the thread when you switch. Every assistant also
lives in its own UI with its own tone, its own history and its own idea of privacy.

**The product.** EchoGPT is one interface in front of every major model. You ask once,
read several answers side by side, and switch models without losing context — plus two
companion tools that work on the page you are already reading (one-click page summaries
and instant explanations for selected text).

**Who it is for.** Researchers, developers, writers and small teams who read a lot, compare
a lot, and do not want to hand their reading habits to six vendors at once.

**What the product promises (as marketed on the page):**

- Multi-model chat across six frontier models, with side-by-side comparison.
- Webpage summarizer — turn a long article into a short brief.
- Text explainer — select text on any page, get a plain-language explanation.
- Secure and private — no third-party tracking, conversations are never used for training.
- Keyboard shortcut — `Ctrl+Shift+E` from any Chrome tab.
- Dark mode, light or dark, following the system preference.

**Supported models and accent colours:**

| Model | Provider | Capability tag | Accent |
| --- | --- | --- | --- |
| GPT-4o | OpenAI | Best for coding | emerald |
| Gemini Pro | Google | Best for long context | blue |
| Claude 3.5 | Anthropic | Best for long-form writing | orange |
| Llama 3 | Meta | Best for private, on-device use | violet |
| Mistral | Mistral AI | Best for speed and cost | teal |
| Grok | xAI | Best for live web trends | zinc |

**Plans:** Free (1 model, unlimited messages, 7-day history), Pro (all six models,
extension, 90-day history), Team (shared workspaces, SSO, analytics). Prices live in
`src/lib/pricing.ts` and are currently placeholders.

**This repository contains:** the complete public landing page — navbar, hero, features,
models, product preview, why-us, pricing, FAQ, testimonials, CTA and footer — plus the
design system and content data behind them.

> **Status: complete landing page, no backend yet.** The page is statically generated and
> every navigation target is an in-page anchor. There is no `/api/chat`, no auth and no
> `/chat` route yet; the chat interface in the hero and in the product preview is a
> CSS illustration. See [Known issues and placeholders](#14-known-issues-and-placeholders).

---

## Contents

1. [Quick start](#1-quick-start)
2. [Scripts](#2-scripts)
3. [Tech stack](#3-tech-stack)
4. [How the page works, step by step](#4-how-the-page-works-step-by-step)
5. [Section map](#5-section-map)
6. [Project structure](#6-project-structure)
7. [Design system](#7-design-system)
8. [Architecture and patterns](#8-architecture-and-patterns)
9. [Accessibility and responsiveness](#9-accessibility-and-responsiveness)
10. [How to extend the project](#10-how-to-extend-the-project)
11. [Deployment](#11-deployment)
12. [Contribution rules](#12-contribution-rules)
13. [Troubleshooting](#13-troubleshooting)
14. [Known issues and placeholders](#14-known-issues-and-placeholders)

---

## 1. Quick start

```bash
# 1. install dependencies (Node 18+)
npm install

# 2. start the dev server with hot reload
npm run dev            # http://localhost:3000

# 3. verify before you commit (all three are required by AGENTS.md)
npm run lint           # ESLint (eslint-config-next)
npx tsc --noEmit       # TypeScript, no emit
npm run build          # production build into .next/

# 4. serve the production build locally
npm run start
```

There is no `.env` file and no external service to configure: the site is fully static and
all copy, pricing and model data lives in `src/lib/`.

---

## 2. Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Next dev server with hot reload on port 3000 |
| `npm run build` | Optimized production build + type check + static generation into `.next/` |
| `npm run start` | Serves the production build (run `build` first) |
| `npm run lint` | ESLint via `next lint` (config in `.eslintrc.json`) |

On Windows or in one-off runs set `CI=1` (e.g. `$env:CI='1'; npm run build`) so
`next lint` never waits for interactive setup.

---

## 3. Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Hosting | Vercel | zero-config for the Next.js App Router, instant previews per branch |
| Framework | Next.js 14 (App Router) | file-system routing, React Server Components, static generation, per-route metadata |
| Language | TypeScript 5 (`strict`) | typed props and data tables for every section |
| Styling | Tailwind CSS 3.4 | utility-first, themeable through CSS variables |
| Animation | Framer Motion 11 | `whileInView` reveals, `layoutId` pills, `AnimatePresence` |
| CSS animation | Tailwind keyframes | `rise-in`, `float`, `marquee`, `sheen`, `gradient-pan`, … |
| Theming | `next-themes` 0.3 | class-based light/dark/system with no flash on load |
| Class merging | `clsx` + `tailwind-merge` | `cn()` helper in `src/lib/utils.ts` |
| Fonts | `next/font/local` | self-hosted Geist Sans + Geist Mono, no network request |
| Icons | inline SVG / emoji | zero icon-library dependency |

---

## 4. How the page works, step by step

1. **`src/app/layout.tsx` renders the document shell** — `<html lang="en"
   class="scroll-smooth">`, the two Geist font variables on `<body>`, global CSS, the
   `ThemeProvider`, and the page metadata (title, description, `metadataBase` pointing at
   the live domain).
2. **next-themes injects a tiny blocking script** that reads `localStorage` /
   `prefers-color-scheme` and puts the `dark` class on `<html>` *before* paint, so there
   is no light-to-dark flash.
3. **`src/app/page.tsx` composes the page** — the navbar outside `<main>`, the nine
   sections separated by gradient dividers, then the `<Footer>`.
4. **`page.tsx` is a Server Component.** It is rendered on the server at build time and
   ships finished HTML. Only the interactive leaves are `"use client"` (navbar, hero and
   the card/accordion/tab sections), so most of the page is static HTML.
5. **Hydration** — the client components attach their scroll listeners, tab state and
   accordions. Entrance animations that depend on `IntersectionObserver` are driven by
   Framer Motion; the hero's entrance is plain CSS so the hero is never invisible if JS is
   slow.
6. **Scrolling** — the navbar uses Framer's `useScroll` to shrink and add a shadow, and a
   scroll-spy hook marks the section currently in view with an animated underline.
7. **Theming** — the toggle flips the `dark` class; `globals.css` swaps the CSS variables
   and every component follows. The dot-grid background has its own `.dark` variant.

---

## 5. Section map

Rendered in this order, each with an anchor id and `scroll-mt-20` so the fixed navbar
never covers a heading.

| # | id | Component | What it does |
| --- | --- | --- | --- |
| — | — | `Navbar.tsx` | Fixed glass navbar: logo, 5 anchor links, theme toggle, "Get Started", mobile hamburger menu, scroll-spy active underline |
| 1 | `#hero` | `HeroSection.tsx` | Animated purple→cyan gradient, floating orbs, shimmer badge, headline, two CTAs, count-up stats, floating browser mockup, scroll arrow |
| 2 | `#features` | `FeaturesSection.tsx` | Six glass feature cards (2×3 mobile → 3×2 desktop) with emoji tiles, hover lift + gradient glow |
| 3 | `#models` | `AIModelsSection.tsx` | Six model cards with per-model accent color, letter avatar, capability tag, gradient top border, colored hover glow, plus an infinite logo ticker |
| 4 | `#preview` | `ProductPreviewSection.tsx` | Tabbed walkthrough (multi-model chat / webpage summarizer / text explainer), each tab a CSS-drawn window |
| 5 | `#why` | `WhyChooseSection.tsx` | Four numbered differentiators in a hairline-divided grid |
| 6 | `#pricing` | `PricingSection.tsx` | Three plans with a monthly/yearly toggle and a "Most popular" badge |
| 7 | `#faq` | `FAQSection.tsx` | Accessible accordion, one answer open at a time |
| 8 | `#testimonials` | `TestimonialsSection.tsx` | Quote cards with star ratings and gradient initial avatars |
| 9 | — | `CTASection.tsx` | Closing call to action ("See pricing") |
| — | — | `Footer.tsx` | Logo, Product and Models link columns, pricing CTA, copyright bar |

---

## 6. Project structure

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # <html>, fonts, ThemeProvider, metadata
│   │   ├── page.tsx                   # Landing page: all 9 sections + footer
│   │   ├── globals.css                # Tailwind layers, theme vars, dot grid, fallbacks
│   │   ├── favicon.ico
│   │   └── fonts/                     # Self-hosted GeistVF.woff, GeistMonoVF.woff
│   ├── components/
│   │   ├── theme-provider.tsx         # next-themes wrapper ("use client")
│   │   └── landing/
│   │       ├── Navbar.tsx             # Glass navbar, theme toggle, mobile menu, scroll-spy
│   │       ├── HeroSection.tsx        # Gradient, orbs, stats, browser mockup
│   │       ├── FeaturesSection.tsx    # 6 feature cards
│   │       ├── AIModelsSection.tsx    # 6 model cards + marquee ticker
│   │       ├── ProductPreviewSection.tsx # Tabbed product walkthrough
│   │       ├── WhyChooseSection.tsx   # 4 differentiators
│   │       ├── PricingSection.tsx     # Plans + billing cycle toggle
│   │       ├── FAQSection.tsx         # Accordion
│   │       ├── TestimonialsSection.tsx# Quote cards
│   │       ├── CTASection.tsx         # Closing CTA
│   │       ├── SectionHeading.tsx     # Shared eyebrow label + title + subtitle
│   │       ├── SectionDivider.tsx     # Gradient hairline between sections
│   │       └── Footer.tsx             # Site footer
│   └── lib/
│       ├── features.ts                # Feature card copy
│       ├── models.ts                  # Model list + per-model accent classes
│       ├── pricing.ts                 # Plans, prices, feature lists
│       ├── faq.ts                     # Question/answer pairs
│       ├── testimonials.ts            # Quotes, names, ratings
│       ├── motion.ts                  # Shared reveal variants + useRevealVariants()
│       └── utils.ts                   # cn() class-name helper
├── .eslintrc.json                     # next/core-web-vitals + next/typescript
├── .gitignore                         # ignores .next, node_modules, .env*.local
├── AGENTS.md                          # rules every agent/command must follow
├── next.config.mjs                    # default Next config
├── package.json
├── postcss.config.mjs
├── tailwind.config.js                 # theme tokens, keyframes, animations
└── tsconfig.json                      # strict, alias @/* -> ./src/*
```

Path alias: `@/components/landing/Navbar` → `src/components/landing/Navbar`.

---

## 7. Design system

**Theme tokens.** `src/app/globals.css` defines CSS variables for
`--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`,
`--border` and `--radius` in `:root`, and a `.dark` block that overrides all of them.
`tailwind.config.js` maps them to `bg-background`, `text-foreground`, `border-border`, …,
so dark mode is a single class toggle with no per-component `dark:` duplication.

**Dark mode.** `darkMode: ["class"]` + `next-themes` (`attribute="class"`,
`defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`). Components add
`dark:` variants only for translucency (e.g. `bg-white/60 dark:bg-white/5`).

**Fonts.** Geist Sans and Geist Mono are self-hosted through `next/font/local` and exposed
as `--font-geist-sans` / `--font-geist-mono`, then wired to Tailwind's `font-sans` and
`font-mono` so no component needs `font-[family-name:…]`.

**Animation vocabulary** (all defined in `tailwind.config.js`):

| Keyframe | Duration | Used by |
| --- | --- | --- |
| `rise-in` | 0.6s | hero entrance (`animate-rise-in motion-reduce:animate-none`) |
| `gradient-pan` | 14s | hero background gradient |
| `float` / `drift-x` | 9s / 13s | hero orbs |
| `sheen` / `shimmer` | 3.2s / 3.5s | hero badge highlight |
| `marquee` | 38s | model ticker, pauses on hover |

**Glassmorphism.** Navbar `bg-white/80 dark:bg-black/80 backdrop-blur-md`; section cards
`bg-white/60 dark:bg-white/5 backdrop-blur-md`; hero mockup `bg-background/70
backdrop-blur-xl`.

**Page background.** `.bg-dot-grid` — a 22px radial-gradient dot pattern with a `.dark`
override, applied to the page wrapper. `.text-balance` is a small local utility for
balanced headings.

---

## 8. Architecture and patterns

**Server by default.** `page.tsx`, `layout.tsx`, `SectionHeading`, `SectionDivider`,
`CTASection` and `Footer` are Server Components. Anything that needs state, effects or
browser APIs is a separate `"use client"` leaf.

**Data lives in `src/lib/`.** Copy and configuration are plain typed modules
(`FEATURES`, `AI_MODELS`, `PRICING_PLANS`, `FAQ_ITEMS`, `TESTIMONIALS`) so sections stay
presentational and a copy change never touches JSX. Server Components import them
directly; client components import them inside their client boundary.

**Shared reveal animation.** `useRevealVariants()` (in `src/lib/motion.ts`, marked
`"use client"`) returns a container variant (`staggerChildren: 0.09`) and a card variant.
Under `prefers-reduced-motion` it returns an opacity-only card variant, so the y-slide is
never forced on users who asked for less movement.

**Progressive enhancement for scroll reveals.** Anything animated with `whileInView` gets
the `motion-reveal` class, and `globals.css` contains:

```css
@media (scripting: none) {
  .motion-reveal { opacity: 1 !important; transform: none !important; }
}
```

so the content is visible when scripting is disabled. For the same reason the hero's
entrance uses the CSS `rise-in` keyframes rather than Framer's `initial`/`animate`, which
would render the hero as inline `opacity: 0` in the HTML.

**Anchor navigation.** The navbar links to `/#<section>` and a scroll-spy hook
(`useActiveHash`) compares each section's `getBoundingClientRect().top` against a 140px
offset to set `aria-current="location"` and the `layoutId` underline. Smooth scrolling is
`scroll-smooth` on `<html>`, disabled under `prefers-reduced-motion`.

**Tailwind gotcha (important when editing data files).** Color classes stored in
`src/lib/models.ts` must remain *literal strings* — Tailwind scans source text, so
runtime-built class names are dropped. The same applies to `group-hover:` variants: they
are only generated when the `group` marker class exists in the same file, which is why the
model cards use plain `hover:` variants.

**No dead routes.** Every internal link is an in-page anchor, so the site has no 404s. The
only external link is the Chrome Web Store placeholder.

---

## 9. Accessibility and responsiveness

- Landmarks: `<header>` (navbar), `<main>`, `<footer>`; every section is labelled by its
  heading with `aria-labelledby`; footer columns use `<nav aria-label="Product">`.
- Keyboard: visible `focus-visible` rings on every interactive element, `Escape` closes the
  mobile menu, body scroll is locked while it is open, and the menu closes on route change
  and when the viewport reaches desktop width.
- Disclosure widgets: FAQ uses `aria-expanded`/`aria-controls`, the preview uses a proper
  `role="tablist"` / `role="tab"` / `role="tabpanel"` triple, and the pricing toggle uses
  `aria-pressed`.
- Decorative art (`orbs`, marquee duplicate copy, gradient dividers) is `aria-hidden`; the
  duplicated marquee copy is hidden so screen readers hear the model list once.
- Reduced motion: `useReducedMotion()` for Framer, `motion-reduce:animate-none` for CSS
  animations, and `scroll-behavior: auto`.
- Breakpoints: one column on phones (features use 2), two on `sm`, three on `lg`; the
  navbar collapses to an animated hamburger below `md`; the page wrapper is
  `overflow-x-clip` so no section can create horizontal scroll.

---

## 10. How to extend the project

- **Add a section** → create `src/components/landing/XSection.tsx`, give the `<section>` an
  `id` and `scroll-mt-20`, use `SectionHeading` for the eyebrow/title/subtitle, wrap the
  reveal with `useRevealVariants()`, then add `<SectionDivider />` + the component in
  `src/app/page.tsx` and a link in `NAV_LINKS` (`src/components/landing/Navbar.tsx`).
- **Add a model** → append to `AI_MODELS` in `src/lib/models.ts`. The model card, the hero
  chat preview sidebar and the ticker all read from that array. Give it an `accent` with
  literal Tailwind classes.
- **Add a feature** → append to `FEATURES` in `src/lib/features.ts`.
- **Add a plan / FAQ entry / testimonial** → `src/lib/pricing.ts`, `src/lib/faq.ts`,
  `src/lib/testimonials.ts`.
- **Add a color** → add the CSS variable in `src/app/globals.css` (light **and** dark) and
  map it in `tailwind.config.js`.
- **Add an animation** → add a keyframes entry and an animation entry in
  `tailwind.config.js`, then use `animate-<name>`.
- **Change copy** → edit the `lib` data files or the section JSX; the section map (§5) should
  stay in sync.

---

## 11. Deployment

The site is deployed on **Vercel** at **[https://ecogptlp.vercel.app](https://ecogptlp.vercel.app)**
and is built straight from this repository's `main` branch.

| Setting | Value |
| --- | --- |
| Framework preset | Next.js (auto-detected) |
| Build command | `npm run build` |
| Output | `.next` (App Router, all routes statically generated) |
| Node version | 18+ |
| Environment variables | none |
| Regions | default (`iad1`) |

- **Redeploy after a push** — every commit to `main` triggers a Vercel build. Check the
  build status in the Vercel dashboard; the production alias updates when it passes.
- **Preview a branch** — push any other branch and Vercel serves it at a unique preview URL,
  which is the fastest way to review a section before it ships.
- **Local parity check** — `npm run build && npm run start` reproduces the deployed
  behaviour; there is no server-side runtime, so anything that works locally works in
  production.
- **Metadata** — `src/app/layout.tsx` sets `metadataBase` to the live domain, so Open Graph
  and favicon URLs resolve absolutely. Update it if the domain changes.
- **Custom domain** — add the domain in Vercel's *Settings → Domains*; no code change is
  needed, but remember to update `metadataBase`.

---

## 12. Contribution rules

`AGENTS.md` is the contract for anyone (human or agent) working in this repo:

1. **Commit and push after every task** — never leave finished work uncommitted; stage
   only task-related files, one task = one commit, then `git push`.
2. **Verify before commit** — `npm run lint`, `npx tsc --noEmit`, `npm run build`.
3. **Self-review loop** — re-read the requirement, hunt for bugs (edge cases, null safety,
   a11y, mobile layout, stale state, types), fix, re-verify, repeat until a pass is clean.
4. **Report** — what changed, verification results, findings fixed, commit hash.

Code conventions: no `any`, no unused variables, no leftover `console.log`, follow
neighboring file style, and do not add code comments unless asked.

---

## 13. Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| `next build` fails with `v.hasStartTime is not a function` | Corrupted webpack cache. Delete `.next` and rebuild. |
| Build worker exits with `3221225477` | Interrupted or concurrent build. Stop `next dev` / `next start` first, then `npm run build`. |
| `Failed to read source code from …node_modules]next…` | Same cache problem; `Remove-Item -Recurse -Force .next` (or `rm -rf .next`). |
| `next lint` hangs waiting for input | Run `npm install` first, or set `CI=1`. |
| A color/hover style does nothing | The class was built at runtime or is a `group-hover:` variant without a `group` marker in the same file. Use a literal class. |
| Section invisible with JS disabled | Wrap it in `motion-reveal` (see §8). |
| Port 3000 already in use | Stop the other process, or run `npx next start -p 3100`. |
| Changes not visible on the live site | The deploy is still building — check the Vercel dashboard; a commit to `main` triggers it. |

---

## 14. Known issues and placeholders

Everything below must be replaced before this goes beyond a marketing build:

- **Plan prices** — `src/lib/pricing.ts` (`$0 / $15 / $29` monthly, `$0 / $12 / $24` yearly)
  are invented placeholders. The page even says so out loud under the pricing grid.
- **Testimonials** — `src/lib/testimonials.ts` contains fictional names and quotes; the
  section subtitle says "Placeholder quotes for this build".
- **Chrome extension URL** — `CHROME_STORE_URL` in `HeroSection.tsx` points at the Web
  Store root, not a listing.
- **No backend yet** — there is no `/api/chat`, no auth and no `src/app/chat` route. The
  product preview and hero mockup are CSS illustrations, and the stats row
  (10,000+ users, 4.9★) is illustrative, not measured.
- **No real routes** — navbar, hero CTAs, pricing buttons and footer all use in-page
  anchors. When `/chat` and the other pages exist, switch the "Get Started" links from
  `/#pricing` to them.
- **Legal pages** — no `/privacy` or `/terms`; the footer intentionally links to nothing
  rather than to dead routes.
- **Social proof** — no Open Graph image is configured yet, so link previews fall back to
  the plain title and description.
