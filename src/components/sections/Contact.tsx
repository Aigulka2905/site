"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { contact, site } from "@/data/content";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBgVideo } from "@/components/backgrounds/SectionBgVideo";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "phone" | "email" | "consent", string>>;

export function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(data.get("name") || "").trim()) next.name = "Укажите, как к вам обращаться";
    if (!String(data.get("phone") || "").trim()) next.phone = "Введите номер телефона";
    const email = String(data.get("email") || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Введите корректную почту";
    if (!data.get("consent")) next.consent = "Необходимо согласие с политикой";

    setErrors(next);
    if (Object.keys(next).length === 0) {
      // Front-end demo only — no backend wired up.
      setSent(true);
    }
  };

  return (
    <Section
      id="contact"
      label="Контакты"
      backdrop={
        <SectionBgVideo
          video="/backgrounds/contact.mp4"
          poster="/backgrounds/liquid-blue.webp"
          lightVideo="/backgrounds/contact-light.mp4"
          lightPoster="/backgrounds/liquid-blue-light.webp"
          position="object-right"
          opacity={0.65}
          scrim="bg-void/55"
        />
      }
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface/40 p-8 backdrop-blur-md sm:p-12 lg:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan/10 blur-[100px]" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-magenta/10 blur-[110px]" />

        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Pitch + steps */}
          <div>
            <Reveal>
              <Eyebrow>{contact.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                {contact.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg leading-relaxed text-muted">
                {contact.lead}
              </p>
            </Reveal>

            <Reveal delay={0.15} as="ol" className="mt-9 flex flex-col gap-4">
              {contact.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 text-xs font-bold text-cyan">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-ink/90">{step}</span>
                </li>
              ))}
            </Reveal>

            <Reveal delay={0.2} className="mt-9 flex flex-col gap-1 border-t border-line pt-6 text-sm">
              <a href={`mailto:${site.email}`} className="text-cyan transition-colors hover:text-cyan-bright">
                {site.email}
              </a>
              <span className="text-faint">{site.address}</span>
            </Reveal>
          </div>

          {/* Form / success */}
          <Reveal from="left" delay={0.1}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass flex h-full flex-col items-center justify-center gap-4 rounded-3xl p-10 text-center"
                  role="status"
                >
                  <CheckCircle2 className="h-14 w-14 text-cyan" aria-hidden />
                  <h3 className="font-display text-2xl font-bold text-ink">
                    Заявка получена
                  </h3>
                  <p className="max-w-sm text-muted">
                    Наш менеджер свяжется с вами, чтобы обсудить задачи и предложить
                    оптимальное решение.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass flex flex-col gap-5 rounded-3xl p-7 sm:p-8"
                >
                  <Field id="name" label="Как к вам обращаться?" error={errors.name} />
                  <Field id="phone" label="Номер телефона" type="tel" error={errors.phone} />
                  <Field id="email" label="Электронная почта" type="email" error={errors.email} />
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm text-muted">
                      Краткое описание задачи
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className="resize-none rounded-xl border border-line bg-void/60 px-4 py-3 text-ink outline-none transition-colors placeholder:text-faint focus:border-cyan/50"
                      placeholder="Расскажите о проекте…"
                    />
                  </div>

                  <label className="flex items-start gap-3 text-sm text-muted">
                    <input
                      type="checkbox"
                      name="consent"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-cyan)]"
                    />
                    <span>
                      Я соглашаюсь с условиями{" "}
                      <a href="#" className="text-cyan underline-offset-2 hover:underline">
                        политики конфиденциальности
                      </a>
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="-mt-2 text-xs text-magenta">{errors.consent}</p>
                  )}

                  <button
                    type="submit"
                    className="mt-1 inline-flex items-center justify-center rounded-full bg-cyan px-7 py-3.5 text-sm font-semibold text-on-accent shadow-[0_0_30px_-6px] shadow-cyan/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_44px_-4px] hover:shadow-cyan/80"
                  >
                    Отправить заявку
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  type = "text",
  error,
}: {
  id: string;
  label: string;
  type?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-muted">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "rounded-xl border bg-void/60 px-4 py-3 text-ink outline-none transition-colors placeholder:text-faint focus:border-cyan/50",
          error ? "border-magenta/60" : "border-line",
        )}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-magenta">
          {error}
        </p>
      )}
    </div>
  );
}
