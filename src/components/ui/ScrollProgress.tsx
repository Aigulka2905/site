"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Thin reading-progress bar pinned to the top of the viewport. A single
 * transform-only element (cheap), spring-smoothed unless the user prefers
 * reduced motion — in which case it tracks scroll directly.
 */
export function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const scaleX = reduced ? scrollYProgress : smooth;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-cyan via-purple to-magenta"
    />
  );
}
