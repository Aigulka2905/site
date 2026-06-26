"use client";

import { ShieldCheck, BadgeCheck } from "lucide-react";
import { about } from "@/data/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBgVideo } from "@/components/backgrounds/SectionBgVideo";

export function About() {
  return (
    <Section
      id="about"
      label="О компании"
      backdrop={
        <SectionBgVideo
          video="/backgrounds/about.mp4"
          poster="/backgrounds/liquid-blobs.webp"
          lightVideo="/backgrounds/about-light.mp4"
          lightPoster="/backgrounds/liquid-blobs-light.webp"
          position="object-right"
          opacity={0.7}
          scrim="bg-void/50"
        />
      }
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
          <div className="mt-7 flex flex-col gap-4">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="max-w-xl leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* Accreditation card */}
          <Reveal delay={0.1} className="mt-9">
            <div className="glass flex flex-col gap-3 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-cyan" aria-hidden />
                <h3 className="font-display font-bold text-ink">
                  {about.accreditation.title}
                </h3>
              </div>
              <ul className="flex flex-col gap-2 pl-9 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-magenta" aria-hidden />
                  {about.accreditation.decision}
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-magenta" aria-hidden />
                  {about.accreditation.registry}
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Principles */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-4">
          {about.principles.map((pr, i) => (
            <Reveal
              key={pr.name}
              delay={(i % 2) * 0.08}
              className="group relative rounded-2xl border border-line bg-surface/50 p-6 transition-colors hover:border-cyan/30"
            >
              <span className="font-display text-3xl font-extrabold text-neon-gradient">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                {pr.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pr.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
