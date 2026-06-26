"use client";

import { manifesto } from "@/data/pages";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Solid, video-free band that separates the two animated-video sections
 * (About ↔ Contact) so they no longer bleed into one another. A large pull
 * quote from soderiz.ru anchored by three headline stats.
 */
export function Manifesto() {
  return (
    <section
      aria-label="Почему Содериз"
      className="relative overflow-hidden border-y border-line bg-surface/30 py-24 lg:py-32"
    >
      {/* Subtle, static neon wash — deliberately no moving video here */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-backdrop opacity-25" />
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-magenta/10 blur-[130px]" />
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-cyan/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
        <Reveal>
          <Eyebrow className="justify-center">{manifesto.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <blockquote className="mx-auto mt-8 max-w-4xl text-balance font-display text-2xl font-bold leading-snug text-ink sm:text-3xl lg:text-[2.5rem] lg:leading-[1.2]">
            «{manifesto.quote}»
          </blockquote>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
            {manifesto.points.map((p) => (
              <div key={p.label} className="bg-void/60 px-6 py-8">
                <dt className="font-display text-4xl font-extrabold text-neon-gradient">
                  {p.value}
                </dt>
                <dd className="mt-2 text-sm text-muted">{p.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
