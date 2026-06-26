"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/content";
import { Logo } from "@/components/ui/Logo";
import { GlowButton } from "@/components/ui/GlowButton";
import { Magnetic } from "@/components/ui/Magnetic";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Page-route nav items get an active indicator (in-page anchors don't).
  const isActive = (href: string) =>
    href.startsWith("/") && (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 transition-all duration-500 sm:px-6",
          scrolled
            ? "glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
            : "border border-transparent",
        )}
      >
        <Magnetic>
          <a href="/" aria-label="Soderiz — на главную">
            <Logo />
          </a>
        </Magnetic>

        {/* Desktop nav */}
        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative cursor-pointer rounded-full px-4 py-2 text-sm transition-colors hover:text-ink",
                      active ? "text-ink" : "text-muted",
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-cyan to-magenta"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <GlowButton href="#contact" showArrow={false} className="px-6 py-2.5">
            Связаться
          </GlowButton>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Мобильная навигация"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass mx-auto mt-3 max-w-7xl rounded-3xl p-4 lg:hidden"
          >
            <ul className="flex flex-col">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block cursor-pointer rounded-xl px-4 py-3 text-base transition-colors hover:bg-white/5 hover:text-cyan",
                        active ? "text-cyan" : "text-muted",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 px-2">
              <GlowButton href="#contact" className="w-full justify-center">
                Связаться
              </GlowButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
