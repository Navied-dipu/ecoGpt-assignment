"use client";

import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const riseCardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeCardVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function useRevealVariants() {
  const reduceMotion = useReducedMotion();

  return {
    container: containerVariants,
    card: reduceMotion ? fadeCardVariants : riseCardVariants,
  };
}
