"use client";

import { Player } from "@remotion/player";
import { WarpHero } from "@/remotion/WarpHero";
import { WARP } from "@/remotion/constants";

/**
 * Live Remotion player used as the hero's animated background. Loaded via
 * next/dynamic (ssr:false) from the Hero so it never runs on the server, and
 * only mounted when the user hasn't requested reduced motion.
 */
export default function HeroRemotionBg() {
  return (
    <Player
      component={WarpHero}
      durationInFrames={WARP.durationInFrames}
      fps={WARP.fps}
      compositionWidth={WARP.width}
      compositionHeight={WARP.height}
      inputProps={{ image: "backgrounds/hero-warp.webp" }}
      autoPlay
      loop
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false}
      initiallyMuted
      style={{ width: "100%", height: "100%" }}
    />
  );
}
