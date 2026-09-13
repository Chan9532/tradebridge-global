import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { getWorkProjectBySlug } from "@/lib/work/repository";
import { SITE_URL, absoluteUrl, pageMetadata } from "@/lib/seo";

type CaseStudyPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const project = await getWorkProjectBySlug((await params).slug);
  if (!project) return { title: "Project Not Found", robots: { index: false, follow: false } };
  return pageMetadata({ title: `${project.name} Case Study`, socialTitle: `${project.name} — ${project.project_type}`, description: project.summary, path: `/work/${project.slug}` });
}

function StudySection({ title, children }: { title: string; children: ReactNode }) {
  return <section aria-labelledby={title.toLowerCase().replaceAll(" ", "-")} className="border-t border-slate-200 py-8 sm:py-10">
    <h2 id={title.toLowerCase().replaceAll(" ", "-")} className="font-display text-2xl font-extrabold tracking-tight text-[#0a1a2f]">{title}</h2>
    <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">{children}</div>
  </section>;
}

function StudyList({ items, empty }: { items: readonly string[]; empty: string }) {
  return items.length ? <ul className="list-disc space-y-3 pl-5 marker:text-blue-700">{items.map((item, index) => <li key={index}>{item}</li>)}</ul> : <p>{empty}</p>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const project = await getWorkProjectBySlug((await params).slug);
  if (!project) notFound();
  const study = project.case_study;
  const isConcept = project.project_type === "Concept Project";
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: `${project.name} Case Study`, description: project.summary, url: `${SITE_URL}/work/${project.slug}`, articleSection: project.category, image: project.screenshots.map(absoluteUrl), author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "TradeBridge Digital", url: SITE_URL }, publisher: { "@id": `${SITE_URL}/#organization` } };

  return <>
    <JsonLd data={schema} />
    <header className="bg-[#07152b] py-14 text-white sm:py-20">
      <div className="container-site max-w-5xl">
        <Link href="/work" className="inline-flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white"><ArrowLeft size={16} aria-hidden="true" /> All Work</Link>
        <p className="mt-9 text-sm font-bold uppercase tracking-widest text-blue-300">{isConcept ? "Concept study" : "Case study"}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-tight tracking-[-.04em] sm:text-6xl">{project.name}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{project.summary}</p>
        <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/15 pt-6 text-sm">
          <div><dt className="text-slate-400">Project Type</dt><dd className="mt-1 font-bold">{project.project_type}</dd></div>
          <div><dt className="text-slate-400">Category</dt><dd className="mt-1 font-bold">{project.category}</dd></div>
          <div><dt className="text-slate-400">Status</dt><dd className="mt-1 font-bold">{project.status}</dd></div>
        </dl>
      </div>
    </header>

    <article className="container-site max-w-5xl py-10 sm:py-16">
      {isConcept && <p className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-base leading-7 text-amber-950">Concept Project. The requirements, architecture, features and technology below describe a proposed build. Testing is planned; no delivered client results are claimed.</p>}
      <StudySection title="Problem"><p>{project.problem}</p></StudySection>
      <StudySection title="Requirements"><StudyList items={study?.requirements ?? []} empty="Requirements have not been published yet." /></StudySection>
      <StudySection title="Solution"><p>{project.solution}</p></StudySection>
      <StudySection title="Architecture">
        {study?.architecture.length ? <ol className="grid gap-4 sm:grid-cols-2">{study.architecture.map((part, index) => <li key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-5"><h3 className="font-bold text-[#0a1a2f]">{part.name}</h3><p className="mt-2">{part.description}</p></li>)}</ol> : <p>Architecture details have not been published yet.</p>}
      </StudySection>
      <StudySection title="Main Features"><StudyList items={project.features} empty="Features have not been documented yet." /></StudySection>
      <StudySection title="Technology Stack">
        {isConcept && <p>Proposed technology stack.</p>}
        <StudyList items={project.stack} empty="The technology stack has not been documented yet." />
      </StudySection>
      <StudySection title="Challenges"><StudyList items={study?.challenges ?? []} empty="Project challenges have not been documented yet." /></StudySection>
      <StudySection title="Testing">
        <p className="font-bold text-[#0a1a2f]">{study?.testing.status ?? "Not documented"}</p>
        <StudyList items={study?.testing.details ?? []} empty="No testing report has been published." />
      </StudySection>
      <StudySection title="Screenshots">
        {project.screenshots.length ? project.screenshots.map((src, index) => <figure key={`${src}-${index}`}>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-50"><Image src={src} alt={`${project.name} ${src.startsWith("/work-previews/") ? "illustrative interface concept" : `screenshot ${index + 1}`}`} fill unoptimized sizes="(max-width: 1024px) 100vw, 960px" className="object-contain" /></div>
          <figcaption className="mt-2 text-sm">{src.startsWith("/work-previews/") ? "Illustrative interface concept — not a captured screenshot of a working product." : `${project.name} — screenshot ${index + 1}`}</figcaption>
        </figure>) : <p>No screenshots have been published.</p>}
      </StudySection>
      <StudySection title="Demo">
        {project.demo_url ? <Link href={project.demo_url} className={buttonStyles({ variant: "outline" })}>{project.project_type === "Internal Build" ? "View Internal Build" : "View Demo"}<ExternalLink size={16} aria-hidden="true" /></Link> : <p>No public demo is available.</p>}
        {project.github_url && <p><a href={project.github_url} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 underline underline-offset-4">View source on GitHub</a></p>}
      </StudySection>
      <StudySection title="Result">
        <p>{study?.result.summary ?? "No verified results have been published."}</p>
        {!!study?.result.evidence.length && <ul className="space-y-2">{study.result.evidence.map((source, index) => <li key={index}><a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline underline-offset-4">{source.label}</a></li>)}</ul>}
      </StudySection>
      <StudySection title="What I Learned"><StudyList items={study?.lessons ?? []} empty={isConcept ? "Implementation lessons will be added after this concept has been built and evaluated." : "The project author's retrospective has not been published yet."} /></StudySection>

      <section className="mt-8 rounded-2xl bg-blue-700 p-8 text-white sm:p-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight">Build Something Similar</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100">Tell us what you need. We’ll use this project as a starting point for discussing your scope.</p>
        <Link href={`/get-quote?project=${encodeURIComponent(project.slug)}`} className={buttonStyles({ variant: "secondary", size: "lg", className: "mt-6" })}>Build Something Similar <ArrowRight size={16} aria-hidden="true" /></Link>
      </section>
    </article>
  </>;
}
