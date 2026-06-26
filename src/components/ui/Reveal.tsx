"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  usePrefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/lib/hooks";

type Tag = "div" | "span" | "li" | "ol" | "ul" | "p";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Direction the element travels from. */
  from?: "up" | "down" | "left" | "right" | "none";
  as?: Tag;
};

const distance = 28;

const offsets: Record<NonNullable<RevealProps["from"]>, { x?: number; y?: number }> = {
  up: { y: distance },
  down: { y: -distance },
  left: { x: distance },
  right: { x: -distance },
  none: {},
};

/** Static motion components keyed by tag (framer-motion v12 uses the proxy API). */
const motionTags = {
  div: motion.div,
  span: motion.span,
  li: motion.li,
  ol: motion.ol,
  ul: motion.ul,
  p: motion.p,
} as const;

/**
 * Scroll-triggered reveal — robust by design.
 *
 * Content renders FULLY VISIBLE during SSR / before hydration (and under
 * prefers-reduced-motion); the entrance animation is layered on only after the
 * component mounts on the client. So if JS fails to run / hydrate on a given
 * browser (we saw this on Yandex), the section content is still shown rather
 * than stuck at opacity:0 — only the page would lose the animation, never the
 * content. A failsafe timer also forces visibility in case the in-view
 * observer never fires.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [enhanced, setEnhanced] = useState(false);
  const [failsafe, setFailsafe] = useState(false);

  // Only opt into the animated version once we're running on the client.
  useIsomorphicLayoutEffect(() => {
    setEnhanced(true);
  }, []);

  // Never let content stay hidden if the in-view observer doesn't fire.
  useEffect(() => {
    const t = setTimeout(() => setFailsafe(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const Tag = as;

  // SSR / pre-hydration / reduced-motion → plain, visible content.
  if (reduced || !enhanced) {
    return (
      <Tag ref={ref as React.Ref<never>} className={className}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motionTags[as];

  const variants: Variants = {
    hidden: { opacity: 0, ...offsets[from] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <MotionTag
      ref={ref as React.Ref<never>}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView || failsafe ? "visible" : "hidden"}
    >
      {children}
    </MotionTag>
  );
}
