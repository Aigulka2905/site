"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useMediaQuery } from "@/lib/hooks";

/**
 * Custom neon cursor: a small dot that tracks instantly plus a larger ring that
 * lags with smoothing and expands over interactive elements. Pointer-events:none
 * so it never blocks clicks. Hidden on touch / reduced-motion (where the native
 * cursor is the better experience).
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const hasPointer = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    if (reduced || !hasPointer) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest(
        'a, button, [data-cursor="hover"]',
      );
      ring.dataset.active = t ? "true" : "false";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [reduced, hasPointer]);

  if (reduced || !hasPointer) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-cyan"
      />
      <div
        ref={ringRef}
        data-active="false"
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-cyan/60 transition-[width,height,background-color,border-color] duration-300 ease-out data-[active=true]:h-14 data-[active=true]:w-14 data-[active=true]:border-magenta/70 data-[active=true]:bg-cyan/5"
      />
    </div>
  );
}
