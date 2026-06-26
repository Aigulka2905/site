"use client";

import { Compass, Code2, ServerCog, Headset, type LucideIcon } from "lucide-react";
import { services } from "@/data/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  Compass,
  Code2,
  ServerCog,
  Headset,
};

export function Services() {
  return (
    <Section id="services" label="Услуги">
      <SectionHeading
        eyebrow={services.eyebrow}
        title={services.title}
        description={services.description}
      />

      {/* Bento grid: large + medium tiles alternate across two rows. */}
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-5">
        {services.items.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <Reveal
              key={item.id}
              delay={(i % 2) * 0.08}
              className={cn(
                item.span === "lg" ? "md:col-span-3" : "md:col-span-2",
              )}
            >
              <TiltCard className="h-full">
                <div className="flex h-full flex-col gap-5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan/25 bg-cyan/10 text-cyan">
                    {Icon && <Icon className="h-6 w-6" aria-hidden />}
                  </span>
                  <div className="mt-auto">
                    <h3 className="font-display text-2xl font-bold text-ink">
                      {item.name}
                    </h3>
                    <p className="mt-3 max-w-md leading-relaxed text-muted">
                      {item.summary}
                    </p>
                  </div>
                  <span className="eyebrow text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
