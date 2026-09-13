import type { Metadata } from "next";
import { getLeadFormConfig } from "@/lib/inquiries/config";
import { AlertCircle } from "lucide-react";
import { ProjectQuoteForm } from "@/components/forms/project-quote-form";
import { getWorkProjectBySlug } from "@/lib/work/repository";
import { getTemplateBySlug, listTemplates } from "@/lib/templates/repository";

export const metadata: Metadata = {
  title: "Request a Project Quote",
  description: "Tell TradeBridge Digital about your website, business system, automation or AI project.",
  alternates: { canonical: "/get-quote" },
};

type QuotePageProps = { searchParams: Promise<{ project?: string | string[]; template?: string | string[]; name?: string | string[] }> };

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const query = await searchParams;
  const templates = (await listTemplates()).filter(item => item.status === "available").map(({ slug, name }) => ({ slug, name }));
  const requestedSlug = Array.isArray(query.template) ? query.template[0] : query.template;
  const template = requestedSlug ? await getTemplateBySlug(requestedSlug) : null;
  const invalidTemplateSelection = Boolean(requestedSlug && !template);
  const unavailableTemplateSelection = Boolean(template && template.status !== "available");
  const projectSlug = Array.isArray(query.project) ? query.project[0] : query.project;
  const selectedProject = !requestedSlug && projectSlug ? await getWorkProjectBySlug(projectSlug) : null;
  const selectedTemplate = template?.status === "available" ? template : null;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#07152b] py-16 text-white sm:py-20">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_25%,rgba(22,93,255,.25),transparent_34%),radial-gradient(circle_at_88%_70%,rgba(213,174,77,.12),transparent_28%)]" />
        <div className="container-site max-w-4xl"><span className="text-xs font-extrabold uppercase tracking-[.16em] text-blue-300">Project quote</span><h1 className="mt-5 font-display text-[clamp(2.7rem,6vw,4.8rem)] font-extrabold leading-[1] tracking-[-.055em]">Tell us what you want to build.</h1><p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Share your goals, preferred timeline and approximate budget. Use this form to prepare your brief before contacting us.</p></div>
      </section>

      <section className="bg-[#f6f8fc] py-14 sm:py-20">
        <div className="container-site max-w-4xl">
          {invalidTemplateSelection && (
            <div role="status" className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950"><AlertCircle className="mt-0.5 shrink-0 text-amber-700" size={18} aria-hidden="true" /><span>The selected template could not be found. You can still request a quote for a custom project.</span></div>
          )}
          {unavailableTemplateSelection && (
            <div role="status" className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950"><AlertCircle className="mt-0.5 shrink-0 text-amber-700" size={18} aria-hidden="true" /><span>{template?.name} is still Coming Soon and cannot be selected yet. You can still request a quote for a custom project.</span></div>
          )}
          <ProjectQuoteForm delivery={getLeadFormConfig()} templates={templates} key={selectedTemplate?.slug ?? selectedProject?.slug ?? "custom"} selectedProject={selectedProject ? { slug: selectedProject.slug, name: selectedProject.name } : undefined} selectedTemplate={selectedTemplate ? { slug: selectedTemplate.slug, name: selectedTemplate.name } : undefined} />
        </div>
      </section>
    </>
  );
}
