import type { Metadata } from "next";
import { Plus, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { projectsPage } from "@/data/pages";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Проекты",
  description: projectsPage.description,
};

const accentText = {
  cyan: "text-cyan",
  magenta: "text-magenta",
  blue: "text-blue",
} as const;

const accentBorder = {
  cyan: "hover:border-cyan/40",
  magenta: "hover:border-magenta/40",
  blue: "hover:border-blue/40",
} as const;

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          eyebrow={projectsPage.eyebrow}
          title={projectsPage.title}
          lead={projectsPage.description}
          crumbs={[{ label: "Главная", href: "/" }, { label: "Проекты" }]}
          bg={{
            video: "/backgrounds/page-projects.mp4",
            poster: "/backgrounds/liquid-blobs.webp",
            lightVideo: "/backgrounds/page-projects-light.mp4",
            lightPoster: "/backgrounds/liquid-blobs-light.webp",
          }}
        />

        <section className="relative py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projectsPage.items.map((p, i) => {
                const accent = p.accent as keyof typeof accentText;
                return (
                  <Reveal
                    key={p.name}
                    delay={(i % 3) * 0.06}
                    className={cn(
                      "group relative flex flex-col rounded-3xl border border-line bg-surface/50 p-7 transition-all duration-300 hover:-translate-y-1",
                      accentBorder[accent],
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "inline-flex rounded-full border border-line px-3 py-1 text-xs font-medium",
                          accentText[accent],
                        )}
                      >
                        {p.kind}
                      </span>
                      <span
                        className={cn(
                          "select-none font-display text-5xl font-extrabold opacity-10",
                          accentText[accent],
                        )}
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-8 font-display text-xl font-bold text-ink">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {p.text}
                    </p>
                  </Reveal>
                );
              })}

              {/* "Your project" CTA card */}
              <Reveal
                delay={0.06}
                className="group relative flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-surface/30 p-7 text-center transition-colors hover:border-cyan/40"
              >
                <a
                  href="/#contact"
                  className="flex flex-col items-center"
                  aria-label={projectsPage.cta.name}
                >
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan/30 bg-cyan/10 text-cyan transition-transform duration-300 group-hover:scale-110">
                    <Plus className="h-8 w-8" aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold text-ink">
                    {projectsPage.cta.name}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                    {projectsPage.cta.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan">
                    Отправить запрос
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
