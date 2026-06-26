import { cn } from "@/lib/utils";

/** Uppercase mono label with a leading neon tick — the recurring section kicker. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-2.5 text-cyan", className)}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_12px_2px] shadow-cyan/70" />
      {children}
    </span>
  );
}
