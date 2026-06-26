import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Decorative section backdrop using one of the extracted mockup images. Sits
 * behind the section content (which should be `relative z-10`) with a heavy
 * void scrim so text stays readable. Purely presentational → aria-hidden.
 */
export function SectionBg({
  src,
  className,
  imageClassName,
  opacity = 0.35,
  /** Tailwind object-position helper, e.g. "object-right". */
  position = "object-center",
  /** Gradient scrim direction for keeping copy legible. */
  scrim = "bg-void/72",
}: {
  src: string;
  className?: string;
  imageClassName?: string;
  opacity?: number;
  position?: string;
  scrim?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        style={{ opacity }}
        className={cn("object-cover", position, imageClassName)}
      />
      <div className={cn("absolute inset-0", scrim)} />
      {/* Feather the top/bottom so sections blend into the void seamlessly */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-transparent to-void/80" />
    </div>
  );
}
