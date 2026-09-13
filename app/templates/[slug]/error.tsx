"use client";

import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button, buttonStyles } from "@/components/ui/button";

export default function TemplateDetailError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="container-site py-24 text-center">
      <AlertCircle className="mx-auto text-rose-600" size={38} aria-hidden="true" />
      <h1 className="mt-5 text-2xl font-extrabold text-[#0a1a2f]">This template could not be loaded</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">Please try again, or return to the catalog and choose another starting point.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link href="/templates" className={buttonStyles({ variant: "outline" })}><ArrowLeft size={16} aria-hidden="true" /> Browse templates</Link>
      </div>
    </section>
  );
}
