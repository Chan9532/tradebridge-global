import type { Metadata } from "next";
import Link from "next/link";
import { chatGPTSignOutPath } from "@/app/chatgpt-auth";
import { buttonStyles } from "@/components/ui/button";

export const metadata: Metadata = { title: "Access denied", robots: { index: false, follow: false } };

export default function AdminAccessDeniedPage() {
  return <section className="min-h-[680px] bg-slate-50 py-20"><div className="container-site max-w-2xl"><div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-blue-700">Internal workspace</p><h1 className="mt-3 text-3xl font-extrabold text-slate-950">Access denied</h1><p className="mt-4 leading-7 text-slate-600">This signed-in account is not authorized to manage templates.</p><div className="mt-7 flex flex-wrap gap-3"><a href={chatGPTSignOutPath("/admin/templates")} className={buttonStyles()}>Use another account</a><Link href="/" className={buttonStyles({ variant: "outline" })}>Return home</Link></div></div></div></section>;
}
