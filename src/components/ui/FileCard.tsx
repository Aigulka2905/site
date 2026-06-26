import { FileText, Download, ShieldCheck, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const accentText = {
  cyan: "text-cyan",
  magenta: "text-magenta",
  blue: "text-blue",
} as const;

const accentBorder = {
  cyan: "hover:border-cyan/40",
  magenta: "hover:border-magenta/40",
  blue: "hover:border-blue/40",
} as const;

/**
 * Downloadable document card — patents, ЭВМ-registration certificates and the
 * accreditation extract. Renders as an anchor with the `download` attribute.
 */
export function FileCard({
  kind,
  title,
  meta,
  file,
  accent = "cyan",
  icon = "file",
}: {
  /** Small label badge, e.g. "Патент" / "Свидетельство". */
  kind?: string;
  title: string;
  /** Secondary line: number, date, etc. */
  meta?: string;
  file: string;
  accent?: "cyan" | "magenta" | "blue";
  icon?: "file" | "shield" | "award";
}) {
  const Icon = icon === "shield" ? ShieldCheck : icon === "award" ? Award : FileText;

  return (
    <a
      href={file}
      download
      className={cn(
        "group flex items-start gap-4 rounded-2xl border border-line bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-2",
        accentBorder[accent],
      )}
    >
      <span
        className={cn(
          "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-void/50",
          accentText[accent],
        )}
      >
        <Icon className="h-6 w-6" aria-hidden />
      </span>

      <div className="min-w-0 flex-1">
        {kind && (
          <span className={cn("eyebrow", accentText[accent])}>{kind}</span>
        )}
        <p className="mt-1.5 text-sm font-medium leading-snug text-ink">
          {title}
        </p>
        {meta && <p className="mt-1 text-xs text-muted">{meta}</p>}
      </div>

      <Download
        className="mt-1 h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-cyan"
        aria-hidden
      />
    </a>
  );
}
