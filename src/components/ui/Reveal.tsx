"use client";

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

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
 * Scroll-triggered reveal built on Framer Motion's whileInView. Honors
 * prefers-reduced-motion by rendering the final state immediately.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
}: RevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
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
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}
