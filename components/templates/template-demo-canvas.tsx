import type { CSSProperties } from "react";
import type { WebsiteTemplate } from "@/lib/templates/types";
import { getTemplateVisualTheme } from "@/lib/templates/themes";

export function TemplateDemoCanvas({ template }: { template: WebsiteTemplate }) {
  const theme = getTemplateVisualTheme(template.style);
  const visualStyle = {
    "--demo-bg": theme.background,
    "--demo-surface": theme.surface,
    "--demo-text": theme.text,
    "--demo-muted": theme.muted,
    "--demo-accent": theme.accent,
    "--demo-accent-soft": theme.accentSoft,
  } as CSSProperties;

  return (
    <div style={visualStyle} className="overflow-hidden rounded-2xl border border-slate-200 bg-[var(--demo-bg)] text-[var(--demo-text)] shadow-[0_30px_90px_rgba(10,26,47,.14)]">
      <div className="flex min-h-16 items-center justify-between gap-6 border-b border-current/10 px-5 sm:px-8">
        <span className="font-display text-base font-extrabold">{template.name}</span>
        <div className="hidden items-center gap-6 text-xs font-bold text-[var(--demo-muted)] sm:flex">
          {template.pages.slice(0, 4).map(page => <span key={page}>{page}</span>)}
        </div>
        <span className="rounded-full bg-[var(--demo-accent)] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.1em] text-white">Start here</span>
      </div>

      <div className="grid min-h-[500px] gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-16 lg:py-20">
        <div>
          <span className="inline-flex rounded-full bg-[var(--demo-accent-soft)] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.14em] text-slate-800">{template.industry} concept</span>
          <h1 className="mt-6 max-w-xl font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[.98] tracking-[-.06em]">A clearer digital home for your business.</h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-[var(--demo-muted)] sm:text-base">{template.short_description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-xl bg-[var(--demo-accent)] px-5 py-3 text-sm font-extrabold text-white">Primary action</span>
            <span className="rounded-xl border border-current/20 px-5 py-3 text-sm font-extrabold">Explore services</span>
          </div>
        </div>

        <div className="relative min-h-80 rounded-[1.75rem] bg-[var(--demo-surface)] p-5 shadow-2xl shadow-black/10 sm:p-7">
          <div className="h-40 rounded-2xl bg-[var(--demo-accent-soft)] p-5">
            <div className="h-2 w-20 rounded-full bg-[var(--demo-accent)] opacity-70" />
            <div className="mt-5 h-4 w-4/5 rounded-full bg-[var(--demo-text)] opacity-80" />
            <div className="mt-3 h-4 w-3/5 rounded-full bg-[var(--demo-text)] opacity-40" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {template.features.slice(0, 4).map((feature, index) => (
              <div key={feature} className="min-h-24 rounded-xl border border-current/10 p-4">
                <span className="grid size-7 place-items-center rounded-lg bg-[var(--demo-accent-soft)] text-xs font-extrabold text-slate-800">0{index + 1}</span>
                <span className="mt-3 block text-xs font-bold leading-5">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
