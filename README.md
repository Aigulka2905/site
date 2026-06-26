# Soderiz — Animated Landing Page

Премиальный одностраничный лендинг для IT-компании **ООО «Содериз»** (разработка ПО, цифровые платформы, электронные торговые площадки, автоматизация бизнес-процессов).

Тёмная неоновая тема с глассморфизмом: глубокий сине-чёрный фон, яркий cyan-акцент, magenta/purple неон. Кинетическая типографика, scroll-driven анимации, 3D-сцена и кастомный курсор.

## Стек

| Слой | Технология |
|------|-----------|
| Фреймворк | **Next.js 16** (App Router) + React 19 + TypeScript |
| Стили | **Tailwind CSS v4** (токены через `@theme` в `globals.css`) |
| Скролл-анимации | **GSAP** + **ScrollTrigger** |
| Плавный скролл | **Lenis** (привязан к ticker'у GSAP) |
| UI-анимации | **Framer Motion** (reveal, tilt, magnetic, mobile-меню) |
| 3D | **React Three Fiber** + **drei** (морфящийся кристалл, lazy `ssr:false`) |
| Иконки | **lucide-react** |
| Шрифты | `next/font` — Manrope (display), Inter (body), JetBrains Mono (labels). Все с кириллицей. |

> **Примечание о версии.** Брифом запрашивался Next.js 15, но `create-next-app` поставил 16.2.9. Весь стек (GSAP/Lenis/Framer/R3F) полностью совместим с App Router 16. Чтобы зафиксировать 15 — `npm i next@15 eslint-config-next@15`.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production-сборка
npm run start    # production-сервер
```

## Структура

```
src/
├─ app/
│  ├─ layout.tsx        # шрифты, metadata, JSON-LD (Organization), провайдеры
│  ├─ page.tsx          # композиция секций
│  ├─ globals.css       # дизайн-токены @theme, базовые стили, утилиты
│  ├─ sitemap.ts        # SEO sitemap
│  └─ robots.ts         # SEO robots
├─ components/
│  ├─ providers/
│  │  ├─ SmoothScrollProvider.tsx   # Lenis + GSAP ticker, anchor-скролл, reduced-motion
│  │  └─ Cursor.tsx                 # кастомный неоновый курсор (dot + lagging ring)
│  ├─ layout/
│  │  ├─ Header.tsx     # sticky glass-навигация + мобильное меню
│  │  └─ Footer.tsx
│  ├─ sections/
│  │  ├─ Hero.tsx           # кинетическая типографика (GSAP timeline) + параллакс
│  │  ├─ Services.tsx       # bento-сетка услуг
│  │  ├─ Solutions.tsx      # чередующиеся фичи-ряды (ЭТП / Маркет / Signall)
│  │  ├─ Cases.tsx          # бесконечный marquee платформ
│  │  ├─ Technologies.tsx   # сетка технологического стека
│  │  ├─ About.tsx          # о компании + принципы + аккредитация
│  │  └─ Contact.tsx        # форма заявки с валидацией + CTA
│  ├─ three/
│  │  └─ NeonScene.tsx  # R3F кристалл (MeshDistortMaterial)
│  └─ ui/                # Eyebrow, Reveal, SectionHeading, GlowButton, TiltCard,
│                        # Magnetic, Logo/Spark, Aurora, Section
├─ data/
│  └─ content.ts        # ВЕСЬ контент сайта (single source of truth)
└─ lib/
   ├─ gsap.ts           # регистрация ScrollTrigger
   ├─ hooks.ts          # usePrefersReducedMotion, useMediaQuery, useMounted, …
   └─ utils.ts          # cn()
```

## Дизайн-токены

Определены в `src/app/globals.css` через `@theme` (Tailwind v4) — становятся утилитами автоматически:

| Токен | Значение | Утилита |
|-------|----------|---------|
| `--color-void` | `#07090f` | `bg-void` |
| `--color-surface` | `#0d121e` | `bg-surface` |
| `--color-cyan` | `#16e7e7` | `text-cyan` |
| `--color-magenta` | `#c026f7` | `text-magenta` |
| `--color-purple` | `#7b3ff2` | `text-purple` |
| `--color-blue` | `#2d6bff` | `text-blue` |

Кастомные утилиты: `text-neon-gradient`, `glass`, `glow-ring`, `grid-backdrop`, `eyebrow`.

## Анимации

- **Hero** — GSAP timeline: пословный подъём заголовка (rotateX + stagger), каскад подзаголовка / CTA / статистики; параллакс визуала на скролле.
- **Reveal** — обёртка на Framer Motion `whileInView` (срабатывает один раз), направление `up/down/left/right`.
- **TiltCard** — 3D-наклон по курсору + следящий spotlight-glow.
- **Magnetic** — магнитное притяжение логотипа/кнопок к курсору.
- **Cases** — CSS-marquee с бесшовным циклом, пауза на hover.
- **Cursor** — мгновенная точка + догоняющее кольцо, расширяется над интерактивными элементами.

## Доступность

- Семантические landmark'и (`header`/`main`/`footer`/`nav`/`section[aria-label]`).
- `lang="ru"`, видимые `:focus-visible` кольца, `aria-label` у иконочных кнопок.
- Связанные `label` + `aria-invalid`/`aria-describedby` у формы.
- **Полное уважение `prefers-reduced-motion`**: Lenis и кастомный курсор отключаются, Reveal рендерит финальное состояние сразу, marquee останавливается, CSS-анимации замораживаются глобальным правилом.
- Контрастный неоновый текст на тёмном фоне; цвет — не единственный индикатор.

## SEO

- Next Metadata API: title-template, description, keywords, OpenGraph, Twitter.
- JSON-LD `Organization` в `layout.tsx`.
- `sitemap.ts` и `robots.ts`.
- `lang="ru"`, `themeColor`, корректный `viewport`.

## Контент

Весь текст вынесен в `src/data/content.ts` — редактирование одной строки меняет страницу, без правок разметки. Источник — текущий сайт soderiz.ru.

## Заметки по производительности

- R3F-сцена грузится через `dynamic(..., { ssr: false })` — не блокирует первый рендер.
- `dpr={[1, 1.8]}`, low-poly геометрия, ограниченное число источников света.
- Анимации только на `transform`/`opacity`.
- Шрифты self-hosted через `next/font` (без layout shift).
