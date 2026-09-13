import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { buttonStyles } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "TradeBridge Digital is an independent digital studio founded by Chanchal Dey, helping businesses build practical websites, systems and automations.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About TradeBridge Digital",
    description: "An independent digital studio focused on practical systems that solve real business problems.",
    url: "/about",
  },
};

const strengths = [
  "Business understanding",
  "International business experience",
  "Website development",
  "Systems thinking",
  "Automation",
  "Practical AI integration",
];

const tools = ["Next.js", "React", "Supabase", "APIs", "n8n", "AI integration"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About TradeBridge Digital"
        title="An independent digital studio."
        description="Helping businesses build practical websites, systems and automations. We focus on practical systems that solve real business problems."
      />

      <section aria-labelledby="founder-heading" className="container-site grid gap-10 py-14 sm:py-20 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div>
          <span className="eyebrow">Founder</span>
          <h2 id="founder-heading" className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#0a1a2f] sm:text-4xl">Chanchal Dey</h2>
          <p className="mt-3 text-lg font-semibold text-blue-700">Web Developer &amp; Business Systems Builder</p>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">Chanchal brings business understanding and international business experience to website development and systems building. His approach connects how a business works with the technology it needs.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h3 className="text-xl font-extrabold text-[#0a1a2f]">Business context. Practical technology.</h3>
          <p className="mt-3 text-base leading-7 text-slate-600">Start with the problem, understand the workflow, then build a solution that is useful and manageable.</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {strengths.map(strength => (
              <li key={strength} className="flex items-start gap-3 text-base leading-6 text-slate-700"><Check size={18} aria-hidden="true" className="mt-1 shrink-0 text-blue-700" />{strength}</li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="tools-heading" className="border-y border-slate-200 bg-white py-9">
        <div className="container-site flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div><h2 id="tools-heading" className="text-xl font-extrabold text-[#0a1a2f]">Tools chosen for the job</h2><p className="mt-2 text-base text-slate-600">A focused toolkit for websites, connected systems and automation.</p></div>
          <ul className="flex flex-wrap gap-2">
            {tools.map(tool => <li key={tool} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">{tool}</li>)}
          </ul>
        </div>
      </section>

      <section className="container-site py-14 sm:py-20">
        <div className="flex flex-col gap-6 rounded-2xl bg-[#0a1a2f] p-8 text-white sm:p-10 md:flex-row md:items-center md:justify-between">
          <div><h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">What does your business need to work better?</h2><p className="mt-3 max-w-xl text-base leading-7 text-slate-300">Share the problem you want to solve and the project you have in mind.</p></div>
          <Link href="/get-quote" className={buttonStyles({ variant: "secondary", size: "lg", className: "shrink-0 self-start md:self-center" })}>Discuss Your Project <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
