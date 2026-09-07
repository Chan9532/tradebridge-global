import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Braces,
  Check,
  ChevronRight,
  DatabaseZap,
  Globe2,
  LayoutDashboard,
  MonitorSmartphone,
  MoveUpRight,
  Palette,
  Sparkles,
  Workflow,
} from "lucide-react";
import { BrowserVisual } from "@/components/home/browser-visual";
import { TemplatePreview } from "@/components/home/template-preview";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonStyles } from "@/components/ui/button";
import { coreServices, featuredTemplates, featuredWork, pricing, processSteps, type ServiceId } from "@/lib/digital-home-data";

export const metadata: Metadata = {
  title: "Websites & Business Systems That Help You Grow",
  description: "Modern websites, CRM systems, automations and AI-powered business solutions for startups and growing businesses.",
};

const quoteHref = "mailto:info@tradebridge-global.com?subject=TradeBridge%20Digital%20Project%20Quote";
const serviceIcons = { websites: MonitorSmartphone, systems: LayoutDashboard, automation: Workflow, ai: Bot } satisfies Record<ServiceId, typeof Globe2>;
const workIcons = [Palette, DatabaseZap, Braces] as const;

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: pricing.currency, maximumFractionDigits: 0 }).format(value);
}

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "TradeBridge Digital",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://tradebridge-global.com",
    email: "info@tradebridge-global.com",
    description: "Websites, business systems, automation and AI-powered solutions for growing businesses.",
    areaServed: "Worldwide",
    serviceType: ["Website development", "Business systems", "Workflow automation", "AI integration"],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

    <section className="relative isolate overflow-hidden bg-[#07152b] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_20%,rgba(22,93,255,.25),transparent_32%),radial-gradient(circle_at_84%_62%,rgba(64,148,255,.16),transparent_35%)]" />
      <div className="absolute inset-0 -z-10 grid-lines opacity-40" />
      <div className="container-site grid min-h-[calc(100svh-4.5rem)] items-center gap-14 py-20 lg:grid-cols-[.9fr_1.1fr] lg:py-24 xl:gap-20">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/8 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.16em] text-blue-200"><Sparkles size={14} /> Websites • Systems • Automation • AI</span>
          <h1 className="mt-7 font-display text-[clamp(2.75rem,6vw,5.4rem)] font-extrabold leading-[.98] tracking-[-.06em] text-white">Websites &amp; Business Systems <span className="text-blue-300">That Help You Grow</span></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">We build modern websites, CRM systems, automations and AI-powered business solutions for startups and growing businesses.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="#templates" className={buttonStyles({ size: "lg", className: "bg-blue-500 hover:bg-blue-400" })}>View Templates <ArrowRight size={17} /></Link>
            <a href={quoteHref} className={buttonStyles({ variant: "outline", size: "lg", className: "border-white/25 bg-white/8 text-white hover:border-white/45 hover:bg-white/12 hover:text-white" })}>Start a Project <MoveUpRight size={17} /></a>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-400">
            {["Clear project scope", "Responsive by default", "Built for practical use"].map(item => <span key={item} className="flex items-center gap-2"><Check size={14} className="text-blue-300" />{item}</span>)}
          </div>
        </div>
        <BrowserVisual />
      </div>
    </section>

    <section id="services" className="section-pad scroll-mt-20 bg-white">
      <div className="container-site">
        <SectionHeading eyebrow="Core services" title="Digital tools built around real business needs" description="From your public website to the systems behind it, every part is designed to work together." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coreServices.map(service => {
            const Icon = serviceIcons[service.id];
            return <article key={service.id} className="group site-card flex min-h-80 flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(10,26,47,.1)]">
              <span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white"><Icon size={22} /></span>
              <h3 className="mt-6 text-xl font-extrabold text-[#0a1a2f]">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>
              <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">{service.items.map(item => <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700"><Check size={14} className="text-blue-600" />{item}</li>)}</ul>
            </article>;
          })}
        </div>
      </div>
    </section>

    <section id="templates" className="section-pad scroll-mt-20 border-y border-slate-200 bg-[#f5f7fb]">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Featured templates" title="A strong starting point for your next website" description="Six demo concepts showing the direction of the future template library. Every build can be adapted to your brand and goals." />
          <Link href="#template-grid" className={buttonStyles({ variant: "outline", className: "shrink-0" })}>Browse All Templates <ArrowRight size={16} /></Link>
        </div>
        <div id="template-grid" className="mt-12 grid scroll-mt-28 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTemplates.map((template, index) => <article key={template.name} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_16px_40px_rgba(10,26,47,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(10,26,47,.1)]">
            <TemplatePreview accent={template.accent} index={index} />
            <div className="px-3 pb-3 pt-5"><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-blue-700">Demo template</span><span className="text-xs font-semibold text-slate-400">{template.category}</span></div><h3 className="mt-3 text-xl font-extrabold text-[#0a1a2f]">{template.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{template.description}</p></div>
          </article>)}
        </div>
      </div>
    </section>

    <section id="work" className="section-pad scroll-mt-20 bg-white">
      <div className="container-site">
        <SectionHeading eyebrow="Featured work" title="Ideas, systems and builds in progress" description="Until client case studies are ready to publish, this section shows only clearly labeled internal work and demo concepts." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredWork.map((project, index) => {
            const Icon = workIcons[index];
            return <article key={project.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative flex h-56 items-end overflow-hidden bg-[#0a1a2f] p-6 text-white"><div className="absolute -right-14 -top-14 size-48 rounded-full border-[32px] border-blue-500/20"/><div className="absolute bottom-10 right-10 size-24 rotate-12 rounded-2xl border border-white/10 bg-white/5"/><span className="relative grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/10 text-blue-200"><Icon size={25}/></span><span className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-blue-100">{project.status}</span></div>
              <div className="p-6"><span className="text-xs font-bold text-blue-700">{project.type}</span><h3 className="mt-2 text-xl font-extrabold text-[#0a1a2f]">{project.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p></div>
            </article>;
          })}
        </div>
      </div>
    </section>

    <section id="pricing" className="section-pad scroll-mt-20 bg-[#0a1a2f] text-white">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center"><span className="eyebrow !text-blue-300">Pricing preview</span><h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-.045em]">A clear starting point for planning</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">Every project is scoped individually. These starting prices help you choose the right level.</p></div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricing.tiers.map((tier, index) => <article key={tier.name} className={`flex min-h-[390px] flex-col rounded-2xl border p-7 ${index === 1 ? "border-blue-400 bg-blue-600 shadow-[0_24px_70px_rgba(22,93,255,.25)]" : "border-white/12 bg-white/5"}`}>
            <span className={`text-xs font-extrabold uppercase tracking-[.16em] ${index === 1 ? "text-blue-100" : "text-blue-300"}`}>{tier.name}</span>
            <div className="mt-6"><span className={`block text-xs font-semibold ${index === 1 ? "text-blue-100" : "text-slate-400"}`}>Starting at</span><strong className="mt-1 block font-display text-4xl font-extrabold tracking-tight">{formatPrice(tier.price)}</strong></div>
            <p className={`mt-4 text-sm leading-6 ${index === 1 ? "text-blue-50" : "text-slate-300"}`}>{tier.description}</p>
            <ul className={`mt-7 space-y-3 border-t pt-6 ${index === 1 ? "border-white/20" : "border-white/10"}`}>{tier.features.map(feature => <li key={feature} className="flex items-center gap-3 text-sm font-semibold"><span className={`grid size-5 shrink-0 place-items-center rounded-full ${index === 1 ? "bg-white/15" : "bg-blue-400/15"}`}><Check size={12} /></span>{feature}</li>)}</ul>
            <a href={`${quoteHref}&body=I%27m%20interested%20in%20the%20${encodeURIComponent(tier.name)}%20package.`} className={`mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-bold transition ${index === 1 ? "bg-white text-blue-700 hover:bg-blue-50" : "border border-white/20 bg-white/5 text-white hover:bg-white/10"}`}>Discuss this option <ChevronRight size={15}/></a>
          </article>)}
        </div>
        <p className="mt-6 text-center text-xs leading-5 text-slate-400">Final pricing depends on scope, content, integrations and timeline.</p>
      </div>
    </section>

    <section id="process" className="section-pad scroll-mt-20 bg-white">
      <div className="container-site">
        <SectionHeading eyebrow="How it works" title="From idea to launch, without the confusion" description="A straightforward process keeps decisions clear and momentum steady." align="center" />
        <ol className="relative mt-14 grid gap-5 md:grid-cols-4">
          <div aria-hidden="true" className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-blue-200 md:block" />
          {processSteps.map((step, index) => <li key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-6 text-center md:border-0 md:p-4"><span className="relative z-10 mx-auto grid size-14 place-items-center rounded-full border-4 border-white bg-blue-700 font-display text-sm font-extrabold text-white shadow-[0_0_0_1px_#dbeafe]">0{index + 1}</span><h3 className="mt-5 text-lg font-extrabold text-[#0a1a2f]">{step.title}</h3><p className="mx-auto mt-2 max-w-[15rem] text-sm leading-6 text-slate-600">{step.description}</p></li>)}
        </ol>
      </div>
    </section>

    <section className="pb-16 sm:pb-20 lg:pb-28">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[2rem] bg-blue-700 px-6 py-14 text-center text-white sm:px-10 sm:py-16 lg:px-16">
          <div aria-hidden="true" className="absolute -left-20 -top-20 size-64 rounded-full border-[42px] border-white/8"/><div aria-hidden="true" className="absolute -bottom-28 -right-20 size-72 rounded-full border-[48px] border-[#0a1a2f]/15"/>
          <div className="relative mx-auto max-w-3xl"><span className="text-xs font-extrabold uppercase tracking-[.18em] text-blue-100">Your next useful system starts here</span><h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-[-.045em] sm:text-4xl lg:text-5xl">Ready to Build Something Useful?</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">Tell us what you want to launch, improve or automate. We’ll help you shape the right next step.</p><a href={quoteHref} className={buttonStyles({ variant: "secondary", size: "lg", className: "mt-8" })}>Get a Free Quote <ArrowRight size={17}/></a></div>
        </div>
      </div>
    </section>
  </>;
}
