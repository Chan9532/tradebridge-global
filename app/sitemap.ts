import type { MetadataRoute } from "next";
import { insightArticles } from "@/lib/insights-data";
import { serviceDetails } from "@/lib/service-details-data";
import { listWorkProjects } from "@/lib/work/repository";
import { listTemplates } from "@/lib/templates/repository";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [templatesResult, projectsResult] = await Promise.allSettled([listTemplates(), listWorkProjects()]);
  const templates = templatesResult.status === "fulfilled" ? templatesResult.value : [];
  const projects = projectsResult.status === "fulfilled" ? projectsResult.value : [];
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
      url: `${SITE_URL}${url}`,
      changeFrequency: url === "" ? "weekly" as const : "monthly" as const,
      priority: url === "" ? 1 : (["/services", "/templates", "/pricing", "/products", "/request"].includes(url) ? 0.9 : 0.7),
    })),
    ...serviceDetails.map(service => ({
      url: `${SITE_URL}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...templates.map(template => ({
      url: `${SITE_URL}/templates/${template.slug}`,
      lastModified: new Date(template.created_at),
      changeFrequency: "monthly" as const,
      priority: template.featured ? 0.8 : 0.7,
    })),
    ...projects.map(project => ({
      url: `${SITE_URL}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...insightArticles.map(article => ({
      url: `${SITE_URL}/market-insights/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
