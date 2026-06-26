"use client";

import { Check, ArrowRight } from "lucide-react";
import { solutions } from "@/data/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowButton } from "@/components/ui/GlowButton";
import { SectionBgVideo } from "@/components/backgrounds/SectionBgVideo";
import { cn } from "@/lib/utils";

const accentClasses = {
  cyan: { text: "text-cyan", ring: "shadow-cyan/30", bg: "bg-cyan/10", border: "border-cyan/30" },
  magenta: { text: "text-magenta", ring: "shadow-magenta/30", bg: "bg-magenta/10", border: "border-magenta/30" },
  blue: { text: "text-blue", ring: "shadow-blue/30", bg: "bg-blue/10", border: "border-blue/30" },
} as const;

export function Solutions() {
  return (
    <Section
      id="solutions"
      label="Решения"
      backdrop={
        <SectionBgVideo
          video="/backgrounds/solutions.mp4"
          poster="/backgrounds/neon-city.webp"
          lightVideo="/backgrounds/solutions-light.mp4"
          lightPoster="/backgrounds/neon-city-light.webp"
          position="object-bottom"
          opacity={0.6}
          scrim="bg-void/55"
        />
      }
    >
      <SectionHeading
        eyebrow={solutions.eyebrow}
        title={solutions.title}
        description={solutions.description}
      />

      <div className="mt-16 flex flex-col gap-12 lg:gap-20">
        {solutions.items.map((sol, i) => {
          const accent = accentClasses[sol.accent as keyof typeof accentClasses];
          const flip = i % 2 === 1;
          return (
            <div
              key={sol.id}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              {/* Copy */}
              <Reveal
                from={flip ? "left" : "right"}
                className={cn(flip && "lg:order-2")}
              >
                <span className={cn("eyebrow", accent.text)}>{sol.short}</span>
                <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                  {sol.name}
                </h3>
                <p className={cn("mt-3 text-lg font-medium", accent.text)}>
                  {sol.tagline}
                </p>
                <p className="mt-4 max-w-xl leading-relaxed text-muted">
                  {sol.description}
                </p>
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {sol.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink/90">
                      <Check
                        className={cn("mt-0.5 h-4 w-4 shrink-0", accent.text)}
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <GlowButton href="#contact" variant="ghost">
                    Запросить демо
                  </GlowButton>
                  <a
                    href={`/products/${sol.id}`}
                    className={cn(
                      "group inline-flex items-center gap-1.5 text-sm font-semibold transition-colors",
                      accent.text,
                    )}
                  >
                    Подробнее о продукте
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                </div>
              </Reveal>

              {/* Visual panel */}
              <Reveal
                from={flip ? "right" : "left"}
                delay={0.1}
                className={cn(flip && "lg:order-1")}
              >
                <div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden rounded-3xl border bg-surface/60 shadow-[0_0_60px_-20px]",
                    accent.border,
                    accent.ring,
                  )}
                >
                  {/* Neon ambience inside the panel */}
                  <div className={cn("absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl", accent.bg)} />
                  <div className="absolute inset-0 grid-backdrop opacity-50" />

                  {/* Floating metric chip */}
                  <div className="absolute left-6 top-6 glass rounded-2xl px-5 py-4">
                    <div className={cn("font-display text-3xl font-bold", accent.text)}>
                      {sol.metric.value}
                    </div>
                    <div className="mt-1 text-xs text-muted">{sol.metric.label}</div>
                  </div>

                  {/* Big ghost monogram */}
                  <span
                    className={cn(
                      "absolute bottom-4 right-6 select-none font-display text-7xl font-extrabold opacity-20 sm:text-8xl",
                      accent.text,
                    )}
                    aria-hidden
                  >
                    {sol.short.slice(0, 3)}
                  </span>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
