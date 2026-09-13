import type { WorkCaseStudy } from "./types";

export const websiteCaseStudy = {
  requirements: [
    "Keep the existing sourcing pages available during the digital-services rebuild.",
    "Separate reusable templates from project work and case studies.",
    "Carry the chosen template or project into a structured quote request.",
  ],
  architecture: [
    { name: "Pages", description: "Next.js App Router pages render the service, template and work content through the project's Vinext runtime." },
    { name: "Project content", description: "Typed project records are read through a repository interface and passed to shared cards and case study pages." },
    { name: "Quote intake", description: "The quote page resolves the selected project by slug. The quote form uses shared Zod validation. When configured, a protected server endpoint validates the request again and saves a private lead in Supabase; otherwise the form remains a local preview." },
  ],
  challenges: [
    "Keeping templates and actual project work distinct while sharing the site's visual foundation.",
    "Describing the state of internal and concept projects without presenting plans as delivered client work.",
  ],
  testing: {
    status: "Not documented",
    details: ["A dated project testing report has not been published. This case study does not claim completed user acceptance, accessibility or production integration testing."],
  },
  result: {
    summary: "The current implementation includes separate template and work catalogs, reusable project cards and project-aware quote intake. No measured commercial outcomes have been published.",
    evidence: [],
  },
  lessons: [],
} satisfies WorkCaseStudy;

export const leadIntakeCaseStudy = {
  requirements: ["Capture enquiry details in a consistent format.", "Make pipeline stage, owner and next action visible.", "Keep access to lead information limited to the appropriate team."],
  architecture: [
    { name: "Intake", description: "Proposed: validate incoming enquiry fields before creating a lead record." },
    { name: "Lead records", description: "Proposed: store leads and ownership in Supabase with access rules for team members." },
    { name: "Workspace", description: "Proposed: a Next.js interface displays stages and follow-up actions." },
  ],
  challenges: ["Design consideration: prevent duplicate enquiries from creating conflicting ownership.", "Design consideration: keep personal lead information out of unauthorized views."],
  testing: { status: "Planned", details: ["Validate required fields and duplicate handling.", "Check access rules with different team roles.", "Check that ownership and stage updates persist correctly."] },
  result: { summary: "Concept only. A working lead workspace and operational outcomes have not been demonstrated.", evidence: [] },
  lessons: [],
} satisfies WorkCaseStudy;

export const automationCaseStudy = {
  requirements: ["Show the last known workflow state and run history.", "Make failures and human handoffs visible.", "Keep ownership of exceptions clear."],
  architecture: [
    { name: "Workflow events", description: "Proposed: n8n workflows send run events through authenticated webhooks." },
    { name: "Run records", description: "Proposed: Supabase stores run states and exception ownership." },
    { name: "Operations board", description: "Proposed: a TypeScript interface separates workflow health from exceptions awaiting review." },
  ],
  challenges: ["Design consideration: tolerate delayed or duplicate webhook events.", "Design consideration: distinguish stale workflow information from a healthy run."],
  testing: { status: "Planned", details: ["Simulate failed, delayed and duplicate run events.", "Verify exception assignment and human handoff states.", "Check authentication for incoming events."] },
  result: { summary: "Concept only. No live workflow monitoring, time savings or reliability improvements have been measured.", evidence: [] },
  lessons: [],
} satisfies WorkCaseStudy;

export const aiCaseStudy = {
  requirements: ["Summarize only information supplied with an enquiry.", "Apply explicit qualification criteria.", "Require a person to approve the suggested next action."],
  architecture: [
    { name: "Enquiry context", description: "Proposed: a workflow loads the enquiry and approved qualification criteria." },
    { name: "Assisted review", description: "Proposed: the OpenAI API prepares a structured summary and marks missing information for review." },
    { name: "Human decision", description: "Proposed: store the summary with its source context and require approval before subsequent actions." },
  ],
  challenges: ["Design consideration: prevent unsupported information from appearing as fact.", "Design consideration: treat instructions embedded in enquiries as untrusted input."],
  testing: { status: "Planned", details: ["Evaluate missing, conflicting and adversarial enquiry content.", "Check that summaries can be traced to supplied information.", "Verify that downstream actions require human approval."] },
  result: { summary: "Concept only. No model evaluation results, qualification accuracy or business impact have been established.", evidence: [] },
  lessons: [],
} satisfies WorkCaseStudy;
