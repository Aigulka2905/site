"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { servicesPage } from "@/data/pages";
import { cn } from "@/lib/utils";

type Tab = (typeof servicesPage.tabs)[number];

const accentText = {
  cyan: "text-cyan",
  magenta: "text-magenta",
  blue: "text-blue",
} as const;

const accentDot = {
  cyan: "bg-cyan/10 border-cyan/30 text-cyan",
  magenta: "bg-magenta/10 border-magenta/30 text-magenta",
  blue: "bg-blue/10 border-blue/30 text-blue",
} as const;

export function ServiceTabs() {
  const [active, setActive] = useState(0);
  const tab = servicesPage.tabs[active];

  return (
    <div>
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Услуги"
        className="flex flex-wrap gap-x-2 gap-y-1 border-b border-line"
      >
        {servicesPage.tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setActive(i)}
              className={cn(
                "relative cursor-pointer px-4 py-4 text-sm font-semibold tracking-wide transition-colors sm:px-6 sm:text-base",
                selected ? "text-ink" : "text-faint hover:text-muted",
              )}
            >
              {t.name}
              {selected && (
                <motion.span
                  layoutId="service-tab-underline"
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-cyan to-magenta"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab.id}
          role="tabpanel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pt-12"
        >
          <Panel tab={tab} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Panel({ tab }: { tab: Tab }) {
  const accent = tab.accent as keyof typeof accentText;
  const goals = "goals" in tab ? tab.goals : undefined;

  return (
    <div>
      <p className="max-w-3xl text-xl font-semibold leading-snug text-ink">
        {tab.lead}
      </p>
      <div className="mt-6 h-px w-full bg-gradient-to-r from-cyan/50 via-magenta/30 to-transparent" />
      <p className="mt-6 max-w-3xl leading-relaxed text-muted">{tab.body}</p>

      {/* Optional goals grid (support tab) */}
      {goals && (
        <>
          <h3 className="mt-12 font-display text-xl font-bold text-ink">
            {(tab as Extract<Tab, { goalsTitle: string }>).goalsTitle}
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {goals.map((g, i) => (
              <div
                key={i}
                className="rounded-2xl border border-line bg-surface/50 p-5 text-sm leading-relaxed text-muted"
              >
                {g}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Steps */}
      <h3 className="mt-14 font-display text-xl font-bold text-ink">
        {tab.listTitle}
      </h3>
      <ol className="mt-7 grid grid-cols-1 gap-x-10 gap-y-7 lg:grid-cols-2">
        {tab.steps.map((step, i) => (
          <li key={i} className="flex items-start gap-4">
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold",
                accentDot[accent],
              )}
            >
              {i + 1}
            </span>
            <div>
              <h4 className="font-display font-bold text-ink">{step.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Inline feature ribbon */}
      <div className="mt-12 flex flex-wrap items-center gap-2">
        <Check className={cn("h-4 w-4", accentText[accent])} aria-hidden />
        <span className="text-sm text-faint">
          Полный цикл услуги «{tab.name}» под ключ
        </span>
      </div>
    </div>
  );
}
