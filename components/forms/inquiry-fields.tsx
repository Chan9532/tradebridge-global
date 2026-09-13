"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InquiryField({ id, label, error, children, optional = false, className = "" }: { id: string; label: string; error?: string; children: ReactNode; optional?: boolean; className?: string }) {
  return <div className={className}>
    <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">{label}{optional && <span className="font-normal text-slate-500"> — optional</span>}</label>
    {children}
    {error && <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
  </div>;
}

export function HoneyField({ inputRef }: { inputRef: React.RefObject<HTMLInputElement | null> }) {
  return <div aria-hidden="true" className="hidden"><label htmlFor="company-website">Leave this field empty</label><input ref={inputRef} id="company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" /></div>;
}

export function DraftReady({ title, onEdit, children, saved = false }: { title: string; onEdit: () => void; children?: ReactNode; saved?: boolean }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, []);
  return <section className="rounded-2xl border border-emerald-200 bg-white p-6 sm:p-8">
    <CheckCircle2 size={36} aria-hidden="true" className="text-emerald-600" />
    <h2 ref={heading} tabIndex={-1} className="mt-4 text-2xl font-extrabold text-[#0a1a2f] focus:outline-none">{title}</h2>
    <p role="status" className="mt-3 text-base leading-7 text-slate-600">{saved ? "Your request has been received. We will review your details and follow up." : "Your details passed validation. Nothing has been sent or saved."}</p>
    {children}
    <p className="mt-4 text-base leading-7 text-slate-600">To contact us now, email <a href="mailto:info@tradebridge-global.com" className="break-all font-semibold text-blue-700 underline underline-offset-4">info@tradebridge-global.com</a>.</p>
    <Button type="button" variant="outline" onClick={onEdit} className="mt-6">{saved ? "Start another request" : "Edit details"}</Button>
  </section>;
}
