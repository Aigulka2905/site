"use client";

import { cases } from "@/data/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Spark } from "@/components/ui/Logo";

export function Cases() {
  // Duplicate the list so the marquee loops seamlessly.
  const track = [...cases.items, ...cases.items];

  return (
    <Section id="cases" label="Проекты">
      <SectionHeading
        eyebrow={cases.eyebrow}
        title={cases.title}
        description={cases.description}
      />

      <Reveal className="mt-14">
        <div
          className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
          aria-label="Запущенные платформы"
        >
          <ul className="marquee flex w-max gap-4 py-2">
            {track.map((item, i) => (
              <li
                key={`${item.short}-${i}`}
                className="glass flex min-w-[230px] items-center gap-4 rounded-2xl px-6 py-5"
                aria-hidden={i >= cases.items.length}
              >
                <Spark className="h-7 w-7 shrink-0 text-cyan" />
                <div>
                  <div className="font-display font-bold text-ink">{item.name}</div>
                  <div className="mt-0.5 text-xs text-faint">{item.kind}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <style>{`
        @keyframes soderiz-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .marquee { animation: soderiz-marquee 36s linear infinite; }
        .marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee { animation: none; flex-wrap: wrap; }
        }
      `}</style>
    </Section>
  );
}
