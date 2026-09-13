import { ArrowRight, Check } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { formatPrice, type PricingPackage } from "@/lib/pricing-data";

export function PricingCard({ plan, featured = false }: { plan: PricingPackage; featured?: boolean }) {
  const quoteHref = `mailto:info@tradebridge-global.com?subject=${encodeURIComponent(`TradeBridge Digital Quote — ${plan.name}`)}`;

  return <article className={`flex min-h-[480px] flex-col rounded-2xl border p-6 sm:p-8 ${featured ? "border-blue-500 bg-[#0a1a2f] text-white shadow-[0_24px_70px_rgba(10,26,47,.18)]" : "border-slate-200 bg-white text-[#0a1a2f] shadow-[0_16px_45px_rgba(10,26,47,.05)]"}`}>
    <div className="flex items-center justify-between gap-4"><span className={`text-xs font-extrabold uppercase tracking-[.16em] ${featured ? "text-blue-300" : "text-blue-700"}`}>{plan.name}</span>{featured && <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-white">Popular starting point</span>}</div>
    <div className="mt-7"><span className={`block text-sm font-semibold ${featured ? "text-slate-400" : "text-slate-500"}`}>Starting from</span><strong className="mt-1 block font-display text-4xl font-extrabold tracking-[-.045em] sm:text-5xl">{formatPrice(plan.price)}</strong></div>
    <p className={`mt-4 text-sm font-bold ${featured ? "text-blue-100" : "text-slate-700"}`}>{plan.audience}</p>
    <p className={`mt-3 text-sm leading-6 ${featured ? "text-slate-300" : "text-slate-600"}`}>{plan.description}</p>
    <div className={`mt-7 border-t pt-6 ${featured ? "border-white/10" : "border-slate-100"}`}><h2 className={`text-[11px] font-extrabold uppercase tracking-[.14em] ${featured ? "text-slate-400" : "text-slate-500"}`}>Possible inclusions</h2><ul className="mt-4 space-y-3">{plan.inclusions.map(item => <li key={item} className={`flex items-start gap-3 text-sm font-semibold ${featured ? "text-slate-200" : "text-slate-700"}`}><span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${featured ? "bg-blue-500/20 text-blue-200" : "bg-blue-50 text-blue-700"}`}><Check size={12} /></span>{item}</li>)}</ul></div>
    <a href={quoteHref} className={buttonStyles({ variant: featured ? "primary" : "outline", className: `mt-auto ${featured ? "bg-blue-600 hover:bg-blue-500" : ""}` })}>Discuss this package <ArrowRight size={16} /></a>
  </article>;
}
