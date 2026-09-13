import type { Metadata } from "next";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { chatGPTSignOutPath } from "@/app/chatgpt-auth";
import { TemplateManager } from "@/components/admin/template-manager";
import { buttonStyles } from "@/components/ui/button";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { requireTemplateAdmin } from "@/lib/template-admin/auth";
import type { AdminTemplate } from "@/lib/template-admin/schema";

export const metadata: Metadata = { title: "Template Management", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const columns = "id,name,slug,industry,style,short_description,thumbnail_url,screenshots,demo_url,pages,features,starting_price,featured,status,created_at,updated_at";

export default async function TemplateManagementPage() {
  const admin = await requireTemplateAdmin();
  const { data, error } = await createSupabaseAdmin().from("templates").select(columns).order("featured", { ascending: false }).order("created_at", { ascending: false });
  if (error) {
    console.error("admin_template_list_failed", { code: error.code || "UNKNOWN" });
    throw new Error("Template management is temporarily unavailable");
  }

  const templates = (data || []).map(row => ({ ...row, starting_price: row.starting_price === null ? null : Number(row.starting_price) })) as AdminTemplate[];

  return <section className="min-h-screen bg-slate-50 py-8 sm:py-10">
    <div className="container-site">
      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[.2em] text-blue-700">Internal workspace</p><h1 className="mt-2 text-3xl font-extrabold text-slate-950 sm:text-4xl">Template management</h1><p className="mt-2 text-sm text-slate-600">Signed in as {admin.email}</p></div>
        <div className="flex flex-wrap gap-3"><Link href="/templates" className={buttonStyles({ variant: "outline" })}>View catalog</Link><a href={chatGPTSignOutPath("/")} className={buttonStyles({ variant: "ghost" })}><LogOut size={16} aria-hidden="true" />Sign out</a></div>
      </div>
      <TemplateManager initialTemplates={templates} />
    </div>
  </section>;
}
