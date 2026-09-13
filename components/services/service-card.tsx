import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import type { DigitalService } from "@/lib/services-data";

type ServiceCardProps = {
  service: DigitalService;
  icon: LucideIcon;
  href?: string;
};

export function ServiceCard({ service, icon: Icon, href }: ServiceCardProps) {
  const quoteHref = `mailto:info@tradebridge-global.com?subject=${encodeURIComponent(`TradeBridge Digital — ${service.name}`)}`;

  return <article id={service.id} className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(10,26,47,.05)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_55px_rgba(10,26,47,.09)] sm:p-8">
    <div className="flex items-start justify-between gap-5">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon size={22} /></span>
      <span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-slate-400">Digital service</span>
    </div>
    <h2 className="mt-6 text-2xl font-extrabold leading-tight text-[#0a1a2f]">{service.name}</h2>
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      <div><h3 className="text-[11px] font-extrabold uppercase tracking-[.14em] text-slate-400">Business problem</h3><p className="mt-2 text-sm leading-6 text-slate-600">{service.problem}</p></div>
      <div><h3 className="text-[11px] font-extrabold uppercase tracking-[.14em] text-blue-700">Our solution</h3><p className="mt-2 text-sm leading-6 text-slate-700">{service.solution}</p></div>
    </div>
    <div className="mt-6 border-t border-slate-100 pt-5"><h3 className="text-[11px] font-extrabold uppercase tracking-[.14em] text-slate-400">Key deliverables</h3><ul className="mt-3 grid gap-2 sm:grid-cols-3">{service.deliverables.map(deliverable => <li key={deliverable} className="flex items-start gap-2 text-sm font-semibold leading-5 text-slate-700"><Check size={14} className="mt-0.5 shrink-0 text-blue-600" />{deliverable}</li>)}</ul></div>
    {href ? <Link href={href} className={buttonStyles({ variant: "outline", className: "mt-7" })}>View service <ArrowUpRight size={16} /></Link> : <a href={quoteHref} className={buttonStyles({ variant: "outline", className: "mt-7" })}>Discuss this service <ArrowUpRight size={16} /></a>}
  </article>;
}
