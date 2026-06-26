"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion, useMediaQuery } from "@/lib/hooks";
import { useTheme } from "@/components/providers/ThemeProvider";

// WebGL fluid simulation — client-only and heavy, so load it lazily.
const SplashCursor = dynamic(() => import("@/components/SplashCursor"), {
  ssr: false,
});

/** Returns true only if the browser can actually create a WebGL context. */
function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/**
 * Mounts the react-bits SplashCursor fluid effect site-wide. Skipped on touch
 * devices and for users who prefer reduced motion (where a constantly animating
 * canvas is unwanted). Tuned to the Soderiz cyan/magenta neon palette.
 */
export function SplashCursorProvider() {
  const reduced = usePrefersReducedMotion();
  const hasPointer = useMediaQuery("(pointer: fine)");
  const { theme } = useTheme();
  const [webglOk, setWebglOk] = useState(false);

  useEffect(() => {
    setWebglOk(detectWebGL());
  }, []);

  if (reduced || !hasPointer || !webglOk) return null;

  // Match the canvas backdrop to the active theme so the fluid blends in.
  const backColor =
    theme === "light"
      ? { r: 0.96, g: 0.97, b: 0.99 }
      : { r: 0.02, g: 0.03, b: 0.06 };

  return (
    <SplashCursor
      key={theme}
      BACK_COLOR={backColor}
      SPLAT_RADIUS={0.18}
      DENSITY_DISSIPATION={4}
      CURL={3.5}
      COLOR_UPDATE_SPEED={8}
    />
  );
}
