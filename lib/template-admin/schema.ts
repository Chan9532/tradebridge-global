import { z } from "zod";

const assetUrl = z.string().trim().max(2000).refine(
  value => /^\/(?!\/)/.test(value) || /^https:\/\//i.test(value),
  "Use a local path beginning with / or an HTTPS URL",
);

const optionalAssetUrl = z.preprocess(
  value => value === "" ? null : value,
  assetUrl.nullable(),
);

const textItem = z.string().trim().min(1).max(160);

export const templateStatusSchema = z.enum(["draft", "published", "coming_soon"]);

export const templateInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(150),
  slug: z.string().trim().min(1, "Slug is required").max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and single hyphens"),
  industry: z.string().trim().min(1, "Industry is required").max(100),
  style: z.string().trim().min(1, "Style is required").max(100),
  short_description: z.string().trim().min(10, "Description must be at least 10 characters").max(1000),
  thumbnail_url: assetUrl,
  screenshots: z.array(assetUrl).max(20),
  demo_url: optionalAssetUrl,
  pages: z.array(textItem).min(1, "Add at least one page").max(50),
  features: z.array(textItem).min(1, "Add at least one feature").max(50),
  starting_price: z.number().finite().nonnegative().max(9999999999).nullable(),
  featured: z.boolean(),
  status: templateStatusSchema,
}).superRefine((value, context) => {
  if (value.status === "published" && !value.demo_url) {
    context.addIssue({ code: "custom", path: ["demo_url"], message: "A published template requires a demo URL" });
  }
  if (value.status === "coming_soon" && value.demo_url) {
    context.addIssue({ code: "custom", path: ["demo_url"], message: "Coming Soon templates cannot have a demo URL" });
  }
});

export const templateUpdateSchema = z.object({
  id: z.string().uuid(),
  template: templateInputSchema,
});

export type TemplateInput = z.infer<typeof templateInputSchema>;

export type AdminTemplate = TemplateInput & {
  id: string;
  created_at: string;
  updated_at: string;
};
