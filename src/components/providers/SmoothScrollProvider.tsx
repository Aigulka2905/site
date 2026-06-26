"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Wires Lenis smooth scrolling into GSAP's ticker so ScrollTrigger and Lenis
 * share a single rAF loop (the recommended integration). Disabled entirely when
 * the user prefers reduced motion — native scroll takes over.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis.
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  // Intercept in-page anchor clicks for smooth, offset-aware navigation.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      // Anchor lives on the home page — if we're on a sub-route, navigate there.
      if (!el) {
        e.preventDefault();
        window.location.href = `/${id}`;
        return;
      }
      e.preventDefault();
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el as HTMLElement, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      }
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [reduced]);

  return <>{children}</>;
}
