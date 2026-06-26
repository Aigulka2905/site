"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect, usePrefersReducedMotion } from "@/lib/hooks";
import { hero } from "@/data/content";
import { GlowButton } from "@/components/ui/GlowButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroBackground } from "@/components/backgrounds/HeroBackground";
import { cn } from "@/lib/utils";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.15,
      });

      tl.from("[data-hero='eyebrow']", { y: 20, opacity: 0, duration: 0.8 })
        // Kinetic headline: each word rises and rotates into place.
        .from(
          "[data-hero='word']",
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -60,
            duration: 1,
            stagger: 0.09,
          },
          "-=0.4",
        )
        .from(
          "[data-hero='lead']",
          { y: 24, opacity: 0, duration: 0.8 },
          "-=0.55",
        )
        .from(
          "[data-hero='cta'] > *",
          { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 },
          "-=0.5",
        )
        .from(
          "[data-hero='stat']",
          { y: 24, opacity: 0, duration: 0.6, stagger: 0.08 },
          "-=0.4",
        );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      id="hero"
      aria-label="Главный экран"
      className="relative flex min-h-dvh items-center overflow-hidden pb-20 pt-32 lg:pt-28"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {/* ---- Copy ---- */}
        <div className="max-w-3xl [perspective:1000px]">
          <div data-hero="eyebrow">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {hero.title.map((word) => (
              <span
                key={word}
                className="inline-block overflow-hidden pb-[0.08em] align-top"
              >
                <span
                  data-hero="word"
                  className={cn(
                    "inline-block",
                    word === hero.accentWord && "text-neon-gradient",
                  )}
                >
                  {word}
                </span>
                {word !== hero.title[hero.title.length - 1] && " "}
              </span>
            ))}
          </h1>

          <p
            data-hero="lead"
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            {hero.lead}
          </p>

          <div data-hero="cta" className="mt-9 flex flex-wrap items-center gap-4">
            <GlowButton href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </GlowButton>
            <GlowButton
              href={hero.secondaryCta.href}
              variant="ghost"
              showArrow={false}
            >
              {hero.secondaryCta.label}
            </GlowButton>
          </div>

          {/* ---- Stats ---- */}
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
            {hero.stats.map((s) => (
              <div key={s.label} data-hero="stat">
                <dt className="font-display text-2xl font-bold text-cyan sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-faint">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#services"
        aria-label="Прокрутить вниз"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-cyan lg:flex"
      >
        <span className="eyebrow text-[0.65rem]">Scroll</span>
        <span className="relative h-10 w-6 rounded-full border border-line">
          <span className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 animate-bounce rounded-full bg-cyan" />
        </span>
      </a>
    </section>
  );
}
