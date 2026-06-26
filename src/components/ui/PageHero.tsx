"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { SectionBgVideo } from "@/components/backgrounds/SectionBgVideo";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Crumb = { label: string; href?: string };

/** Pre-rendered Remotion ambient loop for the header backdrop (dark + light). */
type Bg = {
  video: string;
  poster: string;
  lightVideo: string;
  lightPoster: string;
};

/**
 * Compact hero for standalone sub-pages: breadcrumb → eyebrow → title → lead,
 * over the shared neon grid backdrop. Content staggers in on mount (ease-out),
 * and collapses to a static render under prefers-reduced-motion.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  bg,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  bg?: Bg;
}) {
  const reduced = usePrefersReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.09, delayChildren: 0.05 },
    },
  };
  const item: Variants = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <header className="relative overflow-hidden border-b border-line pt-36 pb-16 lg:pt-44 lg:pb-20">
      {/* Animated Remotion ambient loop (optional) */}
      {bg && (
        <SectionBgVideo
          video={bg.video}
          poster={bg.poster}
          lightVideo={bg.lightVideo}
          lightPoster={bg.lightPoster}
          opacity={0.5}
          position="object-center"
          scrim="bg-void/68"
          lightScrim="bg-void/30"
        />
      )}

      {/* Neon grid + glow backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className={`absolute inset-0 grid-backdrop ${bg ? "opacity-20" : "opacity-40"}`} />
        <motion.div
          className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan/10 blur-[120px]"
          initial={reduced ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <motion.div
          className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-magenta/10 blur-[130px]"
          initial={reduced ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-7xl px-6"
      >
        {crumbs && crumbs.length > 0 && (
          <motion.nav
            variants={item}
            aria-label="Хлебные крошки"
            className="mb-7 flex flex-wrap items-center gap-1.5 text-sm text-faint"
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="inline-flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
                {c.href ? (
                  <Link
                    href={c.href}
                    className="cursor-pointer transition-colors hover:text-cyan"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-muted">{c.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.div variants={item}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1
          variants={item}
          className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {lead && (
          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          >
            {lead}
          </motion.p>
        )}
        {children && (
          <motion.div variants={item} className="mt-9">
            {children}
          </motion.div>
        )}
      </motion.div>
    </header>
  );
}
