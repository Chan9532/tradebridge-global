export type ServiceId = "websites" | "systems" | "automation" | "ai";

export const coreServices: ReadonlyArray<{ id: ServiceId; title: string; summary: string; items: readonly string[] }> = [
  { id: "websites", title: "Websites", summary: "Clear, fast experiences built around your goals.", items: ["Business websites", "Landing pages", "Custom websites"] },
  { id: "systems", title: "Business Systems", summary: "The tools your team needs to run work smoothly.", items: ["CRM", "Lead management", "Dashboards", "Booking systems"] },
  { id: "automation", title: "Automation", summary: "Less repetitive work and more reliable follow-up.", items: ["Lead automation", "CRM automation", "Email workflows", "n8n"] },
  { id: "ai", title: "AI Solutions", summary: "Practical AI connected to real business workflows.", items: ["AI assistants", "Lead qualification", "AI integrations", "AI agents"] },
];

export const featuredWork = [
  { title: "TradeBridge Digital Website System", type: "Brand & website system", status: "Internal build", description: "A modular website foundation designed for gradual expansion." },
  { title: "Lead Intake Workspace", type: "CRM workflow", status: "Demo concept", description: "A focused pipeline for capturing, qualifying and assigning enquiries." },
  { title: "Automation Operations Board", type: "Automation dashboard", status: "Demo concept", description: "A clear view of workflow health, handoffs and exceptions." },
] as const;

export const processSteps = [
  { title: "Choose", description: "Select a template or share the outcome you need." },
  { title: "Discuss", description: "We clarify scope, content, timeline and priorities." },
  { title: "Build", description: "Your solution is designed, built and reviewed." },
  { title: "Launch", description: "We test, hand over and help you go live." },
] as const;
