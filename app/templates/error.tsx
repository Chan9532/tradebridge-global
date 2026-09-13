"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TemplatesError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="container-site py-24 text-center">
      <AlertCircle className="mx-auto text-rose-600" size={38} aria-hidden="true" />
      <h1 className="mt-5 text-2xl font-extrabold text-[#0a1a2f]">The template catalog could not be loaded</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">Please try again. If the problem continues, contact us and we will help you find a suitable starting point.</p>
      <Button onClick={reset} className="mt-7">Try again</Button>
    </section>
  );
}
