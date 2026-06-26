"use client";

import { technologies } from "@/data/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBgVideo } from "@/components/backgrounds/SectionBgVideo";

export function Technologies() {
  return (
    <Section
      id="technologies"
      label="Технологии"
      backdrop={
        <SectionBgVideo
          video="/backgrounds/technologies.mp4"
          poster="/backgrounds/wave-mesh.webp"
          lightVideo="/backgrounds/technologies-light.mp4"
          lightPoster="/backgrounds/wave-mesh-light.webp"
          position="object-center"
          opacity={0.6}
          scrim="bg-void/52"
        />
      }
    >
      <SectionHeading
        eyebrow={technologies.eyebrow}
        title={technologies.title}
        description={technologies.description}
      />

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {technologies.groups.map((group, i) => (
          <Reveal
            key={group.name}
            delay={(i % 4) * 0.06}
            className="group relative bg-surface/80 p-7 transition-colors duration-300 hover:bg-surface-2"
          >
            <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-cyan to-magenta transition-transform duration-500 group-hover:scale-x-100" />
            <span className="eyebrow text-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-xl font-bold text-ink">
              {group.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {group.summary}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line px-3 py-1 text-xs text-ink/80 transition-colors group-hover:border-cyan/30"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
