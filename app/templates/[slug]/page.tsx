import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Clock3, ExternalLink, FileText, Images, Layers3, MonitorSmartphone, Palette } from "lucide-react";
import { TemplateCard } from "@/components/templates/template-card";
import { buttonStyles } from "@/components/ui/button";
import { formatPrice } from "@/lib/pricing-data";
import { getTemplateBySlug, listTemplates } from "@/lib/templates/repository";

type TemplateDetailProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: TemplateDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);
  if (!template) return { title: "Template Not Found", robots: { index: false, follow: false } };

  return {
    title: `${template.name} Website Template`,
    description: template.short_description,
    alternates: { canonical: `/templates/${template.slug}` },
    openGraph: {
      title: `${template.name} Website Template | TradeBridge Digital`,
      description: template.short_description,
      url: `/templates/${template.slug}`,
      images: [{ url: template.thumbnail, width: 1200, height: 750, alt: `${template.name} website template preview` }],
    },
  };
}

export default async function TemplateDetailPage({ params }: TemplateDetailProps) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);
  if (!template) notFound();

  const isAvailable = template.status === "available";
  const relatedTemplates = (await listTemplates())
    .filter(item => item.slug !== template.slug && (item.industry === template.industry || item.style === template.style))
    .slice(0, 3);
  const useDesignHref = `/get-quote?template=${encodeURIComponent(template.slug)}&name=${encodeURIComponent(template.name)}`;
  const schema = isAvailable
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${template.name} Website Template`,
        description: template.short_description,
        image: [template.thumbnail, ...template.screenshots],
        serviceType: `Custom ${template.industry} website based on the ${template.name} design`,
        areaServed: "Worldwide",
        provider: { "@type": "Organization", name: "TradeBridge Digital" },
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://tradebridge-global.com"}/templates/${template.slug}`,
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${template.name} Website Template — Coming Soon`,
        description: template.short_description,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://tradebridge-global.com"}/templates/${template.slug}`,
      };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="container-site">
          <Link href="/templates" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-blue-700">
            <ArrowLeft size={16} aria-hidden="true" /> Back to templates
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-[.12em] text-blue-700">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ${isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-amber-100 text-amber-950"}`}>
                  {isAvailable ? <CheckCircle2 size={13} aria-hidden="true" /> : <Clock3 size={13} aria-hidden="true" />}
                  {isAvailable ? "Available" : "Coming Soon"}
                </span>
                <span>{template.industry}</span><span aria-hidden="true">•</span><span>{template.style}</span>
                {template.featured && <><span aria-hidden="true">•</span><span>Featured</span></>}
              </div>
              <h1 className="mt-4 font-display text-[clamp(2.7rem,5vw,4.8rem)] font-extrabold leading-[1] tracking-[-.055em] text-[#0a1a2f]">{template.name}</h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{template.short_description}</p>
              <p className="mt-5 max-w-xl text-base font-extrabold text-[#0a1a2f]">Get this website customized for your business.</p>
              {!isAvailable && <p className="mt-2 max-w-xl text-sm leading-6 text-amber-800">This concept is still being prepared. Its preview is for reference only and it cannot be selected yet.</p>}
              <div className="mt-8 flex flex-wrap gap-3">
                {isAvailable ? (
                  <Link href={template.demo_url} className={buttonStyles({ size: "lg" })}>Live Demo <ExternalLink size={16} aria-hidden="true" /></Link>
                ) : (
                  <span aria-disabled="true" className={buttonStyles({ size: "lg", className: "cursor-not-allowed bg-slate-300 text-slate-600 shadow-none hover:bg-slate-300" })}>Demo not ready</span>
                )}
                {isAvailable ? (
                  <Link href={useDesignHref} className={buttonStyles({ variant: "outline", size: "lg" })}>Use This Design <ArrowRight size={16} aria-hidden="true" /></Link>
                ) : (
                  <span aria-disabled="true" className={buttonStyles({ variant: "outline", size: "lg", className: "cursor-not-allowed border-slate-200 text-slate-400 hover:border-slate-200 hover:text-slate-400" })}>Coming Soon</span>
                )}
              </div>
              <dl className="mt-9 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs font-bold text-slate-500">Industry</dt><dd className="mt-1 text-sm font-extrabold text-[#0a1a2f]">{template.industry}</dd></div>
                <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs font-bold text-slate-500">Style</dt><dd className="mt-1 text-sm font-extrabold text-[#0a1a2f]">{template.style}</dd></div>
                <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs font-bold text-slate-500">Pages</dt><dd className="mt-1 text-sm font-extrabold text-[#0a1a2f]">{template.pages.length}</dd></div>
                <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs font-bold text-slate-500">Responsive</dt><dd className="mt-1 text-sm font-extrabold text-[#0a1a2f]">{isAvailable ? (template.mobile_responsive ? "Mobile ready" : "Not included") : "Planned"}</dd></div>
              </dl>
            </div>

            <div id="preview" className="relative aspect-[16/10] scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[0_28px_80px_rgba(10,26,47,.14)]">
              <Image src={template.thumbnail} alt={`${template.name} homepage preview`} fill unoptimized priority sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
              <span className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.12em] shadow-lg ${isAvailable ? "bg-[#0a1a2f] text-white" : "bg-amber-100 text-amber-950"}`}>{isAvailable ? "Internal demo preview" : "Concept preview — Coming Soon"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-slate-200 bg-white">
        <div className="container-site">
          <div className="flex max-w-3xl items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700"><Images size={20} aria-hidden="true" /></span>
            <div><span className="eyebrow">Screenshots</span><h2 className="mt-3 text-2xl font-extrabold text-[#0a1a2f] sm:text-3xl">Explore the design direction</h2><p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">Preview the homepage and an example inner-page layout before discussing customization.</p></div>
          </div>
          {template.screenshots.length > 0 ? (
            <div className="mt-9 grid gap-6 lg:grid-cols-2">
              {template.screenshots.map((screenshot, index) => (
                <figure key={screenshot} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-2 shadow-[0_18px_50px_rgba(10,26,47,.07)]">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl"><Image src={screenshot} alt={`${template.name} ${index === 0 ? "homepage" : `screenshot ${index + 1}`} preview`} fill unoptimized sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" /></div>
                  <figcaption className="px-3 py-3 text-sm font-bold text-slate-600">{index === 0 ? "Homepage" : `Inner page ${index}`}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="mt-9 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <Images className="mx-auto text-slate-400" size={32} aria-hidden="true" />
              <h3 className="mt-4 text-lg font-extrabold text-[#0a1a2f]">{isAvailable ? "Additional screenshots are not available yet" : "Screenshot gallery coming soon"}</h3>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">{isAvailable ? "The main preview above is available. Contact us if you would like to discuss this design direction." : "This is an internal concept preview only. Full screenshots and a working demo will be added when the template is ready."}</p>
            </div>
          )}
        </div>
      </section>

      <section className="section-pad bg-[#f6f8fc]">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <span className="eyebrow">What is included</span>
            <h2 className="mt-4 text-2xl font-extrabold text-[#0a1a2f] sm:text-3xl">A practical foundation, ready to adapt</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#0a1a2f]"><Layers3 size={17} className="text-blue-700" aria-hidden="true" /> Key features</h3>
                <ul className="mt-4 space-y-3">{template.features.map(feature => <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-slate-600"><Check size={15} className="mt-1 shrink-0 text-blue-700" aria-hidden="true" />{feature}</li>)}</ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#0a1a2f]"><FileText size={17} className="text-blue-700" aria-hidden="true" /> Included page layouts</h3>
                <ul className="mt-4 space-y-3">{template.pages.map(page => <li key={page} className="flex items-start gap-3 text-sm leading-6 text-slate-600"><Check size={15} className="mt-1 shrink-0 text-blue-700" aria-hidden="true" />{page}</li>)}</ul>
                <p className="mt-5 flex items-center gap-2 rounded-xl bg-blue-50 p-4 text-sm font-bold text-blue-900"><MonitorSmartphone size={18} className="shrink-0 text-blue-700" aria-hidden="true" />{isAvailable ? (template.mobile_responsive ? "Responsive layouts for mobile, tablet and desktop are included." : "Mobile optimization is not included in this template.") : "Responsive mobile, tablet and desktop layouts are planned for this concept."}</p>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl bg-[#0a1a2f] p-6 text-white sm:p-7">
            <Palette size={22} className="text-blue-300" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-extrabold leading-tight">{isAvailable ? "Get this website customized for your business." : "This template is coming soon."}</h2>
            <span className="mt-6 block text-xs font-bold uppercase tracking-[.14em] text-slate-400">{isAvailable ? "Starting from" : "Pricing"}</span>
            <strong className="mt-2 block font-display text-4xl font-extrabold">{template.starting_price === null ? (isAvailable ? "Custom quote" : "To be confirmed") : formatPrice(template.starting_price)}</strong>
            <p className="mt-4 text-sm leading-6 text-slate-300">{isAvailable ? "Final pricing depends on content, custom features, integrations and project scope." : "We will publish the working demo and pricing when this design is ready to customize."}</p>
            {isAvailable ? (
              <Link href={useDesignHref} className={buttonStyles({ variant: "secondary", className: "mt-7 w-full" })}>Use This Design <ArrowRight size={16} aria-hidden="true" /></Link>
            ) : (
              <span aria-disabled="true" className={buttonStyles({ variant: "secondary", className: "mt-7 w-full cursor-not-allowed bg-slate-200 text-slate-500 hover:bg-slate-200" })}>Coming Soon</span>
            )}
          </aside>
        </div>
      </section>

      {relatedTemplates.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-site">
            <div className="max-w-2xl"><span className="eyebrow">Related templates</span><h2 className="section-title mt-4">More useful starting points</h2></div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{relatedTemplates.map(item => <TemplateCard key={item.id} template={item} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
