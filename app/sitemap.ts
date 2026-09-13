import type { MetadataRoute } from "next";
import { insightArticles } from "@/lib/insights-data";
import { serviceDetails } from "@/lib/service-details-data";
import { listWorkProjects } from "@/lib/work/repository";
import { listTemplates } from "@/lib/templates/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://tradebridge-global.com";
  const [templates, projects] = await Promise.all([listTemplates(), listWorkProjects()]);
  const routes = [
    "",
    "/services",
    "/templates",
    "/work",
    "/get-quote",
    "/pricing",
    "/products",
    "/request",
    "/buyer-requests",
    "/sourcing-service",
    "/market-insights",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/commission-disclosure",
  ];

  return [
    ...routes.map(url => ({
      url: `${base}${url}`,
      lastModified: new Date(),
      changeFrequency: url === "" ? "weekly" as const : "monthly" as const,
      priority: url === "" ? 1 : (["/services", "/templates", "/pricing", "/products", "/request"].includes(url) ? 0.9 : 0.7),
    })),
    ...serviceDetails.map(service => ({
      url: `${base}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...templates.map(template => ({
      url: `${base}/templates/${template.slug}`,
      lastModified: new Date(template.created_at),
      changeFrequency: "monthly" as const,
      priority: template.featured ? 0.8 : 0.7,
    })),
    ...projects.map(project => ({
      url: `${base}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...insightArticles.map(article => ({
      url: `${base}/market-insights/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
