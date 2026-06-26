"use client";

import Image from "next/image";
import { useRef } from "react";
import { usePrefersReducedMotion, useAutoplayVideo } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Full-bleed hero backdrop. Renders a dark "warp tunnel" layer and a light
 * "aurora" layer; CSS shows the one matching `html.light` (set pre-paint by the
 * no-flash script), so there's no dark flash or post-hydration swap. Each layer
 * is a pre-rendered Remotion loop (muted <video>) over its webp poster.
 */
function HeroLayer({
  video,
  poster,
  scrims,
  className,
}: {
  video: string;
  poster: string;
  scrims: React.ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplayVideo(ref, !reduced);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={poster}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {!reduced && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={poster}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      {scrims}
    </div>
  );
}

export function HeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <HeroLayer
        className="theme-dark-only"
        video="/backgrounds/warp-hero-540.mp4"
        poster="/backgrounds/hero-warp.webp"
        scrims={
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-void/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-void/30" />
          </>
        }
      />

      <HeroLayer
        className="theme-light-only"
        video="/backgrounds/hero-light.mp4"
        poster="/backgrounds/hero-warp-light.webp"
        scrims={
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-void/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-void/20" />
          </>
        }
      />
    </div>
  );
}
