import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FileCard } from "@/components/ui/FileCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { accreditationPage } from "@/data/pages";
import { about } from "@/data/content";

export const metadata: Metadata = {
  title: "ИТ аккредитация",
  description: accreditationPage.intro,
};

export default function AccreditationPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          eyebrow={accreditationPage.eyebrow}
          title={accreditationPage.title}
          lead={accreditationPage.intro}
          crumbs={[
            { label: "Главная", href: "/" },
            { label: "ИТ аккредитация" },
          ]}
          bg={{
            video: "/backgrounds/page-accreditation.mp4",
            poster: "/backgrounds/wave-mesh.webp",
            lightVideo: "/backgrounds/page-accreditation-light.mp4",
            lightPoster: "/backgrounds/wave-mesh-light.webp",
          }}
        />

        <section className="relative py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-6">
            {/* Highlight stats */}
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
              {accreditationPage.highlights.map((h) => (
                <div key={h.label} className="bg-surface/80 p-8">
                  <div className="font-display text-3xl font-extrabold text-neon-gradient">
                    {h.value}
                  </div>
                  <div className="mt-2 text-sm text-muted">{h.label}</div>
                </div>
              ))}
            </div>

            {/* Decision / registry records */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Reveal className="glass flex items-start gap-3 rounded-2xl p-6">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan" aria-hidden />
                <p className="text-sm leading-relaxed text-ink/90">
                  {about.accreditation.decision}
                </p>
              </Reveal>
              <Reveal delay={0.06} className="glass flex items-start gap-3 rounded-2xl p-6">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-magenta" aria-hidden />
                <p className="text-sm leading-relaxed text-ink/90">
                  {about.accreditation.registry}
                </p>
              </Reveal>
            </div>

            {/* Downloadable extract */}
            <div className="mt-10">
              <h2 className="font-display text-xl font-bold text-ink">
                Документы
              </h2>
              <div className="mt-5 max-w-2xl">
                <FileCard
                  icon="shield"
                  kind="Выписка из реестра"
                  title={accreditationPage.document.title}
                  meta={accreditationPage.document.description}
                  file={accreditationPage.document.file}
                />
              </div>
            </div>

            {/* Long-form info blocks */}
            <div className="mt-16 flex flex-col gap-12">
              {accreditationPage.blocks.map((block, i) => (
                <Reveal key={i} delay={(i % 2) * 0.06}>
                  <article className="rounded-3xl border border-line bg-surface/40 p-8 lg:p-10">
                    <h3 className="max-w-3xl font-display text-lg font-bold leading-snug text-ink">
                      {block.title}
                    </h3>
                    <p className="mt-5 max-w-prose leading-relaxed text-muted">
                      {block.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className="mt-14">
              <GlowButton href="#contact">Запросить документы</GlowButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
