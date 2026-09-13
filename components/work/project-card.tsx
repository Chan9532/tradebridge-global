import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ExternalLink, Code2, Lightbulb, Wrench } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import type { WorkProject } from "@/lib/work/types";

const statusStyles: Record<WorkProject["status"], string> = {
  "Completed": "bg-emerald-100 text-emerald-900",
  "In Progress": "bg-blue-100 text-blue-900",
  "Internal Build": "bg-blue-100 text-blue-900",
  "Demo Project": "bg-emerald-100 text-emerald-900",
  "Concept Project": "bg-amber-100 text-amber-950",
};

export function ProjectCard({ project }: { project: WorkProject }) {
  const quoteHref = `/get-quote?project=${encodeURIComponent(project.slug)}`;
  const primaryScreenshot = project.screenshots[0];

  return (
    <article id={project.slug} className="scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_55px_rgba(10,26,47,.07)]">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-slate-200 bg-slate-100">
        {primaryScreenshot ? (
          <Image src={primaryScreenshot} alt={`${project.name} internal project preview`} fill unoptimized sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-sm font-semibold text-slate-500">Preview not available</div>
        )}
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-extrabold uppercase tracking-[.12em] shadow-sm ${statusStyles[project.status]}`}>{project.status}</span>
      </div>

      {primaryScreenshot?.startsWith("/work-previews/") && <p className="border-b border-slate-200 px-6 py-2 text-xs text-slate-500">Illustrative interface concept</p>}

      <div className="p-6 sm:p-8">
        <span className="text-xs font-extrabold uppercase tracking-[.14em] text-blue-700">{project.category}</span>
        <h2 className="mt-3 text-2xl font-extrabold tracking-[-.025em] text-[#0a1a2f]"><Link href={`/work/${project.slug}`} className="hover:text-blue-700">{project.name}</Link></h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{project.summary}</p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#0a1a2f]"><Lightbulb size={16} className="text-amber-600" aria-hidden="true" /> Problem</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{project.problem}</p>
          </div>
          <div className="rounded-xl bg-blue-50 p-4">
            <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#0a1a2f]"><Wrench size={16} className="text-blue-700" aria-hidden="true" /> Solution</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{project.solution}</p>
          </div>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[.12em] text-slate-500">{project.status === "Concept Project" ? "Planned features" : "Key features"}</h3>
            <ul className="mt-3 space-y-2.5">
              {project.features.map(feature => <li key={feature} className="flex items-start gap-2.5 text-sm leading-5 text-slate-700"><Check size={14} className="mt-0.5 shrink-0 text-blue-700" aria-hidden="true" />{feature}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[.12em] text-slate-500">{project.status === "Concept Project" ? "Proposed stack" : "Stack"}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map(item => <span key={item} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600">{item}</span>)}
            </div>
          </div>
        </div>

        {project.screenshots.length > 1 && (
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {project.screenshots.slice(1).map((src, index) => <div key={`${src}-${index}`} className="relative aspect-video overflow-hidden rounded-xl border border-slate-200"><Image src={src} alt={`${project.name} screenshot ${index + 2}`} fill unoptimized sizes="(max-width: 639px) 100vw, 25vw" className="object-contain" /></div>)}
          </div>
        )}

        <div className="mt-7 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
          <Link href={`/work/${project.slug}`} className={buttonStyles({ variant: "outline" })}>View Case Study <ArrowRight size={15} aria-hidden="true" /></Link>
          {project.demo_url && <Link href={project.demo_url} className={buttonStyles({ variant: "outline" })}>{project.status === "Internal Build" ? "View Internal Build" : "View Demo"} <ExternalLink size={15} aria-hidden="true" /></Link>}
          {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className={buttonStyles({ variant: "outline" })}><Code2 size={15} aria-hidden="true" /> View Source</a>}
          <Link href={quoteHref} className={buttonStyles({ className: "sm:ml-auto" })}>Build Something Similar <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </div>
    </article>
  );
}
