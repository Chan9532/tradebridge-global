import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

export default function TemplateNotFound() {
  return (
    <section className="container-site py-24 text-center sm:py-32">
      <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-blue-50 text-blue-700"><FileQuestion size={30} aria-hidden="true" /></span>
      <h1 className="mt-6 font-display text-3xl font-extrabold tracking-[-.04em] text-[#0a1a2f] sm:text-4xl">Template not found</h1>
      <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-600">This template does not exist, is no longer available, or does not currently have a live demo.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/templates" className={buttonStyles({ size: "lg" })}><ArrowLeft size={16} aria-hidden="true" /> Browse templates</Link>
        <Link href="/get-quote" className={buttonStyles({ variant: "outline", size: "lg" })}>Request a custom quote</Link>
      </div>
    </section>
  );
}
