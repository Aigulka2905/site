/**
 * Shared Remotion composition metadata. Imported by both the studio Root and
 * the in-page <Player> so the dimensions/timing stay in a single place.
 */
import type { AmbientBgProps } from "./AmbientBg";

export const WARP = {
  id: "WarpHero",
  fps: 30,
  durationInFrames: 300, // 10s seamless loop
  width: 1920,
  height: 1080,
} as const;

export type WarpHeroProps = {
  /** Path inside /public to the base neon image (Remotion staticFile form). */
  image: string;
  /** Render the light-theme twin (inverted luminance, white vignette). */
  light?: boolean;
};

/** Shared timing for the ambient section loops (8s seamless). */
export const AMBIENT = {
  fps: 30,
  durationInFrames: 240,
  width: 1920,
  height: 1080,
} as const;

const CYAN = "#16e7e7";
const MAGENTA = "#c026f7";
const BLUE = "#3b7bff";

/**
 * One entry per animated section background. `id` is the Remotion composition
 * id (used by `remotion render`); `out` is the mp4 written to /public. Keeping
 * this list in one place keeps the render script and the page in sync.
 */
/**
 * Ambient loops baked specifically for the sub-page headers (services /
 * projects / IT-accreditation / product). Tuned darker than the section
 * loops because heading text sits directly on top — the page renders them at
 * low opacity behind a strong scrim. Shares the AmbientBg component + timing.
 */
export const PAGE_AMBIENTS = [
  {
    id: "AmbientServices",
    out: "backgrounds/page-services.mp4",
    poster: "/backgrounds/waves-neon.webp",
    props: {
      image: "backgrounds/waves-neon.webp",
      colorA: CYAN,
      colorB: MAGENTA,
      driftX: 0.4,
      driftY: -0.2,
      zoomAmp: 0.05,
      brightness: 0.85,
    },
  },
  {
    id: "AmbientProjects",
    out: "backgrounds/page-projects.mp4",
    poster: "/backgrounds/liquid-blobs.webp",
    props: {
      image: "backgrounds/liquid-blobs.webp",
      colorA: CYAN,
      colorB: BLUE,
      driftX: 0.25,
      driftY: -0.4,
      zoomAmp: 0.06,
      brightness: 0.8,
    },
  },
  {
    id: "AmbientAccreditation",
    out: "backgrounds/page-accreditation.mp4",
    poster: "/backgrounds/wave-mesh.webp",
    props: {
      image: "backgrounds/wave-mesh.webp",
      colorA: BLUE,
      colorB: CYAN,
      driftX: 0.5,
      driftY: 0.15,
      zoomAmp: 0.04,
      brightness: 0.82,
    },
  },
  {
    id: "AmbientProduct",
    out: "backgrounds/page-product.mp4",
    poster: "/backgrounds/neon-city.webp",
    props: {
      image: "backgrounds/neon-city.webp",
      colorA: CYAN,
      colorB: MAGENTA,
      driftX: 0.2,
      driftY: -0.3,
      zoomAmp: 0.05,
      brightness: 0.8,
    },
  },
] as const;

export const AMBIENTS = [
  {
    id: "AmbientSolutions",
    out: "backgrounds/solutions.mp4",
    poster: "/backgrounds/neon-city.webp",
    props: {
      image: "backgrounds/neon-city.webp",
      colorA: CYAN,
      colorB: MAGENTA,
      driftX: 0.15,
      driftY: -0.5,
      brightness: 1.2,
    },
  },
  {
    id: "AmbientTech",
    out: "backgrounds/technologies.mp4",
    poster: "/backgrounds/wave-mesh.webp",
    props: {
      image: "backgrounds/wave-mesh.webp",
      colorA: BLUE,
      colorB: CYAN,
      driftX: 0.6,
      driftY: 0.1,
      brightness: 1.3,
    },
  },
  {
    id: "AmbientAbout",
    out: "backgrounds/about.mp4",
    poster: "/backgrounds/liquid-blobs.webp",
    props: {
      image: "backgrounds/liquid-blobs.webp",
      colorA: CYAN,
      colorB: MAGENTA,
      driftX: 0.2,
      driftY: -0.3,
      zoomAmp: 0.06,
      brightness: 1.15,
    },
  },
  {
    id: "AmbientContact",
    out: "backgrounds/contact.mp4",
    poster: "/backgrounds/liquid-blue.webp",
    props: {
      image: "backgrounds/liquid-blue.webp",
      colorA: CYAN,
      colorB: BLUE,
      driftX: 0.3,
      driftY: -0.4,
      brightness: 1.15,
    },
  },
] as const;

/* ------------------------------------------------------------- light twins ---
 * Light-theme backgrounds are the *same* compositions (same images, drift,
 * particles) rendered with `light: true` — a luminance invert turns each dark
 * neon loop into its light counterpart. Output/poster names get a `-light`
 * suffix; everything else is derived so the two themes never drift apart. */
type AmbientEntry = {
  id: string;
  out: string;
  poster: string;
  props: AmbientBgProps;
};

function deriveLight(a: {
  id: string;
  out: string;
  props: AmbientBgProps;
}): AmbientEntry {
  const base = a.props.image.replace(/^.*\//, "").replace(/\.webp$/, "");
  return {
    id: `${a.id}Light`,
    out: a.out.replace(/\.mp4$/, "-light.mp4"),
    poster: `/backgrounds/${base}-light.webp`,
    props: { ...a.props, light: true },
  };
}

export const LIGHT_SECTIONS: AmbientEntry[] = AMBIENTS.map(deriveLight);
export const LIGHT_PAGES: AmbientEntry[] = PAGE_AMBIENTS.map(deriveLight);

/** Light hero = the warp tunnel, inverted. */
export const LIGHT_HERO = {
  id: "WarpHeroLight",
  out: "backgrounds/hero-light.mp4",
  poster: "/backgrounds/hero-warp-light.webp",
  props: { image: "backgrounds/hero-warp.webp", light: true },
} as const;
