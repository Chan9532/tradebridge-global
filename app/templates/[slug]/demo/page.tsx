import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Info } from "lucide-react";
import { TemplateDemoCanvas } from "@/components/templates/template-demo-canvas";
import { buttonStyles } from "@/components/ui/button";
import { getTemplateBySlug } from "@/lib/templates/repository";

type TemplateDemoProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: TemplateDemoProps): Promise<Metadata> {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);
  return {
    title: template ? `${template.name} Demo` : "Template Demo",
    robots: { index: false, follow: false },
  };
}

export default async function TemplateDemoPage({ params }: TemplateDemoProps) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);
  if (!template || template.status !== "available") notFound();

  return (
    <section className="bg-[#edf1f7] py-8 sm:py-12">
      <div className="container-site">
        <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 shrink-0 text-blue-700" size={18} aria-hidden="true" />
            <div><strong className="block text-sm text-[#0a1a2f]">Interactive layout preview</strong><p className="mt-1 text-xs leading-5 text-slate-500">This is a demo concept. Content, colours and features can be adapted to your project.</p></div>
          </div>
          <Link href={`/templates/${template.slug}`} className={buttonStyles({ variant: "outline", size: "sm", className: "shrink-0" })}><ArrowLeft size={14} aria-hidden="true" /> Template details</Link>
        </div>
        <TemplateDemoCanvas template={template} />
      </div>
    </section>
  );
}
