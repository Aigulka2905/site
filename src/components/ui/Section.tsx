import { cn } from "@/lib/utils";

/** Consistent vertical rhythm + max-width container for every page section. */
export function Section({
  id,
  children,
  className,
  label,
  backdrop,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
  /** Optional full-bleed decorative layer rendered behind the content. */
  backdrop?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn("relative scroll-mt-24 py-24 lg:py-32", className)}
    >
      {backdrop}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {children}
      </div>
    </section>
  );
}
