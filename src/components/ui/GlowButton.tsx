import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type GlowButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  showArrow?: boolean;
  className?: string;
};

/**
 * Pill CTA matching the mockup: filled bright-cyan primary or glass ghost.
 * Renders as an anchor (in-page links handled by SmoothScrollProvider).
 */
export function GlowButton({
  href,
  children,
  variant = "primary",
  showArrow = true,
  className,
}: GlowButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300",
        variant === "primary" &&
          "bg-cyan text-on-accent shadow-[0_0_30px_-6px] shadow-cyan/60 hover:shadow-[0_0_44px_-4px] hover:shadow-cyan/80 hover:-translate-y-0.5",
        variant === "ghost" &&
          "glass text-ink hover:border-cyan/40 hover:text-cyan hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
      {showArrow && (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}
    </a>
  );
}
