"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { nav } from "@/data/content";
import { Logo } from "@/components/ui/Logo";
import { GlowButton } from "@/components/ui/GlowButton";
import { Magnetic } from "@/components/ui/Magnetic";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

type NavLeaf = { label: string; href: string };
type NavItem = NavLeaf | { label: string; children: readonly NavLeaf[] };

const hasChildren = (item: NavItem): item is { label: string; children: readonly NavLeaf[] } =>
  "children" in item;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null); // mobile accordion
  const pathname = usePathname();

  // Page-route nav items get an active indicator (in-page anchors don't).
  const isActive = (href: string) =>
    href.startsWith("/") &&
    (href === "/" ? pathname === "/" : pathname.startsWith(href));

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
            {(nav as readonly NavItem[]).map((item) =>
              hasChildren(item) ? (
                <NavDropdown
                  key={item.label}
                  label={item.label}
                  items={item.children}
                  active={item.children.some((c) => isActive(c.href))}
                  isActive={isActive}
                />
              ) : (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative cursor-pointer rounded-full px-4 py-2 text-sm transition-colors hover:text-ink",
                      isActive(item.href) ? "text-ink" : "text-muted",
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-cyan to-magenta"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              ),
            )}
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
              {(nav as readonly NavItem[]).map((item) =>
                hasChildren(item) ? (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGroup((g) => (g === item.label ? null : item.label))
                      }
                      aria-expanded={openGroup === item.label}
                      className="flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-base text-muted transition-colors hover:bg-white/5 hover:text-cyan"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openGroup === item.label && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openGroup === item.label && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-3"
                        >
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <a
                                href={c.href}
                                onClick={() => setOpen(false)}
                                aria-current={isActive(c.href) ? "page" : undefined}
                                className={cn(
                                  "block cursor-pointer rounded-xl px-4 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-cyan",
                                  isActive(c.href) ? "text-cyan" : "text-muted",
                                )}
                              >
                                {c.label}
                              </a>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "block cursor-pointer rounded-xl px-4 py-3 text-base transition-colors hover:bg-white/5 hover:text-cyan",
                        isActive(item.href) ? "text-cyan" : "text-muted",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ),
              )}
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

/** Desktop hover/focus dropdown for a nav group (e.g. Продукты). */
function NavDropdown({
  label,
  items,
  active,
  isActive,
}: {
  label: string;
  items: readonly NavLeaf[];
  active: boolean;
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        className={cn(
          "relative flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors hover:text-ink",
          active ? "text-ink" : "text-muted",
        )}
      >
        {label}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          aria-hidden
        />
        {active && (
          <motion.span
            layoutId="nav-active"
            className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-cyan to-magenta"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute left-0 top-full mt-2 w-72 rounded-2xl p-2 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
          >
            {items.map((c) => (
              <li key={c.href} role="none">
                <a
                  role="menuitem"
                  href={c.href}
                  aria-current={isActive(c.href) ? "page" : undefined}
                  className={cn(
                    "block cursor-pointer rounded-xl px-4 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-cyan",
                    isActive(c.href) ? "text-cyan" : "text-ink/90",
                  )}
                >
                  {c.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
