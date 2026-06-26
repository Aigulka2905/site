"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Dark/light theme switch. Icon-only, so it carries an aria-label and a live
 * pressed state; the icon cross-fades/rotates on change (collapses to an
 * instant swap under prefers-reduced-motion).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const reduced = usePrefersReducedMotion();
  const isDark = theme === "dark";
  const Icon = isDark ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      aria-pressed={!isDark}
      className={cn(
        "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-cyan/40 hover:text-cyan",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={reduced ? false : { opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <Icon className="h-5 w-5" aria-hidden />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
