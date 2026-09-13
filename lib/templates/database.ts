import { z } from "zod";
import type { WebsiteTemplate } from "./types";

const assetUrl = z.string().refine(value => /^\/(?!\/)/.test(value) || /^https:\/\//.test(value), "Use a local path or HTTPS URL");
const templateRowSchema = z.object({
  id: z.string().uuid(), name: z.string(), slug: z.string(), industry: z.string(), style: z.string(),
  short_description: z.string(), thumbnail_url: assetUrl, demo_url: assetUrl.nullable(),
  screenshots: z.array(assetUrl), pages: z.array(z.string()), features: z.array(z.string()),
  starting_price: z.number().nonnegative().nullable(), mobile_responsive: z.boolean(), featured: z.boolean(),
  status: z.enum(["published", "coming_soon"]), created_at: z.string(),
});

export const templateColumns = "id,name,slug,industry,style,short_description,thumbnail_url,demo_url,screenshots,pages,features,starting_price,mobile_responsive,featured,status,created_at";

export function templateFromRow(value: unknown): WebsiteTemplate {
  const row = templateRowSchema.parse(value);
  const { thumbnail_url, ...rest } = row;
  const base = { ...rest, thumbnail: thumbnail_url };
  if (row.status === "published") {
    if (!row.demo_url) throw new Error("Published templates require a demo URL");
    return { ...base, status: "available", demo_url: row.demo_url };
  }
  return { ...base, status: "coming-soon", demo_url: null };
}
