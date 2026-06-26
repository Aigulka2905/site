"use client";

/**
 * Central GSAP setup. Registers ScrollTrigger once and re-exports the shared
 * instances so every component pulls from the same registry (avoids duplicate
 * plugin registration warnings).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// registerPlugin is idempotent; guard against SSR only.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
