import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { GlowButton } from "@/components/ui/GlowButton";
import { ServiceTabs } from "@/components/sections/ServiceTabs";
import { servicesPage } from "@/data/pages";

export const metadata: Metadata = {
  title: "Услуги",
  description: servicesPage.description,
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          eyebrow={servicesPage.eyebrow}
          title={servicesPage.title}
          lead={servicesPage.description}
          crumbs={[{ label: "Главная", href: "/" }, { label: "Услуги" }]}
          bg={{
            video: "/backgrounds/page-services.mp4",
            poster: "/backgrounds/waves-neon.webp",
            lightVideo: "/backgrounds/page-services-light.mp4",
            lightPoster: "/backgrounds/waves-neon-light.webp",
          }}
        >
          <GlowButton href="#contact">Обсудить задачу</GlowButton>
        </PageHero>

        <section className="relative py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-6">
            <ServiceTabs />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
