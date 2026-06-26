"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * One animated backdrop layer: a pre-rendered Remotion loop served as a muted
 * <video> over its webp poster. Plays only while on-screen (IntersectionObserver,
 * `preload="none"`); reduced-motion users get the static poster.
 *
 * A hidden (display:none) layer never intersects, so its video stays paused and
 * its lazy poster never loads — which is what makes the dual dark/light layers
 * cheap.
 */
function BgLayer({
  video,
  poster,
  opacity,
  position,
  scrim,
  feather,
  className,
}: {
  video: string;
  poster: string;
  opacity: number;
  position: string;
  scrim: string;
  feather: string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView) el.play().catch(() => {});
    else el.pause();
  }, [inView]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={poster}
        alt=""
        fill
        sizes="100vw"
        style={{ opacity }}
        className={cn("object-cover", position)}
      />

      {!reduced && (
        <video
          ref={ref}
          className={cn("absolute inset-0 h-full w-full object-cover", position)}
          style={{ opacity }}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      <div className={cn("absolute inset-0", scrim)} />
      <div className={cn("absolute inset-0", feather)} />
    </div>
  );
}

/**
 * Theme-aware animated section backdrop. Renders a dark and (optionally) a light
 * layer; CSS shows the one matching `html.light`, applied pre-paint by the
 * no-flash script — so there's no dark flash and no JS swap on load.
 */
export function SectionBgVideo({
  video,
  poster,
  lightVideo,
  lightPoster,
  className,
  opacity = 0.6,
  lightOpacity = 0.42,
  position = "object-center",
  scrim = "bg-void/55",
  lightScrim = "bg-void/55",
}: {
  video: string;
  poster: string;
  lightVideo?: string;
  lightPoster?: string;
  className?: string;
  opacity?: number;
  lightOpacity?: number;
  position?: string;
  scrim?: string;
  lightScrim?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <BgLayer
        className="theme-dark-only"
        video={video}
        poster={poster}
        opacity={opacity}
        position={position}
        scrim={scrim}
        feather="bg-gradient-to-b from-void/80 via-transparent to-void/80"
      />

      {lightVideo && lightPoster && (
        <BgLayer
          className="theme-light-only"
          video={lightVideo}
          poster={lightPoster}
          opacity={lightOpacity}
          position={position}
          scrim={lightScrim}
          feather="bg-gradient-to-b from-void/75 via-void/30 to-void/75"
        />
      )}
    </div>
  );
}
