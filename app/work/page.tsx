import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, BriefcaseBusiness, LayoutDashboard, MonitorSmartphone, Workflow } from "lucide-react";
import { ProjectCard } from "@/components/work/project-card";
import { JsonLd } from "@/components/seo/json-ld";
import { buttonStyles } from "@/components/ui/button";
import { listWorkProjects } from "@/lib/work/repository";
import type { WorkProjectCategory } from "@/lib/work/types";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Work, Internal Builds & Case Studies", description: "Explore TradeBridge Digital internal builds and clearly labelled website, business system, automation and AI project concepts.", path: "/work" });

const categories: ReadonlyArray<{ name: WorkProjectCategory; description: string; icon: typeof MonitorSmartphone }> = [
  { name: "Websites", description: "Public-facing websites and content systems.", icon: MonitorSmartphone },
  { name: "Business Systems", description: "Operational tools, CRMs and team workspaces.", icon: LayoutDashboard },
  { name: "Automation", description: "Connected workflows and monitored handoffs.", icon: Workflow },
  { name: "AI Projects", description: "Controlled AI assistants and agent concepts.", icon: Bot },
];

export default async function WorkPage() {
  const projects = await listWorkProjects();
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TradeBridge Digital Work",
    description: "Internal builds, demo projects and concept projects by TradeBridge Digital.",
    url: `${SITE_URL}/work`,
    numberOfItems: projects.length,
    mainEntity: { "@type": "ItemList", itemListElement: projects.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: project.name, url: `${SITE_URL}/work/${project.slug}` })) },
  };

  return (
    <>
      <JsonLd data={schema} />

      <section className="relative isolate overflow-hidden bg-[#07152b] py-20 text-white sm:py-24 lg:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_25%,rgba(22,93,255,.26),transparent_32%),radial-gradient(circle_at_88%_70%,rgba(213,174,77,.12),transparent_28%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 grid-lines opacity-35" />
        <div className="container-site">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-blue-300"><BriefcaseBusiness size={16} aria-hidden="true" /> Selected work</span>
            <h1 className="mt-5 font-display text-[clamp(2.7rem,6vw,5.2rem)] font-extrabold leading-[1] tracking-[-.055em]">Useful digital work, shown honestly.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">This is separate from our reusable template library. Here you’ll find actual internal builds alongside clearly labelled demo and concept projects—without invented clients or results.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
        <div className="container-site grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(category => {
            const Icon = category.icon;
            return <div key={category.name} className="rounded-2xl border border-slate-200 p-5"><Icon size={20} className="text-blue-700" aria-hidden="true" /><h2 className="mt-4 text-base font-extrabold text-[#0a1a2f]">{category.name}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p></div>;
          })}
        </div>
      </section>

      <section className="section-pad bg-[#f6f8fc]">
        <div className="container-site">
          <div className="max-w-3xl"><span className="eyebrow">Projects</span><h2 className="section-title mt-4">Builds, demos and concepts</h2><p className="section-copy mt-5">Each project is labelled by its real status. Demo and concept projects demonstrate an approach, not completed client work.</p></div>
          {projects.length > 0 ? (
            <div className="mt-12 grid gap-7 xl:grid-cols-2">{projects.map(project => <ProjectCard key={project.slug} project={project} />)}</div>
          ) : (
            <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"><h2 className="text-xl font-extrabold text-[#0a1a2f]">No projects are published yet</h2><p className="mt-2 text-sm leading-6 text-slate-600">New internal work and case studies will appear here when they are ready.</p></div>
          )}
        </div>
      </section>

      <section className="bg-white pb-16 sm:pb-20 lg:pb-28">
        <div className="container-site">
          <div className="rounded-[2rem] bg-blue-700 px-6 py-14 text-center text-white sm:px-10 sm:py-16">
            <h2 className="font-display text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">Need something built around your workflow?</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">Tell us which project direction feels relevant and what your business needs to improve.</p>
            <Link href="/get-quote" className={buttonStyles({ variant: "secondary", size: "lg", className: "mt-7" })}>Build Something Similar <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
