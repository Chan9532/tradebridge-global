"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ExternalLink, FilePlus2, Pencil, Save, X } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button, buttonStyles } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { AdminTemplate, TemplateInput } from "@/lib/template-admin/schema";

type FormState = Omit<TemplateInput, "screenshots" | "pages" | "features" | "starting_price"> & {
  screenshots: string;
  pages: string;
  features: string;
  starting_price: string;
};

const emptyForm: FormState = {
  name: "", slug: "", industry: "", style: "", short_description: "", thumbnail_url: "",
  screenshots: "", demo_url: null, pages: "", features: "", starting_price: "", featured: false, status: "draft",
};

function toForm(template: AdminTemplate): FormState {
  return {
    ...template,
    screenshots: template.screenshots.join("\n"),
    pages: template.pages.join("\n"),
    features: template.features.join("\n"),
    starting_price: template.starting_price === null ? "" : String(template.starting_price),
  };
}

function lines(value: string) {
  return value.split("\n").map(item => item.trim()).filter(Boolean);
}

function toPayload(form: FormState): TemplateInput {
  return {
    ...form,
    demo_url: form.demo_url?.trim() || null,
    screenshots: lines(form.screenshots),
    pages: lines(form.pages),
    features: lines(form.features),
    starting_price: form.starting_price.trim() === "" ? null : Number(form.starting_price),
  };
}

function normalizeTemplate(value: AdminTemplate): AdminTemplate {
  return { ...value, starting_price: value.starting_price === null ? null : Number(value.starting_price) };
}

function sortTemplates(values: AdminTemplate[]) {
  return [...values].sort((a, b) => Number(b.featured) - Number(a.featured) || b.created_at.localeCompare(a.created_at));
}

export function TemplateManager({ initialTemplates }: { initialTemplates: AdminTemplate[] }) {
  const [templates, setTemplates] = useState(() => sortTemplates(initialTemplates.map(normalizeTemplate)));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const counts = useMemo(() => ({
    total: templates.length,
    published: templates.filter(item => item.status === "published").length,
    draft: templates.filter(item => item.status === "draft").length,
  }), [templates]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(current => ({ ...current, [key]: value }));
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage(null);
  }

  function startEdit(template: AdminTemplate) {
    setEditingId(template.id);
    setForm(toForm(template));
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function send(template: TemplateInput, id?: string) {
    const response = await fetch("/api/admin/templates", {
      method: id ? "PATCH" : "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id ? { id, template } : template),
    });
    const body = await response.json().catch(() => ({ error: "The server returned an unreadable response." }));
    if (!response.ok) throw new Error(body.error || "The template could not be saved.");
    return normalizeTemplate(body.template as AdminTemplate);
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const saved = await send(toPayload(form), editingId || undefined);
      setTemplates(current => sortTemplates(editingId ? current.map(item => item.id === saved.id ? saved : item) : [saved, ...current]));
      setEditingId(saved.id);
      setForm(toForm(saved));
      setMessage("Template saved.");
      toast.success("Template saved");
    } catch (error) {
      const text = error instanceof Error ? error.message : "The template could not be saved.";
      setMessage(text);
      toast.error(text);
    } finally { setSaving(false); }
  }

  async function changePublication(template: AdminTemplate) {
    const status = template.status === "published" ? "draft" : "published";
    setSaving(true);
    setMessage(null);
    try {
      const saved = await send({ ...template, status }, template.id);
      setTemplates(current => sortTemplates(current.map(item => item.id === saved.id ? saved : item)));
      if (editingId === saved.id) setForm(toForm(saved));
      toast.success(status === "published" ? "Template published" : "Template unpublished");
    } catch (error) {
      const text = error instanceof Error ? error.message : "The status could not be changed.";
      setMessage(text);
      toast.error(text);
    } finally { setSaving(false); }
  }

  return <div className="grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,.7fr)]">
    <section className="order-2 rounded-3xl border border-slate-200 bg-white shadow-sm xl:order-1">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div><h2 className="text-xl font-extrabold text-slate-950">Templates</h2><p className="mt-1 text-sm text-slate-500">{counts.total} total · {counts.published} published · {counts.draft} draft</p></div>
        <Button type="button" onClick={startCreate}><FilePlus2 size={17} aria-hidden="true" />New template</Button>
      </div>
      {templates.length === 0 ? <div className="p-10 text-center"><p className="font-bold text-slate-800">No templates yet</p><p className="mt-2 text-sm text-slate-500">Create the first template using the form.</p></div> :
        <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Template</th><th className="px-4 py-3">Industry</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr></thead>
          <tbody className="divide-y divide-slate-100">{templates.map(template => <tr key={template.id} className="align-middle">
            <td className="px-5 py-4"><div className="font-bold text-slate-900">{template.name}</div><div className="mt-1 text-xs text-slate-500">/{template.slug}{template.featured ? " · Featured" : ""}</div></td>
            <td className="px-4 py-4 text-slate-600">{template.industry}<span className="block text-xs text-slate-400">{template.style}</span></td>
            <td className="px-4 py-4 text-slate-600">{template.starting_price === null ? "—" : `$${template.starting_price.toLocaleString()}`}</td>
            <td className="px-4 py-4"><Badge className={template.status === "published" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : template.status === "coming_soon" ? "border-amber-200 bg-amber-50 text-amber-800" : "border-slate-200 bg-slate-100 text-slate-600"}>{template.status.replace("_", " ")}</Badge></td>
            <td className="px-5 py-4"><div className="flex justify-end gap-2"><Button type="button" size="sm" variant="outline" onClick={() => startEdit(template)}><Pencil size={15} aria-hidden="true" />Edit</Button><Button type="button" size="sm" variant={template.status === "published" ? "ghost" : "primary"} disabled={saving} onClick={() => changePublication(template)}>{template.status === "published" ? "Unpublish" : "Publish"}</Button></div></td>
          </tr>)}</tbody>
        </table></div>}
    </section>

    <section className="order-1 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:order-2 xl:sticky xl:top-24 xl:h-fit">
      <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-blue-700">{editingId ? "Edit template" : "Create template"}</p><h2 className="mt-2 text-2xl font-extrabold text-slate-950">{editingId ? form.name || "Template details" : "New template"}</h2></div>{editingId && <button type="button" onClick={startCreate} aria-label="Close editor" className="grid size-10 place-items-center rounded-xl text-slate-500 hover:bg-slate-100"><X size={19} /></button>}</div>
      {message && <div role="status" className={`mt-4 flex items-start gap-2 rounded-xl p-3 text-sm ${message === "Template saved." ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}>{message === "Template saved." && <CheckCircle2 className="mt-0.5 shrink-0" size={16} />}{message}</div>}
      <form onSubmit={save} className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2"><Field label="Name"><Input required maxLength={150} value={form.name} onChange={event => { const name = event.target.value; setForm(current => ({ ...current, name, slug: editingId || current.slug ? current.slug : name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") })); }} /></Field><Field label="Slug"><Input required pattern="[a-z0-9]+(-[a-z0-9]+)*" value={form.slug} onChange={event => update("slug", event.target.value.toLowerCase())} /></Field></div>
        <div className="grid gap-4 sm:grid-cols-2"><Field label="Industry"><Input required value={form.industry} onChange={event => update("industry", event.target.value)} /></Field><Field label="Style"><Input required value={form.style} onChange={event => update("style", event.target.value)} /></Field></div>
        <Field label="Description"><Textarea required minLength={10} maxLength={1000} value={form.short_description} onChange={event => update("short_description", event.target.value)} /></Field>
        <Field label="Thumbnail URL"><Input required placeholder="/template-previews/example" value={form.thumbnail_url} onChange={event => update("thumbnail_url", event.target.value)} /></Field>
        <Field label="Screenshots"><Textarea placeholder="One local path or HTTPS URL per line" value={form.screenshots} onChange={event => update("screenshots", event.target.value)} /></Field>
        <Field label="Demo URL"><Input placeholder="/templates/example/demo" value={form.demo_url || ""} onChange={event => update("demo_url", event.target.value || null)} /></Field>
        <div className="grid gap-4 sm:grid-cols-2"><Field label="Pages"><Textarea required placeholder={'Home\nServices\nContact'} value={form.pages} onChange={event => update("pages", event.target.value)} /></Field><Field label="Features"><Textarea required placeholder={'Service overview\nEnquiry form'} value={form.features} onChange={event => update("features", event.target.value)} /></Field></div>
        <div className="grid gap-4 sm:grid-cols-2"><Field label="Starting price"><Input type="number" min="0" step="0.01" placeholder="399" value={form.starting_price} onChange={event => update("starting_price", event.target.value)} /></Field><Field label="Status"><Select value={form.status} onChange={event => update("status", event.target.value as FormState["status"])}><option value="draft">Draft</option><option value="published">Published</option><option value="coming_soon">Coming Soon</option></Select></Field></div>
        <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700"><input type="checkbox" checked={form.featured} onChange={event => update("featured", event.target.checked)} className="size-4 rounded border-slate-300" />Featured template</label>
        <div className="flex flex-wrap gap-3 pt-2"><Button type="submit" disabled={saving}><Save size={17} aria-hidden="true" />{saving ? "Saving…" : "Save template"}</Button>{editingId && <a href={`/templates/${form.slug}`} target="_blank" rel="noreferrer" className={buttonStyles({ variant: "outline" })}>View public page<ExternalLink size={15} aria-hidden="true" /></a>}</div>
      </form>
    </section>
  </div>;
}
