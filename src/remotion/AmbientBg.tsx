import {
  AbsoluteFill,
  Img,
  random,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const TAU = Math.PI * 2;

export type AmbientBgProps = {
  /** Path inside /public to the base image (Remotion staticFile form). */
  image: string;
  /** Two accent colours used for particles + colour grade. */
  colorA: string;
  colorB: string;
  /** Particle drift direction (viewport fraction per loop). */
  driftX: number;
  driftY: number;
  /** Ken-burns zoom amplitude. */
  zoomAmp?: number;
  /** Base brightness multiplier for the image. */
  brightness?: number;
  particles?: number;
  /** Light-theme twin: invert luminance + multiply overlays + white vignette. */
  light?: boolean;
};

/**
 * Lightweight ambient section backdrop. A single mockup image gets a slow,
 * seamless ken-burns drift, a handful of drifting neon particles, one soft
 * sheen sweep and a colour-graded vignette. Far cheaper than the hero warp —
 * sections are secondary, so motion stays subtle (per ui-ux-pro-max: animate
 * 1–2 things, ease, don't distract). Everything loops via sine/modulo of the
 * progress so frame 0 === frame durationInFrames.
 */
export const AmbientBg: React.FC<AmbientBgProps> = ({
  image,
  colorA,
  colorB,
  driftX,
  driftY,
  zoomAmp = 0.05,
  brightness = 1.25,
  particles = 18,
  light = false,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const progress = frame / durationInFrames;
  const wave = Math.sin(progress * TAU);
  const blend = light ? "multiply" : "screen";

  const zoom = 1 + zoomAmp + zoomAmp * wave;
  const bgX = 18 * Math.cos(progress * TAU);
  const bgY = 14 * Math.sin(progress * TAU);

  // One soft sheen sweep per loop; opacity fades to 0 at both ends so the
  // position wrap is invisible.
  const sheenX = (progress * 260 - 130).toFixed(2);
  const sheenOpacity = Math.sin(progress * Math.PI) * 0.5;

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
          transform: `scale(${zoom}) translate(${bgX}px, ${bgY}px)`,
          filter: light
            ? `brightness(${0.98 + 0.05 * wave}) saturate(1.1) contrast(0.95) invert(1) hue-rotate(180deg)`
            : `brightness(${brightness + 0.08 * wave}) saturate(1.2) contrast(1.04)`,
        }}
      />

      {/* Drifting neon particles */}
      <AbsoluteFill style={{ mixBlendMode: blend }}>
        {new Array(particles).fill(0).map((_, i) => {
          const seed = `amb-${i}`;
          const startX = random(seed);
          const startY = random(`${seed}-y`);
          const speed = 1 + Math.floor(random(`${seed}-s`) * 2);
          const t = (progress * speed + random(`${seed}-o`)) % 1;
          const x = ((startX + driftX * t) % 1) * width;
          const y = ((startY + driftY * t) % 1) * height;
          const size = 2 + random(`${seed}-z`) * 4;
          const color = random(`${seed}-c`) > 0.5 ? colorA : colorB;
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
                opacity: fade * 0.8,
                boxShadow: `0 0 ${size * 3}px ${size}px ${color}`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* Soft sheen sweep */}
      <AbsoluteFill style={{ mixBlendMode: blend, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: `${sheenX}%`,
            width: "45%",
            height: "140%",
            transform: "rotate(14deg)",
            background: `linear-gradient(90deg, transparent, ${colorA}, transparent)`,
            opacity: sheenOpacity,
            filter: "blur(40px)",
          }}
        />
      </AbsoluteFill>

      {/* Colour grade + vignette */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(120deg, ${colorA}22, transparent 45%, ${colorB}26)`,
          opacity: 0.7 + 0.15 * wave,
        }}
      />
      <AbsoluteFill
        style={{
          background: light
            ? "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 50%, rgba(244,246,251,0.45) 88%, rgba(244,246,251,0.80) 100%)"
            : "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 50%, rgba(5,7,13,0.45) 88%, rgba(5,7,13,0.78) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
