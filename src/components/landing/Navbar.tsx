"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/#hero" },
  { label: "Features", href: "/#features" },
  { label: "AI Models", href: "/#models" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
];

const SCROLL_THRESHOLD = 24;
const SCROLL_OFFSET = 140;

function hashOf(href: string): string | null {
  const index = href.indexOf("#");
  return index === -1 ? null : href.slice(index + 1);
}

const SECTION_HASHES: readonly string[] = NAV_LINKS.map((link) =>
  hashOf(link.href),
).filter((hash): hash is string => hash !== null);

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function useActiveHash(scrollY: MotionValue<number>) {
  const [activeHash, setActiveHash] = useState<string | null>(
    SECTION_HASHES[0] ?? null,
  );

  useMotionValueEvent(scrollY, "change", () => {
    let current: string | null = null;

    for (const hash of SECTION_HASHES) {
      const section = document.getElementById(hash);
      if (!section) continue;
      if (section.getBoundingClientRect().top - SCROLL_OFFSET <= 0) {
        current = hash;
      }
    }

    if (current === null && window.scrollY <= SCROLL_OFFSET) {
      current = SECTION_HASHES[0] ?? null;
    }

    setActiveHash(current);
  });

  return activeHash;
}

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <path
        d="M10 12.5a4.5 4.5 0 0 0 0 7"
        stroke="currentColor"
        className="text-primary-foreground"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M15 10a7 7 0 0 0 0 12"
        stroke="currentColor"
        className="text-primary-foreground"
        strokeWidth="2.25"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M20 13.5a3 3 0 0 1 0 5"
        stroke="currentColor"
        className="text-primary-foreground"
        strokeWidth="2.25"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  );
}

function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 35, scale: 0.7 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <MoonIcon className="h-5 w-5" />
          ) : (
            <SunIcon className="h-5 w-5" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeHash = useActiveHash(scrollY);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > SCROLL_THRESHOLD);
  });

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };

    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b border-transparent bg-white/80 backdrop-blur-md transition-[height,box-shadow,background-color,border-color] duration-300 ease-out dark:bg-black/80",
        scrolled
          ? "h-16 border-border/70 shadow-md shadow-black/5 dark:shadow-black/40"
          : "h-20",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        >
          <LogoMark className="h-9 w-9 text-foreground" />
          <span className="text-lg font-semibold tracking-tight">EchoGPT</span>
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const hash = hashOf(link.href);
            const active = hash
              ? hash === activeHash
              : isActivePath(pathname, link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? (hash ? "location" : "page") : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                  {active ? (
                    <motion.span
                      layoutId="navbar-active-underline"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Link
            href="/get-started"
            className="hidden h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 sm:inline-flex"
          >
            Get Started
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 md:hidden"
          >
            <span className="relative block h-4 w-5">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-current"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 top-1.5 block h-0.5 w-5 rounded-full bg-current"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-0 top-3 block h-0.5 w-5 rounded-full bg-current"
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-b border-border/70 bg-white/95 backdrop-blur-md md:hidden dark:bg-black/95"
          >
            <ul className="flex flex-col gap-1 px-4 pb-6 pt-3 sm:px-6">
              {NAV_LINKS.map((link, index) => {
                const hash = hashOf(link.href);
                const active = hash
                  ? hash === activeHash
                  : isActivePath(pathname, link.href);

                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: 0.04 * index,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={
                        active ? (hash ? "location" : "page") : undefined
                      }
                      className={cn(
                        "block rounded-lg px-3 py-3 text-base font-medium transition-colors",
                        active
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.04 * NAV_LINKS.length, ease: "easeOut" }}
                className="pt-2"
              >
                <Link
                  href="/get-started"
                  onClick={closeMenu}
                  className="flex h-11 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Get Started
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
