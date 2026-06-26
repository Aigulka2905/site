import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { WarpHeroProps } from "./constants";

const CYAN = "#16e7e7";
const MAGENTA = "#c026f7";
const BLUE = "#2d6bff";
const COLORS = [CYAN, BLUE, MAGENTA, "#5cf6f6"];

const STREAKS = 46;
const PARTICLES = 34;
const TAU = Math.PI * 2;

/**
 * Cinematic "warp tunnel" hero loop, composited in Remotion.
 *
 * Layers (back → front): the extracted mockup neon image with a slow seamless
 * ken-burns zoom, procedural light streaks radiating from the vanishing point,
 * particles flying outward, and a colour-graded vignette. Everything is driven
 * by sine/modulo of the loop progress so frame 0 === frame durationInFrames.
 */
export const WarpHero: React.FC<WarpHeroProps> = ({ image, light = false }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const progress = frame / durationInFrames; // 0 → 1 over the loop
  const wave = Math.sin(progress * TAU); // seamless -1 → 1 → -1

  // Slow breathing zoom + drift on the base image.
  const zoom = 1.08 + 0.06 * wave;
  const driftX = 14 * Math.cos(progress * TAU);
  const driftY = 10 * Math.sin(progress * TAU);

  // Light theme: invert luminance (keeps imagery + hue via hue-rotate) so the
  // dark neon warp becomes its light twin; overlays switch to multiply so the
  // streaks/particles read as accents on the bright base.
  const blend = light ? "multiply" : "screen";

  return (
    <AbsoluteFill
      style={{ backgroundColor: light ? "#eef2fb" : "#05070d", overflow: "hidden" }}
    >
      <Img
        src={staticFile(image)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${zoom}) translate(${driftX}px, ${driftY}px)`,
          opacity: 1,
          filter: light
            ? `brightness(${1.02 + 0.05 * wave}) saturate(1.1) contrast(0.95) invert(1) hue-rotate(180deg)`
            : `brightness(${1.35 + 0.1 * wave}) saturate(1.25) contrast(1.05)`,
        }}
      />

      {/* Light streaks radiating from the vanishing point */}
      <AbsoluteFill
        style={{
          transform: `rotate(${2 * wave}deg)`,
          mixBlendMode: blend,
        }}
      >
        {new Array(STREAKS).fill(0).map((_, i) => {
          const seed = `streak-${i}`;
          const angle = (i / STREAKS) * 360 + random(seed) * 6;
          const len = 30 + random(`${seed}-l`) * 45; // % of viewport
          const thickness = 1.2 + random(`${seed}-t`) * 2.4;
          const color = COLORS[Math.floor(random(`${seed}-c`) * COLORS.length)];
          const phase = random(`${seed}-p`);
          // Integer cycle count keeps the shimmer seamless across the loop.
          const cycles = 1 + Math.floor(random(`${seed}-cy`) * 2);
          const pulse =
            0.12 + 0.88 * (0.5 + 0.5 * Math.sin(TAU * (progress * cycles + phase)));
          const reach = len * (0.85 + 0.15 * Math.sin(TAU * (progress + phase)));

          return (
            <div
              key={seed}
              style={{
                position: "absolute",
                left: "50%",
                top: "46%",
                width: `${reach}%`,
                height: thickness,
                transformOrigin: "0% 50%",
                transform: `rotate(${angle}deg)`,
                background: `linear-gradient(90deg, transparent 0%, ${color} 55%, #ffffff 100%)`,
                opacity: pulse * 0.8,
                filter: "blur(0.5px)",
                borderRadius: 9999,
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* Particles flying outward */}
      <AbsoluteFill style={{ mixBlendMode: blend }}>
        {new Array(PARTICLES).fill(0).map((_, i) => {
          const seed = `p-${i}`;
          const angle = random(seed) * TAU;
          const offset = random(`${seed}-o`);
          const speed = 1 + Math.floor(random(`${seed}-s`) * 2);
          const t = (progress * speed + offset) % 1; // 0 → 1 outward, loops
          const maxR = Math.min(width, height) * 0.62;
          const r = t * maxR;
          const x = width / 2 + Math.cos(angle) * r;
          const y = height * 0.46 + Math.sin(angle) * r;
          const size = 2 + random(`${seed}-z`) * 4;
          const color = COLORS[Math.floor(random(`${seed}-c`) * COLORS.length)];
          // Fade in/out at the ends so the modulo wrap is invisible.
          const fade = Math.sin(t * Math.PI);

          return (
            <div
              key={seed}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: size,
                height: size,
                borderRadius: "50%",
                background: color,
                opacity: fade * 0.9,
                boxShadow: `0 0 ${size * 3}px ${size}px ${color}`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* Central core glow that pulses with the loop */}
      <AbsoluteFill style={{ mixBlendMode: blend }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "46%",
            width: 520,
            height: 520,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(92,246,246,${0.45 + 0.15 * wave}) 0%, rgba(45,107,255,0.24) 35%, transparent 70%)`,
            filter: "blur(8px)",
          }}
        />
      </AbsoluteFill>

      {/* Colour grade + vignette for depth */}
      <AbsoluteFill
        style={{
          background: light
            ? "radial-gradient(ellipse 70% 60% at 50% 46%, transparent 45%, rgba(244,246,251,0.35) 85%, rgba(244,246,251,0.82) 100%)"
            : "radial-gradient(ellipse 70% 60% at 50% 46%, transparent 45%, rgba(5,7,13,0.30) 85%, rgba(5,7,13,0.70) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(120deg, rgba(22,231,231,0.10), transparent 40%, rgba(192,38,247,0.12))`,
          opacity: interpolate(wave, [-1, 1], [0.6, 1]),
        }}
      />
    </AbsoluteFill>
  );
};
