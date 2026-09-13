import { getPricingPackage, pricingConfig } from "@/lib/pricing-data";
import type { DigitalServiceId } from "@/lib/services-data";

type DetailServiceId = Extract<DigitalServiceId, "business-websites" | "crm-lead-management" | "business-automation" | "ai-integration">;

type DetailItem = { title: string; description: string };
type RelatedItem = { title: string; label: "Demo template" | "Internal build" | "Demo concept"; description: string; href: string };
type PricingGuidance =
  | { kind: "starting"; price: number; currency: string; note: string }
  | { kind: "custom"; note: string };

export type ServiceDetail = {
  slug: DetailServiceId;
  headline: string;
  introduction: string;
  problem: { title: string; description: string; signals: readonly string[] };
  builds: readonly DetailItem[];
  features: readonly string[];
  suitableCustomers: readonly string[];
  process: readonly DetailItem[];
  pricing: PricingGuidance;
  related: readonly RelatedItem[];
  cta: { title: string; description: string };
};

const businessPrice = getPricingPackage("business-website");
const systemPrice = getPricingPackage("business-system");

export const serviceDetails: readonly ServiceDetail[] = [
  {
    slug: "business-websites",
    headline: "A business website that makes your value clear",
    introduction: "We design and build responsive websites that help growing businesses explain what they do, earn trust and generate useful enquiries.",
    problem: {
      title: "Your website should support the way you sell",
      description: "A dated or unclear website can make a capable business look difficult to understand. Visitors leave without knowing what to do next.",
      signals: ["Your offer is difficult to explain", "Mobile visitors have a poor experience", "Enquiries are inconsistent or low quality"],
    },
    builds: [
      { title: "Service-led websites", description: "Clear pages that connect each service to a customer need." },
      { title: "Conversion journeys", description: "Simple paths from first visit to a relevant enquiry." },
      { title: "Flexible content systems", description: "A structured foundation your team can expand over time." },
    ],
    features: ["Responsive page system", "Clear navigation and information hierarchy", "Contact and lead capture", "CMS-ready content structure", "Analytics foundations", "Performance and accessibility basics"],
    suitableCustomers: ["New businesses preparing to launch", "Established companies replacing an outdated site", "Service businesses that need better enquiries", "Teams planning future content or integrations"],
    process: [
      { title: "Discover", description: "Clarify your audience, offer and desired actions." },
      { title: "Structure", description: "Plan the sitemap, messaging and page flow." },
      { title: "Design & build", description: "Create, review and refine the responsive website." },
      { title: "Launch", description: "Test, publish and provide a practical handover." },
    ],
    pricing: { kind: "starting", price: businessPrice.price, currency: pricingConfig.currency, note: "The final quote depends on page count, content, integrations and timeline." },
    related: [
      { title: "Local Pro", label: "Demo template", description: "A conversion-focused service business layout.", href: "/templates/local-pro" },
      { title: "Studio Launch", label: "Demo template", description: "A confident portfolio-first website concept.", href: "/templates/studio-launch" },
      { title: "TradeBridge Digital Website System", label: "Internal build", description: "Our modular website foundation in progress.", href: "/#work" },
    ],
    cta: { title: "Ready for a website that works harder?", description: "Tell us about your business, current website and the result you want." },
  },
  {
    slug: "crm-lead-management",
    headline: "Turn scattered enquiries into a visible sales pipeline",
    introduction: "We build practical CRM and lead-management systems that give every enquiry an owner, status and clear next action.",
    problem: {
      title: "Good leads are easy to lose when the process is fragmented",
      description: "Inbox threads and disconnected spreadsheets make it difficult to respond consistently, understand pipeline health or know who should follow up.",
      signals: ["Leads live in several different tools", "Follow-up depends on individual memory", "Management cannot see the current pipeline"],
    },
    builds: [
      { title: "Lead pipelines", description: "Stages that reflect how your team actually qualifies and closes work." },
      { title: "Intake workflows", description: "Structured capture, assignment and prioritisation for new enquiries." },
      { title: "Sales visibility", description: "Useful views for activity, ownership and next steps." },
    ],
    features: ["Custom lead stages", "Website and form capture", "Assignment rules", "Tasks and follow-up reminders", "Pipeline dashboards", "Role-aware access"],
    suitableCustomers: ["Service businesses receiving regular enquiries", "Small sales teams leaving spreadsheets", "Founders who need pipeline visibility", "Teams with inconsistent lead follow-up"],
    process: [
      { title: "Map", description: "Document the current lead journey and gaps." },
      { title: "Design", description: "Define stages, fields, ownership and rules." },
      { title: "Configure", description: "Build the pipeline, views and key workflows." },
      { title: "Adopt", description: "Test with your team and provide a clear handover." },
    ],
    pricing: { kind: "starting", price: systemPrice.price, currency: pricingConfig.currency, note: "Pricing varies with users, workflow complexity, integrations and data migration." },
    related: [
      { title: "Lead Intake Workspace", label: "Demo concept", description: "A focused pipeline for qualifying and assigning enquiries.", href: "/#work" },
      { title: "Consult Flow", label: "Demo template", description: "An authority-led website concept with lead capture.", href: "/templates/consult-flow" },
    ],
    cta: { title: "Bring your lead process into one clear view", description: "Show us how enquiries arrive today and where follow-up starts to break down." },
  },
  {
    slug: "business-automation",
    headline: "Automate repetitive work without losing control",
    introduction: "We connect routine steps across your tools so information moves reliably and your team can focus on decisions, customers and delivery.",
    problem: {
      title: "Manual handoffs create delay and inconsistency",
      description: "Copying data, sending the same updates and chasing internal actions consumes time while increasing the chance of missed steps.",
      signals: ["The same data is entered more than once", "Follow-up happens late or inconsistently", "Routine work depends on one person"],
    },
    builds: [
      { title: "Lead automation", description: "Route, enrich and acknowledge new enquiries automatically." },
      { title: "Operational workflows", description: "Move data and trigger actions across connected systems." },
      { title: "Exception handling", description: "Keep people informed when an automated step needs attention." },
    ],
    features: ["Process mapping", "n8n workflow development", "CRM and email automation", "API and webhook connections", "Error notifications", "Documentation and handover"],
    suitableCustomers: ["Teams repeating the same admin every day", "Businesses using several disconnected tools", "Growing operations with fragile handoffs", "Companies that need more consistent follow-up"],
    process: [
      { title: "Identify", description: "Find repetitive work with a clear business cost." },
      { title: "Plan", description: "Define triggers, actions, exceptions and ownership." },
      { title: "Automate", description: "Build and test the workflow with safe sample data." },
      { title: "Monitor", description: "Launch with logs, alerts and a clear support path." },
    ],
    pricing: { kind: "custom", note: "Automation is quoted after a short workflow review because the number of systems, steps and exceptions determines the scope." },
    related: [
      { title: "Automation Operations Board", label: "Demo concept", description: "A visual concept for workflow health and exceptions.", href: "/#work" },
      { title: "ClearNest Cleaning", label: "Demo template", description: "A service website concept with a structured quote path.", href: "/templates/clearnest-cleaning" },
    ],
    cta: { title: "What repetitive work should your team stop doing?", description: "Describe one process that takes too much time and we’ll help assess the opportunity." },
  },
  {
    slug: "ai-integration",
    headline: "Practical AI connected to a real business workflow",
    introduction: "We design focused AI assistants and agents with defined information, actions and guardrails—not AI added without a useful purpose.",
    problem: {
      title: "AI creates value only when the use case is clear",
      description: "Generic tools often sit outside existing processes. Teams need a controlled solution that understands the right context and knows when a person should take over.",
      signals: ["Your team repeatedly searches the same knowledge", "Lead review is slow and inconsistent", "You want AI but cannot define a safe first use case"],
    },
    builds: [
      { title: "AI assistants", description: "Focused support for internal knowledge, customers or team tasks." },
      { title: "Lead qualification", description: "Structured review and routing based on agreed business criteria." },
      { title: "AI agents", description: "Controlled multi-step workflows with tools, limits and human handoffs." },
    ],
    features: ["Use-case and risk definition", "Knowledge-source connection", "Prompt and workflow design", "Business-tool integration", "Human approval points", "Evaluation and guardrails"],
    suitableCustomers: ["Teams with a defined repetitive knowledge task", "Businesses handling high enquiry volume", "Companies with organised internal information", "Leaders seeking a controlled AI pilot"],
    process: [
      { title: "Define", description: "Choose one useful outcome and its boundaries." },
      { title: "Prepare", description: "Identify trusted knowledge, tools and approval points." },
      { title: "Prototype", description: "Build and evaluate the workflow against real scenarios." },
      { title: "Integrate", description: "Deploy carefully, monitor results and refine." },
    ],
    pricing: { kind: "custom", note: "AI projects are quoted after use-case and data review. Complexity depends on integrations, knowledge sources, evaluation and required guardrails." },
    related: [
      { title: "Lead Intake Workspace", label: "Demo concept", description: "A pipeline concept that can support assisted qualification.", href: "/#work" },
      { title: "Automation Operations Board", label: "Demo concept", description: "A clear model for monitored automated workflows.", href: "/#work" },
    ],
    cta: { title: "Start with one useful AI use case", description: "Tell us the task, information and business outcome you want to improve." },
  },
] as const;

export function getServiceDetail(slug: string) {
  return serviceDetails.find(service => service.slug === slug);
}
