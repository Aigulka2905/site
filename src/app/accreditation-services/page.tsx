import type { Metadata } from "next";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { GlowButton } from "@/components/ui/GlowButton";
import { regServicesPage as p } from "@/data/pages";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Аккредитация, Роспатент и реестр ПО — под ключ",
  description: p.description,
  alternates: { canonical: "/accreditation-services" },
  openGraph: {
    title: "Аккредитация, Роспатент и реестр ПО — под ключ | Содериз",
    description: p.description,
  },
};

const accent = {
  cyan: { text: "text-cyan", border: "border-cyan/30", bg: "bg-cyan/10" },
  magenta: { text: "text-magenta", border: "border-magenta/30", bg: "bg-magenta/10" },
  blue: { text: "text-blue", border: "border-blue/30", bg: "bg-blue/10" },
} as const;

export default function AccreditationServicesPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          eyebrow={p.eyebrow}
          title={p.title}
          lead={p.lead}
          crumbs={[
            { label: "Главная", href: "/" },
            { label: "Аккредитация и реестр ПО" },
          ]}
          bg={{
            video: "/backgrounds/page-accreditation.mp4",
            poster: "/backgrounds/wave-mesh.webp",
            lightVideo: "/backgrounds/page-accreditation-light.mp4",
            lightPoster: "/backgrounds/wave-mesh-light.webp",
          }}
        >
          <GlowButton href="#contact">{p.cta.button}</GlowButton>
        </PageHero>

        <section className="relative py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-6">
            {/* Trust banner — Soderiz went through it itself */}
            <Reveal>
              <div className="glass flex flex-col gap-5 rounded-3xl p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="mt-0.5 h-7 w-7 shrink-0 text-cyan" aria-hidden />
                  <div>
                    <h2 className="font-display text-xl font-bold text-ink">
                      {p.trust.title}
                    </h2>
                    <p className="mt-2 max-w-2xl leading-relaxed text-muted">
                      {p.trust.text}
                    </p>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {p.trust.badges.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-xs font-medium text-cyan"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Service offerings */}
            <div className="mt-16 flex flex-col gap-6">
              {p.services.map((s, i) => {
                const a = accent[s.accent];
                return (
                  <Reveal key={s.id} delay={(i % 2) * 0.06}>
                    <article
                      className={cn(
                        "grid grid-cols-1 gap-8 rounded-3xl border bg-surface/40 p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-10",
                        a.border,
                      )}
                    >
                      <div>
                        <span className={cn("eyebrow", a.text)}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                          {s.name}
                        </h3>
                        <p className="mt-4 max-w-xl leading-relaxed text-muted">
                          {s.summary}
                        </p>
                        <div
                          className={cn(
                            "mt-6 flex items-start gap-3 rounded-2xl border p-4",
                            a.border,
                            a.bg,
                          )}
                        >
                          <ArrowRight className={cn("mt-0.5 h-5 w-5 shrink-0", a.text)} aria-hidden />
                          <p className="text-sm leading-relaxed text-ink/90">
                            {s.result}
                          </p>
                        </div>
                      </div>

                      <ul className="flex flex-col gap-3 lg:border-l lg:border-line lg:pl-12">
                        {s.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-3 text-sm leading-relaxed text-ink/90">
                            <Check className={cn("mt-0.5 h-4 w-4 shrink-0", a.text)} aria-hidden />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            {/* Process */}
            <div className="mt-20">
              <Reveal>
                <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Как мы работаем
                </h2>
              </Reveal>
              <ol className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
                {p.steps.map((step, i) => (
                  <Reveal
                    key={step.title}
                    delay={(i % 5) * 0.05}
                    as="li"
                    className="group relative bg-surface/80 p-7 transition-colors hover:bg-surface-2"
                  >
                    <span className="font-display text-3xl font-extrabold text-neon-gradient">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {step.text}
                    </p>
                  </Reveal>
                ))}
              </ol>
            </div>

            {/* CTA */}
            <Reveal className="mt-20">
              <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface/40 p-8 text-center sm:p-12">
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan/10 blur-[100px]" />
                <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-magenta/10 blur-[110px]" />
                <div className="relative">
                  <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                    {p.cta.title}
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
                    {p.cta.text}
                  </p>
                  <div className="mt-8 flex justify-center">
                    <GlowButton href="#contact">{p.cta.button}</GlowButton>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
