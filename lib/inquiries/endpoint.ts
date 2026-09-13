import { leadSubmissionSchema } from "./validation.ts";
import { LeadRequestError, readLeadRequest } from "./request-security.ts";

export type LeadRecord = {
  request_id: string; name: string; email: string; company: string | null;
  country: string | null; phone: string | null; service: string | null;
  template_id: string | null; project_slug: string | null;
  project_description: string; budget: string | null; timeline: string | null;
  source: "get-quote" | "contact";
};
export type LeadDiagnostic = { event: "lead_submission_failed"; stage: string; code: string; requestId?: string };
export type LeadDependencies = {
  enabled: boolean;
  origins: readonly string[];
  verify: (token: string, origin: string) => Promise<void>;
  resolveTemplate: (slug: string) => Promise<string | null>;
  projectExists: (slug: string) => Promise<boolean>;
  save: (lead: LeadRecord) => Promise<{ error: { code?: string; message?: string } | null }>;
  log: (event: LeadDiagnostic) => void;
};

const reply = (body: object, status: number) => Response.json(body, { status, headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "3600" } : {}) } });

export async function handleLeadRequest(request: Request, dependencies: LeadDependencies) {
  let stage = "configuration";
  let requestId: string | undefined;
  if (!dependencies.enabled) {
    dependencies.log({ event: "lead_submission_failed", stage, code: "NOT_CONFIGURED" });
    return reply({ error: "Online submissions are unavailable. Please contact us by email." }, 503);
  }
  try {
    stage = "validation";
    const parsed = leadSubmissionSchema.safeParse(await readLeadRequest(request, dependencies.origins));
    if (!parsed.success) return reply({ error: "Please check the required fields, email address and text lengths, then try again." }, 400);
    const submission = parsed.data;
    requestId = submission.request_id;
    if (submission.website) return reply({ error: "We could not validate this request." }, 400);
    stage = "challenge";
    await dependencies.verify(submission.token, request.headers.get("origin")!);
    stage = "reference_lookup";
    let templateId: string | null = null;
    if (submission.kind === "quote" && submission.values.template) {
      templateId = await dependencies.resolveTemplate(submission.values.template);
      if (!templateId) throw new LeadRequestError("This template is unavailable. Clear the selection or choose another.", 400);
    }
    if (submission.kind === "quote" && submission.project && !await dependencies.projectExists(submission.project)) throw new LeadRequestError("The reference project could not be found.", 400);
    const common = { request_id: submission.request_id, name: submission.values.name, email: submission.values.email.toLowerCase(), company: submission.values.company || null };
    const lead: LeadRecord = submission.kind === "quote" ? {
      ...common, country: submission.values.country, phone: submission.values.phone || null, service: submission.values.service,
      template_id: templateId, project_slug: submission.project, project_description: submission.values.description,
      budget: submission.values.budget, timeline: submission.values.timeline, source: "get-quote",
    } : {
      ...common, country: null, phone: null, service: null, template_id: null, project_slug: null,
      project_description: submission.values.message, budget: null, timeline: null, source: "contact",
    };
    stage = "database";
    const { error } = await dependencies.save(lead);
    if (error) {
      // SQLSTATE only, never the database's raw error text or request contents.
      dependencies.log({ event: "lead_submission_failed", stage, requestId, code: error.code && /^[A-Z0-9]{5}$/.test(error.code) ? error.code : "DATABASE_ERROR" });
      if (error.message === "lead_rate_limit") return reply({ error: "Too many requests. Please try again in an hour or contact us by email." }, 429);
      if (error.message === "template_unavailable") return reply({ error: "This template is unavailable. Please choose another." }, 400);
      return reply({ error: "We could not confirm your submission. Your details are still here; please retry or contact us by email." }, 503);
    }
    return reply({ success: true }, 201);
  } catch (error) {
    dependencies.log({ event: "lead_submission_failed", stage, requestId, code: error instanceof LeadRequestError ? `HTTP_${error.status}` : "UPSTREAM_FAILURE" });
    return error instanceof LeadRequestError ? reply({ error: error.message }, error.status) : reply({ error: "We could not confirm your submission. Please retry or contact us by email." }, 503);
  }
}
