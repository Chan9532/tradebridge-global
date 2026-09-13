import "server-only";
import { createServerSupabase, serverConfigured } from "@/lib/supabase/server";
import { templateColumns, templateFromRow } from "./database";
import { templateCatalogData } from "./data";
import type { WebsiteTemplate } from "./types";

export interface TemplateRepository {
  list(): Promise<readonly WebsiteTemplate[]>;
  findBySlug(slug: string): Promise<WebsiteTemplate | null>;
}

class StaticTemplateRepository implements TemplateRepository {
  constructor(private readonly templates: readonly WebsiteTemplate[]) {}

  async list() {
    return [...this.templates].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return Date.parse(b.created_at) - Date.parse(a.created_at);
    });
  }

  async findBySlug(slug: string) {
    return this.templates.find(template => template.slug === slug) ?? null;
  }
}

class SupabaseTemplateRepository implements TemplateRepository {
  async list() {
    const client = await createServerSupabase();
    if (!client) throw new Error("Template database is not configured");
    const { data, error } = await client.from("templates").select(templateColumns)
      .in("status", ["published", "coming_soon"]).order("featured", { ascending: false }).order("created_at", { ascending: false });
    if (error) return templateReadFailed("list", error.code);
    try {
      return (data ?? []).map(templateFromRow);
    } catch {
      return templateReadFailed("list", "INVALID_PUBLIC_ROW");
    }
  }

  async findBySlug(slug: string) {
    const client = await createServerSupabase();
    if (!client) throw new Error("Template database is not configured");
    const { data, error } = await client.from("templates").select(templateColumns)
      .eq("slug", slug).in("status", ["published", "coming_soon"]).maybeSingle();
    if (error) return templateReadFailed("find", error.code);
    try {
      return data ? templateFromRow(data) : null;
    } catch {
      return templateReadFailed("find", "INVALID_PUBLIC_ROW");
    }
  }
}

function templateReadFailed(operation: "list" | "find", code: string): never {
  // Keep diagnostics useful without logging query values, records or credentials.
  console.error("template_catalog_read_failed", { operation, code });
  throw new Error("The template catalog is temporarily unavailable");
}

const staticRepository = new StaticTemplateRepository(templateCatalogData);
const databaseRepository = new SupabaseTemplateRepository();
// Preserve the existing catalog until the current project receives Supabase
// runtime values. Once configured, Supabase is authoritative: empty results and
// failures are never replaced with demo records.
export const templateRepository: TemplateRepository = {
  list: () => (serverConfigured() ? databaseRepository : staticRepository).list(),
  findBySlug: slug => (serverConfigured() ? databaseRepository : staticRepository).findBySlug(slug),
};

export function listTemplates() {
  return templateRepository.list();
}

export async function listFeaturedTemplates(limit = 6) {
  const templates = await templateRepository.list();
  return templates.filter(template => template.featured && template.status === "available").slice(0, limit);
}

export function getTemplateBySlug(slug: string) {
  return templateRepository.findBySlug(slug);
}
