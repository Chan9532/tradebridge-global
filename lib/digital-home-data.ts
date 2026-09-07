export type ServiceId = "websites" | "systems" | "automation" | "ai";

export const coreServices: ReadonlyArray<{ id: ServiceId; title: string; summary: string; items: readonly string[] }> = [
  { id: "websites", title: "Websites", summary: "Clear, fast experiences built around your goals.", items: ["Business websites", "Landing pages", "Custom websites"] },
  { id: "systems", title: "Business Systems", summary: "The tools your team needs to run work smoothly.", items: ["CRM", "Lead management", "Dashboards", "Booking systems"] },
  { id: "automation", title: "Automation", summary: "Less repetitive work and more reliable follow-up.", items: ["Lead automation", "CRM automation", "Email workflows", "n8n"] },
  { id: "ai", title: "AI Solutions", summary: "Practical AI connected to real business workflows.", items: ["AI assistants", "Lead qualification", "AI integrations", "AI agents"] },
];

export const featuredTemplates = [
  { name: "Studio Launch", category: "Creative services", description: "A confident portfolio layout built to turn interest into enquiries.", accent: "violet" },
  { name: "Local Pro", category: "Local business", description: "A conversion-focused service site with clear calls to action.", accent: "blue" },
  { name: "SaaS Signal", category: "Software", description: "A clean product story for a modern SaaS launch.", accent: "cyan" },
  { name: "Consult Flow", category: "Consulting", description: "An authority-led site for expertise, offers and lead capture.", accent: "amber" },
  { name: "Shopfront Lite", category: "Product showcase", description: "An editorial catalog for presenting a focused product range.", accent: "rose" },
  { name: "Course Canvas", category: "Education", description: "A structured learning offer with a simple enrollment journey.", accent: "emerald" },
] as const;

export const featuredWork = [
  { title: "TradeBridge Digital Website System", type: "Brand & website system", status: "Internal build", description: "A modular website foundation designed for gradual expansion." },
  { title: "Lead Intake Workspace", type: "CRM workflow", status: "Demo concept", description: "A focused pipeline for capturing, qualifying and assigning enquiries." },
  { title: "Automation Operations Board", type: "Automation dashboard", status: "Demo concept", description: "A clear view of workflow health, handoffs and exceptions." },
] as const;

export const pricing = {
  currency: "USD",
  tiers: [
    { name: "Starter", price: 499, description: "For a focused online presence.", features: ["Up to 5 core pages", "Responsive build", "Contact enquiry setup"] },
    { name: "Business", price: 1200, description: "For a growing service business.", features: ["Custom page system", "CMS-ready structure", "Conversion-focused sections"] },
    { name: "Business System", price: 2500, description: "For connected operations and workflows.", features: ["Website or portal", "CRM workflow", "Automation planning"] },
  ],
} as const;

export const processSteps = [
  { title: "Choose", description: "Select a template or share the outcome you need." },
  { title: "Discuss", description: "We clarify scope, content, timeline and priorities." },
  { title: "Build", description: "Your solution is designed, built and reviewed." },
  { title: "Launch", description: "We test, hand over and help you go live." },
] as const;
