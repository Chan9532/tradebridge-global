export type DigitalServiceId =
  | "business-websites"
  | "landing-page-development"
  | "crm-lead-management"
  | "dashboard-business-applications"
  | "booking-client-portals"
  | "api-integration"
  | "business-automation"
  | "ai-integration";

export type DigitalService = {
  id: DigitalServiceId;
  name: string;
  problem: string;
  solution: string;
  deliverables: readonly string[];
};

export const digitalServices: readonly DigitalService[] = [
  {
    id: "business-websites",
    name: "Business Website Development",
    problem: "Your website feels dated, unclear or disconnected from your sales process.",
    solution: "A credible, responsive website that explains your value and guides visitors to act.",
    deliverables: ["Strategy and sitemap", "Responsive page system", "Enquiry and analytics setup"],
  },
  {
    id: "landing-page-development",
    name: "Landing Page Development",
    problem: "Campaign traffic arrives, but the page does not turn attention into enquiries.",
    solution: "A focused landing page built around one audience, offer and conversion goal.",
    deliverables: ["Offer-led structure", "Responsive landing page", "Lead capture integration"],
  },
  {
    id: "crm-lead-management",
    name: "CRM & Lead Management",
    problem: "Leads are scattered across inboxes, spreadsheets and individual follow-ups.",
    solution: "A clear pipeline that keeps every enquiry, owner and next action visible.",
    deliverables: ["Custom pipeline stages", "Lead capture and routing", "Follow-up views"],
  },
  {
    id: "dashboard-business-applications",
    name: "Dashboard & Business Applications",
    problem: "Important work and reporting are spread across tools that do not work together.",
    solution: "A focused business application that gives your team one useful operating view.",
    deliverables: ["Role-based dashboard", "Forms and workflows", "Reporting views"],
  },
  {
    id: "booking-client-portals",
    name: "Booking & Client Portals",
    problem: "Scheduling, documents and client updates require too much manual coordination.",
    solution: "A secure self-service experience for bookings, requests and shared information.",
    deliverables: ["Booking workflow", "Client account area", "Notifications and handoffs"],
  },
  {
    id: "api-integration",
    name: "API Integration",
    problem: "Your tools hold separate data and make your team repeat the same work.",
    solution: "Reliable connections that move the right information between your systems.",
    deliverables: ["Integration mapping", "Secure data connection", "Error handling and monitoring"],
  },
  {
    id: "business-automation",
    name: "Business Automation",
    problem: "Repetitive admin slows your team and makes follow-up inconsistent.",
    solution: "Practical workflows that automate routine steps while keeping people in control.",
    deliverables: ["Process mapping", "Automation build", "Run logs and handover"],
  },
  {
    id: "ai-integration",
    name: "AI Integration & AI Agents",
    problem: "You see the potential of AI but need a useful, controlled business application.",
    solution: "A scoped AI assistant or agent connected to the information and actions it needs.",
    deliverables: ["AI workflow design", "Knowledge and tool integration", "Guardrails and testing"],
  },
] as const;

export function serviceDetailPath(service: DigitalService) {
  return `/services/${service.id}`;
}

export function getDigitalService(id: string) {
  return digitalServices.find(service => service.id === id);
}
