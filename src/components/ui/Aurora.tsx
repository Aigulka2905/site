import { cn } from "@/lib/utils";

/**
 * Pure-CSS neon ambience: drifting cyan/magenta/blue glow blobs plus a faint
 * grid. Zero JS, GPU-friendly (transform/opacity only), and the always-present
 * backdrop beneath the R3F scene. Animations are defined inline so this stays
 * self-contained; reduced-motion freezes them via the global rule.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute inset-0 grid-backdrop opacity-60" />

      <div className="aurora-blob absolute -left-[10%] top-[-10%] h-[55vh] w-[55vh] rounded-full bg-cyan/20 blur-[110px]" />
      <div className="aurora-blob absolute right-[-8%] top-[20%] h-[50vh] w-[50vh] rounded-full bg-magenta/20 blur-[120px] [animation-delay:-6s]" />
      <div className="aurora-blob absolute bottom-[-15%] left-[30%] h-[45vh] w-[45vh] rounded-full bg-blue/20 blur-[120px] [animation-delay:-12s]" />

      {/* Vignette to keep edges deep and text legible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-void)_95%)]" />

      <style>{`
        @keyframes aurora-drift {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          33% { transform: translate3d(6%, 8%, 0) scale(1.1); }
          66% { transform: translate3d(-5%, 4%, 0) scale(0.95); }
        }
        .aurora-blob { animation: aurora-drift 18s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
