export type PricingPackageId = "starter-website" | "business-website" | "business-system";

export type PricingPackage = {
  id: PricingPackageId;
  name: string;
  price: number;
  audience: string;
  description: string;
  inclusions: readonly string[];
};

export type AdditionalPrice = {
  id: "landing-page" | "automation" | "ai-integration" | "ai-agent" | "maintenance";
  name: string;
  price: number;
  suffix: "+";
  billing?: "/month";
  description: string;
};

export const pricingConfig = {
  currency: "USD",
  scopeNotice: "Final pricing depends on requirements and project scope.",
  packages: [
    {
      id: "starter-website",
      name: "Starter Website",
      price: 399,
      audience: "For small businesses.",
      description: "A focused, professional website for establishing a clear online presence.",
      inclusions: ["Up to 5 pages", "Responsive design", "Contact form", "Social links", "Basic SEO setup"],
    },
    {
      id: "business-website",
      name: "Business Website",
      price: 899,
      audience: "For growing businesses.",
      description: "A more tailored website designed to support marketing and lead generation.",
      inclusions: ["Custom website", "5–10 pages", "Lead forms", "Analytics", "Basic integrations", "Stronger customization"],
    },
    {
      id: "business-system",
      name: "Business System",
      price: 1500,
      audience: "For connected business operations.",
      description: "A website or application connected to the data and workflows your team needs.",
      inclusions: ["Website or application", "Database", "CRM or dashboard", "API integrations", "Workflow automation", "Training and handover"],
    },
  ] satisfies readonly PricingPackage[],
  additionalStartingPoints: [
    { id: "landing-page", name: "Landing Page", price: 249, suffix: "+", description: "A focused page for one offer or campaign." },
    { id: "automation", name: "Automation", price: 350, suffix: "+", description: "A defined workflow across your existing tools." },
    { id: "ai-integration", name: "AI Integration", price: 750, suffix: "+", description: "A scoped AI feature connected to a business process." },
    { id: "ai-agent", name: "AI Agent", price: 1000, suffix: "+", description: "A controlled agent for a defined multi-step task." },
    { id: "maintenance", name: "Maintenance", price: 79, suffix: "+", billing: "/month", description: "Ongoing updates, checks and technical support." },
  ] satisfies readonly AdditionalPrice[],
} as const;

export function getPricingPackage(id: PricingPackageId) {
  return pricingConfig.packages.find(item => item.id === id)!;
}

export function formatPrice(price: number, suffix = "", billing = "") {
  const amount = new Intl.NumberFormat("en-US", { style: "currency", currency: pricingConfig.currency, maximumFractionDigits: 0 }).format(price);
  return `${amount}${suffix}${billing}`;
}
