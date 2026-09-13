import { createLeadAdmin } from "@/lib/supabase/admin";
import { getLeadFormConfig, leadAllowedOrigins } from "@/lib/inquiries/config";
import { handleLeadRequest } from "@/lib/inquiries/endpoint";
import { verifyLeadChallenge } from "@/lib/inquiries/request-security";
import { getWorkProjectBySlug } from "@/lib/work/repository";

export async function POST(request: Request) {
  return handleLeadRequest(request, {
    enabled: getLeadFormConfig().enabled,
    origins: leadAllowedOrigins(),
    verify: (token, origin) => verifyLeadChallenge(token, process.env.TURNSTILE_SECRET_KEY!, origin),
    resolveTemplate: async slug => {
      const { data, error } = await createLeadAdmin().from("templates").select("id").eq("slug", slug).eq("status", "published").maybeSingle();
      if (error) throw new Error("Template lookup failed");
      return data?.id ?? null;
    },
    projectExists: async slug => Boolean(await getWorkProjectBySlug(slug)),
    save: async lead => {
      const { error } = await createLeadAdmin().rpc("submit_digital_lead", { p_lead: lead });
      return { error };
    },
    // This diagnostic contains only stage, a controlled code and a UUID.
    log: event => console.warn("lead_submission_failed", event),
  });
}
