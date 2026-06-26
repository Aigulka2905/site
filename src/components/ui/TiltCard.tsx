"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Glass card with a 3D pointer-tilt and a glow that follows the cursor.
 * Falls back to a static glass card when reduced motion is preferred.
 */
export function TiltCard({
  children,
  className,
  glow = "cyan",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "magenta" | "blue";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const glowColor = {
    cyan: "rgba(22,231,231,0.18)",
    magenta: "rgba(192,38,247,0.18)",
    blue: "rgba(45,107,255,0.18)",
  }[glow];

  // Stored as 0–100 percentages so they can feed the radial-gradient template.
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const rotateX = useSpring(0, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 18 });

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${px}% ${py}%, ${glowColor}, transparent 70%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    px.set(x * 100);
    py.set(y * 100);
    rotateY.set((x - 0.5) * 10);
    rotateX.set((0.5 - y) * 10);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl glass p-px transition-colors duration-300 hover:border-white/20 [transform-style:preserve-3d]",
        className,
      )}
    >
      {/* Cursor-tracking spotlight */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-surface/60 p-7">
        {children}
      </div>
    </motion.div>
  );
}
