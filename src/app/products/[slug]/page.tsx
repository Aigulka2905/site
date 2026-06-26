import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FileCard } from "@/components/ui/FileCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { products } from "@/data/pages";
import { cn } from "@/lib/utils";

const accentText = {
  cyan: "text-cyan",
  magenta: "text-magenta",
  blue: "text-blue",
} as const;

const accentBorder = {
  cyan: "border-cyan/30",
  magenta: "border-magenta/30",
  blue: "border-blue/30",
} as const;

const accentBg = {
  cyan: "bg-cyan/10",
  magenta: "bg-magenta/10",
  blue: "bg-blue/10",
} as const;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Продукт не найден" };
  return {
    title: `${product.name}`,
    description: product.intro,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const accent = product.accent;

  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          eyebrow={`Продукт · ${product.short}`}
          title={product.name}
          lead={product.tagline}
          crumbs={[
            { label: "Главная", href: "/" },
            { label: "Продукты", href: "/#solutions" },
            { label: product.short },
          ]}
          bg={{
            video: "/backgrounds/page-product.mp4",
            poster: product.poster,
            lightVideo: "/backgrounds/page-product-light.mp4",
            lightPoster: "/backgrounds/neon-city-light.webp",
          }}
        >
          <GlowButton href="#contact">Запросить демо</GlowButton>
        </PageHero>

        <section className="relative py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              {/* Overview */}
              <div>
                <p className="text-xl font-semibold leading-snug text-ink">
                  {product.intro}
                </p>
                <div className="mt-8 flex flex-col gap-5">
                  {product.overview.map((p, i) => (
                    <Reveal key={i} delay={i * 0.05}>
                      <p className="leading-relaxed text-muted">{p}</p>
                    </Reveal>
                  ))}
                </div>

                <h2 className="mt-12 font-display text-xl font-bold text-ink">
                  Возможности
                </h2>
                <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink/90">
                      <Check
                        className={cn("mt-0.5 h-4 w-4 shrink-0", accentText[accent])}
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual panel + metric */}
              <Reveal from="left" delay={0.1}>
                <div
                  className={cn(
                    "group relative aspect-[4/3] overflow-hidden rounded-3xl border bg-surface/60",
                    accentBorder[accent],
                  )}
                >
                  <Image
                    src={product.poster}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover opacity-70 transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
                  <div
                    className={cn(
                      "absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl",
                      accentBg[accent],
                    )}
                  />
                  <div className="absolute left-6 top-6 glass rounded-2xl px-5 py-4">
                    <div className={cn("font-display text-3xl font-bold", accentText[accent])}>
                      {product.metric.value}
                    </div>
                    <div className="mt-1 text-xs text-muted">
                      {product.metric.label}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "absolute bottom-4 right-6 select-none font-display text-7xl font-extrabold opacity-20",
                      accentText[accent],
                    )}
                    aria-hidden
                  >
                    {product.short.slice(0, 3)}
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Patents & certificates */}
            <div className="mt-20 border-t border-line pt-14">
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                Патенты и свидетельства
              </h2>
              <p className="mt-3 max-w-2xl text-muted">
                Исключительные права на программное обеспечение принадлежат
                ООО «Содериз». Ниже — подтверждающие документы. Нажмите, чтобы
                скачать файл.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {product.patents.map((doc) => (
                  <FileCard
                    key={doc.file}
                    icon={doc.kind === "Патент" ? "award" : "file"}
                    kind={doc.kind}
                    title={doc.title}
                    meta={`${doc.number} · ${doc.date}`}
                    file={doc.file}
                    accent={accent}
                  />
                ))}
              </div>
            </div>

            {/* Other products */}
            <div className="mt-20 border-t border-line pt-14">
              <h2 className="font-display text-xl font-bold text-ink">
                Другие продукты
              </h2>
              <div className="mt-6 flex flex-wrap gap-4">
                {products
                  .filter((p) => p.slug !== product.slug)
                  .map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-5 py-2.5 text-sm text-muted transition-colors hover:border-cyan/40 hover:text-ink"
                    >
                      {p.name}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
