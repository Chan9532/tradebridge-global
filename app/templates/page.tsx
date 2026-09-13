import type { Metadata } from "next";
import { Layers3, SearchCheck, Sparkles } from "lucide-react";
import { TemplateCatalog } from "@/components/templates/template-catalog";
import { JsonLd } from "@/components/seo/json-ld";
import { listTemplates } from "@/lib/templates/repository";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Website Templates", description: "Browse adaptable TradeBridge Digital website concepts for agencies, consultants, local services, restaurants, construction and other businesses.", path: "/templates" });

export default async function TemplatesPage() {
  const templates = await listTemplates();
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TradeBridge Digital Website Templates",
    description: "Adaptable website template concepts for startups and growing businesses.",
    url: `${SITE_URL}/templates`,
    numberOfItems: templates.length,
    mainEntity: { "@type": "ItemList", itemListElement: templates.map((template, index) => ({ "@type": "ListItem", position: index + 1, name: template.name, url: `${SITE_URL}/templates/${template.slug}` })) },
  };

  return (
    <>
      <JsonLd data={schema} />

      <section className="relative isolate overflow-hidden bg-[#07152b] py-20 text-white sm:py-24 lg:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_25%,rgba(22,93,255,.26),transparent_32%),radial-gradient(circle_at_88%_70%,rgba(213,174,77,.12),transparent_28%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 grid-lines opacity-35" />
        <div className="container-site">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-blue-300">
              <Layers3 size={16} aria-hidden="true" /> Template library
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.7rem,6vw,5.2rem)] font-extrabold leading-[1] tracking-[-.055em]">Choose a strong starting point.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">Explore original internal concepts by industry, visual style and page count. Available designs can be customized now; unfinished concepts are clearly marked Coming Soon.</p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"><Sparkles size={14} className="text-amber-300" aria-hidden="true" /> Available and Coming Soon clearly labelled</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"><SearchCheck size={14} className="text-blue-300" aria-hidden="true" /> Searchable and filterable</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f6f8fc]">
        <div className="container-site">
          <TemplateCatalog templates={templates} />
        </div>
      </section>
    </>
  );
}
