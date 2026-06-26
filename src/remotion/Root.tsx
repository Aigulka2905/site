import { Composition } from "remotion";
import { WarpHero } from "./WarpHero";
import { AmbientBg, type AmbientBgProps } from "./AmbientBg";
import {
  WARP,
  AMBIENT,
  AMBIENTS,
  PAGE_AMBIENTS,
  LIGHT_SECTIONS,
  LIGHT_PAGES,
  LIGHT_HERO,
} from "./constants";

/** Every AmbientBg-based loop (dark sections/pages + their light twins). */
const ambientComps: ReadonlyArray<{ id: string; props: AmbientBgProps }> = [
  ...AMBIENTS,
  ...PAGE_AMBIENTS,
  ...LIGHT_SECTIONS,
  ...LIGHT_PAGES,
];

/**
 * Remotion studio root. Run `npm run remotion` to open the studio, or
 * `npm run remotion:render` / `remotion:render:bg` to bake the loops to mp4.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={WARP.id}
        component={WarpHero}
        durationInFrames={WARP.durationInFrames}
        fps={WARP.fps}
        width={WARP.width}
        height={WARP.height}
        defaultProps={{ image: "backgrounds/hero-warp.webp" }}
      />

      <Composition
        id={LIGHT_HERO.id}
        component={WarpHero}
        durationInFrames={WARP.durationInFrames}
        fps={WARP.fps}
        width={WARP.width}
        height={WARP.height}
        defaultProps={LIGHT_HERO.props}
      />

      {ambientComps.map((a) => (
        <Composition
          key={a.id}
          id={a.id}
          component={AmbientBg}
          durationInFrames={AMBIENT.durationInFrames}
          fps={AMBIENT.fps}
          width={AMBIENT.width}
          height={AMBIENT.height}
          defaultProps={a.props}
        />
      ))}
    </>
  );
};
