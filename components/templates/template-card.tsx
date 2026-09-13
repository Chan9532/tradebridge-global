import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, ExternalLink, Star } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { formatPrice } from "@/lib/pricing-data";
import type { WebsiteTemplate } from "@/lib/templates/types";

export function TemplateCard({ template }: { template: WebsiteTemplate }) {
  const isAvailable = template.status === "available";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(10,26,47,.05)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_56px_rgba(10,26,47,.1)]">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-200 bg-slate-100">
        <Image
          src={template.thumbnail}
          alt={`${template.name} website template preview`}
          fill
          unoptimized
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.12em] shadow-lg ${isAvailable ? "bg-emerald-600 text-white" : "bg-amber-100 text-amber-950"}`}>
            {isAvailable ? <CheckCircle2 size={11} aria-hidden="true" /> : <Clock3 size={11} aria-hidden="true" />}
            {isAvailable ? "Available" : "Coming Soon"}
          </span>
          {template.featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0a1a2f] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.12em] text-white shadow-lg">
              <Star size={11} fill="currentColor" aria-hidden="true" /> Featured
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
          <span>{template.industry}</span>
          <span aria-hidden="true" className="size-1 rounded-full bg-slate-300" />
          <span>{template.style}</span>
          <span aria-hidden="true" className="size-1 rounded-full bg-slate-300" />
          <span>{template.pages.length} {template.pages.length === 1 ? "page" : "pages"}</span>
        </div>
        <h2 className="mt-3 text-xl font-extrabold text-[#0a1a2f]">{template.name}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{template.short_description}</p>

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">{isAvailable ? "Starting from" : "Pricing"}</span>
            <strong className="mt-1 block font-display text-xl font-extrabold text-[#0a1a2f]">
              {template.starting_price === null ? (isAvailable ? "Custom quote" : "To be confirmed") : formatPrice(template.starting_price)}
            </strong>
          </div>
          <span className="text-xs font-semibold text-slate-500">{isAvailable ? "Internal demo" : "Preview only"}</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {isAvailable ? (
            <Link href={template.demo_url} className={buttonStyles({ variant: "outline", className: "px-3" })}>
              Live Demo <ExternalLink size={14} aria-hidden="true" />
            </Link>
          ) : (
            <span aria-disabled="true" className={buttonStyles({ variant: "outline", className: "cursor-not-allowed border-slate-200 px-3 text-slate-400 hover:border-slate-200 hover:text-slate-400" })}>
              Coming Soon
            </span>
          )}
          <Link href={`/templates/${template.slug}`} className={buttonStyles({ className: "px-3" })}>
            View Details <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
