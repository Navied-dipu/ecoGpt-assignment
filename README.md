# EchoGPT Web

Web front-end for **EchoGPT** — an AI assistant for environmental and sustainability
questions. This repository contains the Next.js application that serves the landing page,
the responsive navigation, the chat UI, and the API routes that talk to the EchoGPT model.

> **Current status: scaffold + landing page navigation.** The app boots, renders the
> landing page with the responsive glassmorphism navbar, and supports light/dark themes.
> The chat feature, auth, and API routes are not implemented yet, so this README
> documents what exists today and exactly where each new piece goes.

---

## 1. What the project does (step by step)

1. **A visitor opens the site** → Next.js serves the App Router shell defined in
   `src/app/layout.tsx` (HTML skeleton, Geist fonts, global Tailwind styles, theme provider).
2. **Next.js picks the route** → `src/app/page.tsx` is the `/` route. Every folder under
   `src/app/` is a URL segment (`src/app/about/page.tsx` → `/about`).
3. **React renders the page to HTML on the server** (Server Component by default) and
   ships the result to the browser for instant first paint.
4. **Hydration** → components marked `"use client"` (the navbar, the theme provider)
   run in the browser and become interactive.
5. **Theming** → `src/components/theme-provider.tsx` wraps the app in `next-themes`; the
   active theme is applied as a `dark` class on `<html>`, and `src/app/globals.css` swaps
   the CSS variables for light/dark values.
6. **Styling** → Tailwind utility classes are compiled from the globs in
   `tailwind.config.js`; colors come from the CSS variables in `src/app/globals.css`.
7. **Page shell** → `src/app/page.tsx` composes the navbar (outside `<main>`), the four
   sections in order, a gradient divider between each, and a dot-grid page background.
   Every section carries an anchor id: `#hero`, `#features` and `#models`.
8. **Navigation** → `src/components/landing/Navbar.tsx` renders a fixed, blurred navbar
   that shrinks and gains a shadow once the page is scrolled, highlights the section
   currently in view with an animated underline, and collapses into an animated hamburger
   menu on mobile.
9. **Hero** → `src/components/landing/HeroSection.tsx` renders the animated gradient
   background, floating orbs, the shimmer badge, the headline and CTAs, the count-up stats
   row, and a floating browser mockup that previews the multi-model chat UI.
10. **Features** → `src/components/landing/FeaturesSection.tsx` renders the six product
    cards in a 2×3 / 3×2 glass grid, staggered into view on scroll with hover lift and glow.
11. **Models** → `src/components/landing/AIModelsSection.tsx` renders the six supported
    models with per-model accent colors, plus an infinite logo ticker beneath the grid.
12. **Planned next steps** — a chat interface that posts a question to a `/api/chat` route,
    which forwards it to the EchoGPT model and streams the answer back.

---

## 2. Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + CSS variables for theming |
| Animation | Framer Motion 11 |
| Theming | `next-themes` (light / dark / system) |
| Class merging | `clsx` + `tailwind-merge` via `cn()` |
| Fonts | `next/font/local` — Geist Sans + Geist Mono (self-hosted) |
| Runtime | Node.js, npm scripts |

---

## 3. Project structure

```
.
├── src/
│   ├── app/                       # App Router — the app root
│   │   ├── layout.tsx             # Root layout: fonts, ThemeProvider, metadata
│   │   ├── page.tsx               # Landing page: Navbar + Hero + Features + Models + CTA
│   │   ├── globals.css            # Tailwind entry, theme variables, no-JS fallback
│   │   └── fonts/                 # Self-hosted Geist .woff files
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Navbar.tsx         # Responsive glassmorphism navbar (client)
│   │   │   ├── HeroSection.tsx    # Animated hero + browser mockup (client)
│   │   │   ├── FeaturesSection.tsx# 6 glass feature cards, staggered reveal (client)
│   │   │   └── AIModelsSection.tsx# 6 model cards + infinite logo ticker (client)
│   │   └── theme-provider.tsx     # next-themes wrapper (client)
│   └── lib/
│       ├── features.ts            # Feature card data
│       ├── models.ts              # AI model data + per-model accent classes
│       ├── motion.ts              # Shared Framer Motion reveal variants
│       └── utils.ts               # cn() class-name helper
├── tailwind.config.js             # Dark mode, fonts, color tokens, animation keyframes
├── tsconfig.json                  # Path alias @/* -> ./src/*
├── next.config.mjs
└── package.json
```

Path alias: `@/components/landing/Navbar` resolves to `src/components/landing/Navbar`.

---

## 4. Getting started (step by step)

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the dev server** (hot reload, http://localhost:3000)

   ```bash
   npm run dev
   ```

3. **Edit a page or component** — `src/app/page.tsx` for page composition,
   `src/components/landing/` for the navbar and hero; the browser updates instantly.

4. **Verify before you commit** (required by `AGENTS.md`)

   ```bash
   npm run lint        # ESLint via next lint
   npx tsc --noEmit    # TypeScript type check
   npm run build       # production build
   ```

5. **Commit and push your work** (also required by `AGENTS.md`)

   ```bash
   git add <files you changed>
   git commit -m "feat: short summary"
   git push
   ```

---

## 5. Available scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server on port 3000 |
| `npm run build` | Creates the optimized production build in `.next/` |
| `npm run start` | Serves the production build |
| `npm run lint` | Runs ESLint with `eslint-config-next` |

---

## 6. How to add things

- **A new page** → create `src/app/<route>/page.tsx` and export a default component.
- **A shared component** → put it in `src/components/`, import as `@/components/<name>`.
- **Client interactivity** → add `"use client"` at the top of the file.
- **An API route** → create `src/app/api/<name>/route.ts` exporting `GET`/`POST`.
- **Server data fetching** → async Server Components; add `"use client"` only when you
  need state, effects, or browser APIs.
- **A new nav item** → add an entry to `NAV_LINKS` in
  `src/components/landing/Navbar.tsx` (exported, typed as `NavLink`).
- **A new color** → add a CSS variable in `src/app/globals.css` (light and dark) and map
  it in `tailwind.config.js`.

---

## 7. The navbar in detail

`src/components/landing/Navbar.tsx` is a client component that:

- keeps the logo (inline SVG + "EchoGPT") on the left, links centered on desktop, and the
  theme toggle + "Get Started" CTA on the right;
- stays fixed with `bg-white/80 dark:bg-black/80 backdrop-blur-md`;
- uses Framer Motion's `useScroll` to shrink the bar from `h-20` to `h-16` and add a
  shadow after 24px of scroll;
- animates the hamburger bars into an X and the dropdown panel with `AnimatePresence`;
- marks the active link with `aria-current` and a shared `layoutId` underline;
- locks body scroll while the mobile menu is open and closes it on route change or `Escape`.

---

## 8. The hero in detail

`src/components/landing/HeroSection.tsx` is a client component that:

- paints an animated purple → blue → cyan gradient plus three blurred orbs that float
  (`gradient-pan`, `float`, `drift-x` keyframes in `tailwind.config.js`);
- renders the "✨ Multi-AI Chat Platform" badge with a sweeping sheen highlight;
- stacks headline, subheadline, the two CTAs ("Try Web App Free" filled gradient,
  "Add to Chrome" outlined with an inline Chrome logo), and the stats row on mobile;
- counts the stats up (`10,000+ Users · 5+ AI Models · 4.9★ Rating · Free to Start`) once
  the row scrolls into view, with the final values present in the server HTML;
- draws a browser mockup entirely with divs (traffic lights, URL pill, model sidebar,
  chat bubbles, composer) that floats up and down forever;
- bounces the scroll-indicator arrow and links it to the `#features` section.

Entrance animations are CSS (`animate-rise-in`) rather than Framer Motion so the hero is
never invisible when JavaScript is slow or disabled; every animation is disabled under
`prefers-reduced-motion` via `motion-reduce:animate-none` / `useReducedMotion`.

---

## 9. The features section in detail

`src/components/landing/FeaturesSection.tsx` is a client component that:

- labels itself "FEATURES" between two gradient rules, followed by the title
  "Everything you need in one AI platform" and a one-line subtitle;
- lays the six cards out as 2×3 on mobile and 3×2 from `lg` up;
- gives every card a glass surface (`bg-white/60 dark:bg-white/5 backdrop-blur-md`) and an
  icon in a per-card gradient rounded square;
- lifts the card 6px on hover with `whileHover` while a gradient ring plus a blurred glow
  fade in (CSS `group-hover`, so the effect survives without JS);
- reveals the cards bottom-to-top with `whileInView` and a `staggerChildren: 0.09` parent
  variant, running once;
- drops the slide and animates opacity only when the user prefers reduced motion.

Because the reveal relies on `IntersectionObserver`, the cards are given a `motion-reveal`
class, and `src/app/globals.css` contains an `@media (scripting: none)` rule that forces
those cards visible when scripting is disabled.

---

## 10. The models section in detail

`src/components/landing/AIModelsSection.tsx` is a client component that:

- labels itself "SUPPORTED MODELS" between two gradient rules, followed by the title
  "All your favorite AIs, one interface" and the subtitle;
- renders GPT-4o, Gemini Pro, Claude 3.5, Llama 3, Mistral and Grok from `AI_MODELS` in
  `src/lib/models.ts`, one column on mobile, two on `sm`, three on `lg`;
- gives every card a colored letter avatar, the model name and provider, a capability tag,
  and a gradient top-border accent in that model's color;
- scales the card up 2% and adds a colored glow shadow on hover (`whileHover` for the
  transform, `hover:shadow-<color>/30` for the glow);
- scrolls the model ticker forever with the `marquee` keyframes: the list is rendered twice
  inside a `w-max` track and translated `-50%`, with the duplicate copy `aria-hidden` so
  screen readers hear it once. The marquee pauses on hover and is disabled under
  `prefers-reduced-motion`;
- fades the edge of the ticker with a `mask-image` gradient.

Per-model colors live in `src/lib/models.ts` as literal Tailwind classes. They must stay
literal strings — Tailwind cannot see classes built at runtime, and `group-hover:` variants
are skipped when the `group` marker class is not in the same file.

---

## 11. Known issues / next steps

- **Nav targets are not built yet.** The navbar links to `/features`, `/ai-models`,
  `/pricing` and `/faq`; those routes return 404 until the pages are created under
  `src/app/`. "Features" and "AI Models" point at the in-page anchors `#features` and
  `#models`; the "Get Started" buttons still link to `/get-started`, which needs a real
  page.
- **Chrome extension URL is a placeholder**: `CHROME_STORE_URL` in
  `src/components/landing/HeroSection.tsx` points at the store root — replace it with the
  real listing URL before launch.
- **Placeholder metadata**: `layout.tsx` description should be finalized with the product
  copy.
- `next lint` prompts for setup on a machine without a resolved ESLint install — run
  `npm install` first, or set `CI=1` for non-interactive runs.
- `next build` occasionally crashes its worker on this machine (exit code `3221225477`)
  when it runs while `next start`/`next dev` still holds `.next`. Stop the dev server and
  re-run the build.
