"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, Search, SlidersHorizontal, X } from "lucide-react";
import { TemplateCard } from "./template-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { matchesPageCount, type TemplatePageCountFilter, type WebsiteTemplate } from "@/lib/templates/types";

const pageSize = 9;

const pageCountOptions: ReadonlyArray<{ value: TemplatePageCountFilter; label: string }> = [
  { value: "all", label: "Any page count" },
  { value: "single", label: "Single page" },
  { value: "two-to-five", label: "2–5 pages" },
  { value: "six-plus", label: "6+ pages" },
];

export function TemplateCatalog({ templates }: { templates: readonly WebsiteTemplate[] }) {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");
  const [style, setStyle] = useState("all");
  const [pageCount, setPageCount] = useState<TemplatePageCountFilter>("all");
  const [page, setPage] = useState(1);
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const industries = useMemo(() => [...new Set(templates.map(template => template.industry))].sort(), [templates]);
  const styles = useMemo(() => [...new Set(templates.map(template => template.style))].sort(), [templates]);

  const filteredTemplates = useMemo(() => templates.filter(template => {
    const searchableText = [
      template.name,
      template.industry,
      template.style,
      template.short_description,
      ...template.pages,
      ...template.features,
    ].join(" ").toLowerCase();

    return (!deferredSearch || searchableText.includes(deferredSearch))
      && (industry === "all" || template.industry === industry)
      && (style === "all" || template.style === style)
      && matchesPageCount(template.pages.length, pageCount);
  }), [deferredSearch, industry, pageCount, style, templates]);

  const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / pageSize));
  const visiblePage = Math.min(page, totalPages);
  const visibleTemplates = filteredTemplates.slice((visiblePage - 1) * pageSize, visiblePage * pageSize);
  const hasFilters = Boolean(search.trim()) || industry !== "all" || style !== "all" || pageCount !== "all";
  const availableCount = templates.filter(template => template.status === "available").length;
  const comingSoonCount = templates.length - availableCount;

  function resetFilters() {
    setSearch("");
    setIndustry("all");
    setStyle("all");
    setPageCount("all");
    setPage(1);
  }

  if (templates.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <LayoutGrid className="mx-auto text-slate-400" size={34} aria-hidden="true" />
        <h2 className="mt-5 text-xl font-extrabold text-[#0a1a2f]">Templates are being prepared</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">The catalog is currently empty. Please check back when the first designs are published.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_16px_40px_rgba(10,26,47,.05)] sm:p-5">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#0a1a2f]">
          <SlidersHorizontal size={17} className="text-blue-700" aria-hidden="true" /> Find the right starting point
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr_auto]">
          <label className="relative md:col-span-2 xl:col-span-1">
            <span className="sr-only">Search templates</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} aria-hidden="true" />
            <Input
              type="search"
              value={search}
              onChange={event => { setSearch(event.target.value); setPage(1); }}
              placeholder="Search by name, industry or feature"
              className="pl-11"
            />
          </label>
          <label>
            <span className="sr-only">Filter by industry</span>
            <Select value={industry} onChange={event => { setIndustry(event.target.value); setPage(1); }}>
              <option value="all">All industries</option>
              {industries.map(item => <option key={item} value={item}>{item}</option>)}
            </Select>
          </label>
          <label>
            <span className="sr-only">Filter by style</span>
            <Select value={style} onChange={event => { setStyle(event.target.value); setPage(1); }}>
              <option value="all">All styles</option>
              {styles.map(item => <option key={item} value={item}>{item}</option>)}
            </Select>
          </label>
          <label>
            <span className="sr-only">Filter by page count</span>
            <Select value={pageCount} onChange={event => { setPageCount(event.target.value as TemplatePageCountFilter); setPage(1); }}>
              {pageCountOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </Select>
          </label>
          <Button variant="ghost" onClick={resetFilters} disabled={!hasFilters} className="h-12 px-4">
            <X size={16} aria-hidden="true" /> Clear
          </Button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="text-sm font-semibold text-slate-600">
          {filteredTemplates.length} {filteredTemplates.length === 1 ? "template" : "templates"} found
        </p>
        <p className="text-xs font-semibold text-slate-500">
          {availableCount} Available <span aria-hidden="true">•</span> {comingSoonCount} Coming Soon
        </p>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <Search className="mx-auto text-slate-400" size={34} aria-hidden="true" />
          <h2 className="mt-5 text-xl font-extrabold text-[#0a1a2f]">No templates match those filters</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Try a broader search, choose a different style, or clear the filters to see every design.</p>
          <Button onClick={resetFilters} className="mt-6">Clear all filters</Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleTemplates.map(template => <TemplateCard key={template.id} template={template} />)}
        </div>
      )}

      {filteredTemplates.length > pageSize && (
        <nav aria-label="Template catalog pagination" className="mt-10 flex items-center justify-center gap-3">
          <Button variant="outline" onClick={() => setPage(current => Math.max(1, current - 1))} disabled={visiblePage === 1}>
            <ChevronLeft size={16} aria-hidden="true" /> Previous
          </Button>
          <span className="min-w-20 text-center text-sm font-semibold text-slate-600">{visiblePage} of {totalPages}</span>
          <Button variant="outline" onClick={() => setPage(current => Math.min(totalPages, current + 1))} disabled={visiblePage === totalPages}>
            Next <ChevronRight size={16} aria-hidden="true" />
          </Button>
        </nav>
      )}
    </div>
  );
}
