import { site, footer } from "@/data/content";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {footer.description}
            </p>
            <p className="mt-5 text-sm text-faint">
              {site.legalName} · ИНН {site.inn}
            </p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow text-faint">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-cyan"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Все права защищены.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-cyan"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
