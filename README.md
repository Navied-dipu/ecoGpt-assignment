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
7. **Navigation** → `src/components/landing/Navbar.tsx` renders a fixed, blurred navbar
   that shrinks and gains a shadow once the page is scrolled, highlights the active route
   with an animated underline, and collapses into an animated hamburger menu on mobile.
8. **Planned next steps** — a chat interface that posts a question to a `/api/chat` route,
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
│   │   ├── page.tsx               # Landing page (route "/")
│   │   ├── globals.css            # Tailwind entry + light/dark CSS variables
│   │   └── fonts/                 # Self-hosted Geist .woff files
│   ├── components/
│   │   ├── landing/Navbar.tsx     # Responsive glassmorphism navbar (client)
│   │   └── theme-provider.tsx     # next-themes wrapper (client)
│   └── lib/
│       └── utils.ts               # cn() class-name helper
├── tailwind.config.js             # Dark mode strategy, font families, color tokens
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

3. **Edit a page or component** — `src/app/page.tsx` for content,
   `src/components/landing/Navbar.tsx` for navigation; the browser updates instantly.

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

## 8. Known issues / next steps

- **Nav targets are not built yet.** The navbar links to `/features`, `/ai-models`,
  `/pricing`, `/faq` and `/get-started`; those routes return 404 until the pages are
  created under `src/app/`.
- **Placeholder metadata**: `layout.tsx` description should be finalized with the product
  copy.
- `next lint` prompts for setup on a machine without a resolved ESLint install — run
  `npm install` first, or set `CI=1` for non-interactive runs.
