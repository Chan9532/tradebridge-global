import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CircleDot, Layers3, Route, UsersRound, WalletCards } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import type { ServiceDetail } from "@/lib/service-details-data";
import type { DigitalService } from "@/lib/services-data";

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);
}

export function ServiceDetailPage({ service, detail }: { service: DigitalService; detail: ServiceDetail }) {
  const quoteHref = `mailto:info@tradebridge-global.com?subject=${encodeURIComponent(`TradeBridge Digital Project — ${service.name}`)}`;

  return <article>
    <header className="relative isolate overflow-hidden bg-[#07152b] py-16 text-white sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 grid-lines opacity-40" />
      <div className="absolute -right-24 -top-32 -z-10 size-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="container-site">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-blue-200 transition hover:text-white"><ArrowLeft size={16} />All services</Link>
        <span className="mt-9 block text-xs font-extrabold uppercase tracking-[.17em] text-blue-300">{service.name}</span>
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-.055em]">{detail.headline}</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{detail.introduction}</p>
        <a href={quoteHref} className={buttonStyles({ size: "lg", className: "mt-8 bg-blue-500 hover:bg-blue-400" })}>Discuss your project <ArrowRight size={17} /></a>
      </div>
    </header>

    <section className="section-pad bg-white">
      <div className="container-site grid items-start gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <div><span className="eyebrow">Business problem</span><h2 className="section-title mt-4">{detail.problem.title}</h2><p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">{detail.problem.description}</p></div>
        <aside className="rounded-2xl border border-slate-200 bg-[#f7f9fc] p-6 sm:p-8"><h3 className="text-sm font-extrabold text-[#0a1a2f]">This may feel familiar</h3><ul className="mt-5 space-y-4">{detail.problem.signals.map(signal => <li key={signal} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700"><CircleDot size={17} className="mt-1 shrink-0 text-blue-600" />{signal}</li>)}</ul></aside>
      </div>
    </section>

    <section className="section-pad border-y border-slate-200 bg-[#f5f7fb]">
      <div className="container-site"><div className="max-w-3xl"><span className="eyebrow">What we build</span><h2 className="section-title mt-4">A focused solution, shaped around your workflow</h2></div><div className="mt-12 grid gap-5 md:grid-cols-3">{detail.builds.map((item, index) => <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7"><span className="grid size-10 place-items-center rounded-xl bg-blue-50 font-display text-xs font-extrabold text-blue-700">0{index + 1}</span><h3 className="mt-5 text-xl font-extrabold text-[#0a1a2f]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p></div>)}</div></div>
    </section>

    <section className="section-pad bg-white">
      <div className="container-site grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-6 sm:p-8"><span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-700"><Layers3 size={22} /></span><h2 className="mt-6 text-2xl font-extrabold text-[#0a1a2f]">Core features</h2><ul className="mt-6 grid gap-3 sm:grid-cols-2">{detail.features.map(feature => <li key={feature} className="flex items-start gap-2.5 text-sm font-semibold leading-6 text-slate-700"><Check size={15} className="mt-1 shrink-0 text-blue-600" />{feature}</li>)}</ul></div>
        <div className="rounded-2xl bg-[#0a1a2f] p-6 text-white sm:p-8"><span className="grid size-12 place-items-center rounded-xl bg-white/10 text-blue-200"><UsersRound size={22} /></span><h2 className="mt-6 text-2xl font-extrabold">Suitable customers</h2><ul className="mt-6 space-y-3">{detail.suitableCustomers.map(customer => <li key={customer} className="flex items-start gap-2.5 text-sm font-semibold leading-6 text-slate-300"><Check size={15} className="mt-1 shrink-0 text-blue-300" />{customer}</li>)}</ul></div>
      </div>
    </section>

    <section className="section-pad bg-[#0a1a2f] text-white">
      <div className="container-site"><div className="max-w-3xl"><span className="eyebrow !text-blue-300">Our process</span><h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-.045em]">Clear steps from problem to working solution</h2></div><div className="relative mt-12"><div aria-hidden="true" className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-white/15 md:block" /><ol className="relative grid gap-5 md:grid-cols-4">{detail.process.map((step, index) => <li key={step.title} className="relative rounded-2xl border border-white/10 bg-white/5 p-6"><span className="relative z-10 grid size-14 place-items-center rounded-full bg-blue-600 font-display text-sm font-extrabold">0{index + 1}</span><h3 className="mt-5 text-lg font-extrabold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p></li>)}</ol></div></div>
    </section>

    <section className="section-pad bg-white">
      <div className="container-site grid items-start gap-12 lg:grid-cols-[.75fr_1.25fr]">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-7 sm:p-8"><span className="grid size-12 place-items-center rounded-xl bg-blue-700 text-white"><WalletCards size={22} /></span><span className="mt-6 block text-xs font-extrabold uppercase tracking-[.15em] text-blue-700">Pricing guidance</span>{detail.pricing.kind === "starting" ? <><span className="mt-3 block text-sm font-semibold text-slate-500">Starting at</span><strong className="mt-1 block font-display text-4xl font-extrabold tracking-tight text-[#0a1a2f]">{formatPrice(detail.pricing.price, detail.pricing.currency)}</strong></> : <strong className="mt-3 block font-display text-3xl font-extrabold text-[#0a1a2f]">Custom quote</strong>}<p className="mt-5 text-sm leading-6 text-slate-600">{detail.pricing.note}</p><a href={quoteHref} className={buttonStyles({ className: "mt-7" })}>Request a quote <ArrowRight size={16} /></a></div>
        <div><span className="eyebrow">Related work & templates</span><h2 className="mt-4 text-3xl font-extrabold text-[#0a1a2f]">Explore relevant starting points</h2><div className="mt-7 grid gap-4 sm:grid-cols-2">{detail.related.map(item => <Link key={item.title} href={item.href} className="group rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:shadow-[0_16px_40px_rgba(10,26,47,.07)]"><span className="text-[10px] font-extrabold uppercase tracking-[.15em] text-blue-700">{item.label}</span><h3 className="mt-3 text-lg font-extrabold text-[#0a1a2f] group-hover:text-blue-700">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700">View on homepage <ArrowRight size={14} /></span></Link>)}</div></div>
      </div>
    </section>

    <section className="bg-white pb-16 sm:pb-20 lg:pb-28">
      <div className="container-site"><div className="relative overflow-hidden rounded-[2rem] bg-blue-700 px-6 py-14 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-16"><Route aria-hidden="true" className="absolute -right-10 -top-10 size-56 text-white/8" strokeWidth={1} /><div className="relative max-w-2xl"><h2 className="font-display text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">{detail.cta.title}</h2><p className="mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">{detail.cta.description}</p></div><a href={quoteHref} className={buttonStyles({ variant: "secondary", size: "lg", className: "relative mt-8 shrink-0 lg:mt-0" })}>Start a conversation <ArrowRight size={17} /></a></div></div>
    </section>
  </article>;
}
