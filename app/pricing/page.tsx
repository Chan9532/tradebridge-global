import type { Metadata } from "next";
import { ArrowRight, CircleDollarSign } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { PricingCard } from "@/components/pricing/pricing-card";
import { buttonStyles } from "@/components/ui/button";
import { formatPrice, pricingConfig } from "@/lib/pricing-data";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Website & Business System Pricing", description: "Review TradeBridge Digital starting prices for websites, business systems, automation, AI integration and ongoing support.", path: "/pricing" });

const customQuoteHref = "mailto:info@tradebridge-global.com?subject=TradeBridge%20Digital%20Custom%20Quote";

export default function PricingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "TradeBridge Digital Pricing",
    url: `${SITE_URL}/pricing`,
    provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "TradeBridge Digital", url: SITE_URL },
    itemListElement: pricingConfig.packages.map(plan => ({ "@type": "Offer", name: plan.name, price: plan.price, priceCurrency: pricingConfig.currency, url: `${SITE_URL}/pricing` })),
  };

  return <>
    <JsonLd data={schema} />
    <PageHero eyebrow="Simple pricing" title="Clear starting points for your next build" description="Choose the level closest to your needs. We confirm the exact scope and quote before any project begins." />

    <section className="section-pad bg-[#f7f9fc]">
      <div className="container-site">
        <SectionHeading eyebrow="Website & system packages" title="Start with the right level of support" description="These packages provide a practical baseline. Inclusions are adjusted to match the project." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">{pricingConfig.packages.map((plan, index) => <PricingCard key={plan.id} plan={plan} featured={index === 1} />)}</div>
      </div>
    </section>

    <section className="section-pad border-y border-slate-200 bg-white">
      <div className="container-site">
        <SectionHeading eyebrow="Additional starting points" title="Focused services for specific needs" description="Start with one clear outcome, then expand only when it adds value." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{pricingConfig.additionalStartingPoints.map(item => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-[0_16px_40px_rgba(10,26,47,.06)]"><span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700"><CircleDollarSign size={20} /></span><h2 className="mt-5 text-lg font-extrabold text-[#0a1a2f]">{item.name}</h2><strong className="mt-2 block font-display text-2xl font-extrabold text-blue-700">{formatPrice(item.price, item.suffix, item.billing)}</strong><p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p></article>)}</div>
      </div>
    </section>

    <section className="section-pad bg-[#0a1a2f] text-white">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        <div><span className="text-xs font-extrabold uppercase tracking-[.16em] text-blue-300">Scope before surprises</span><h2 className="mt-4 max-w-3xl font-display text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">{pricingConfig.scopeNotice}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Features, content, integrations, data readiness and timeline can change the final cost. You will receive a clear scope before work starts.</p></div>
        <a href={customQuoteHref} className={buttonStyles({ variant: "secondary", size: "lg", className: "shrink-0" })}>Request a Custom Quote <ArrowRight size={17} /></a>
      </div>
    </section>
  </>;
}
