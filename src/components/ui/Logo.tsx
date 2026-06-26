import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

/** Содериз wordmark with the official prism brand mark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark className="h-7 w-auto" />
      <span className="font-display text-xl font-bold tracking-tight text-ink">
        Содериз
      </span>
    </span>
  );
}

/** Standalone 8-pointed sparkle/asterisk mark. */
export function Spark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("drop-shadow-[0_0_8px_rgba(22,231,231,0.6)]", className)}
      aria-hidden
    >
      <path
        d="M12 0c.6 5.4 2.4 7.8 5.7 8.4-3.3.6-5.1 3-5.7 8.4-.6-5.4-2.4-7.8-5.7-8.4C9.6 7.8 11.4 5.4 12 0Z"
        transform="translate(0 3.6)"
        fill="currentColor"
      />
      <path
        d="M12 0c.6 5.4 2.4 7.8 5.7 8.4-3.3.6-5.1 3-5.7 8.4-.6-5.4-2.4-7.8-5.7-8.4C9.6 7.8 11.4 5.4 12 0Z"
        transform="translate(0 3.6) rotate(90 12 8.4)"
        fill="currentColor"
      />
    </svg>
  );
}
