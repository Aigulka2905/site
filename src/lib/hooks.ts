"use client";

import { useEffect, useLayoutEffect, useState, type RefObject } from "react";

/** SSR-safe layout effect — avoids the React warning during server render. */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Reactively tracks the user's reduced-motion preference. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** True once mounted on the client. Useful for gating non-SSR-safe visuals. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/**
 * Best-effort autoplay for a muted background <video>. Mobile/embedded browsers
 * block or defer autoplay inconsistently, so we don't rely on a single trigger:
 * we force `muted`/`playsInline` in JS (some engines ignore the attributes),
 * retry on every readiness event, on tab re-show, and on the first user gesture.
 * Native `autoPlay` on the element remains the primary path; this just makes it
 * stick where autoplay would otherwise silently fail.
 */
export function useAutoplayVideo(
  ref: RefObject<HTMLVideoElement | null>,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const tryPlay = () => {
      // Skip when hidden (e.g. the inactive theme layer, display:none) so we
      // don't decode a video nobody can see.
      if (el.offsetParent === null) return;
      // Required for autoplay on iOS/Safari and some Android browsers.
      el.muted = true;
      el.playsInline = true;
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    tryPlay();
    el.addEventListener("loadedmetadata", tryPlay);
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);

    const onVisible = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    // Some browsers only allow playback after a user gesture.
    const onGesture = () => tryPlay();
    const gestureOpts = { passive: true } as const;
    window.addEventListener("pointerdown", onGesture, gestureOpts);
    window.addEventListener("touchstart", onGesture, gestureOpts);
    window.addEventListener("scroll", onGesture, gestureOpts);
    window.addEventListener("keydown", onGesture);

    return () => {
      el.removeEventListener("loadedmetadata", tryPlay);
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("scroll", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, [ref, enabled]);
}

/** Tracks whether the viewport is at/above a min-width breakpoint. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}
