import { z } from "zod";

export const serviceOptions = ["Website", "Landing Page", "CRM", "Dashboard", "Booking System", "Automation", "AI Integration", "AI Agent", "Other"] as const;
export const budgetOptions = ["Under $500", "$500–$1,000", "$1,000–$2,500", "$2,500–$5,000", "$5,000+", "Need guidance"] as const;
export const timelineOptions = ["Within 2–4 weeks", "Within 1–2 months", "Within 3 months", "Flexible", "Need guidance"] as const;

const name = z.string().trim().min(2, "Enter your name (at least 2 characters).").max(100, "Keep your name under 100 characters.");
const email = z.string().trim().email("Enter a valid email address.").max(254, "Keep your email under 254 characters.");
const company = z.string().trim().min(2, "Enter your company or business name.").max(150, "Keep your business name under 150 characters.");
const choice = (options: readonly string[], message: string) => z.string().refine(value => options.includes(value), message);

export const quoteSchema = z.object({
  name,
  email,
  company,
  country: z.string().trim().min(2, "Enter your country.").max(100, "Keep the country under 100 characters."),
  phone: z.string().trim().max(40, "Keep the phone number under 40 characters.").refine(value => !value || (/^[+\d\s().-]+$/.test(value) && (value.match(/\d/g)?.length ?? 0) >= 7 && (value.match(/\d/g)?.length ?? 0) <= 15), "Enter a phone number with 7–15 digits, or leave this blank."),
  service: choice(serviceOptions, "Select the service you need."),
  template: z.string().trim().max(150, "Choose a template from the list."),
  description: z.string().trim().min(20, "Describe your project in at least 20 characters.").max(3000, "Keep your project description under 3,000 characters."),
  budget: choice(budgetOptions, "Select an estimated budget or choose Need guidance."),
  timeline: choice(timelineOptions, "Select a desired timeline or choose Need guidance."),
});

export const contactSchema = z.object({
  name,
  email,
  company: z.string().trim().max(150, "Keep your business name under 150 characters.").refine(value => !value || value.length >= 2, "Enter at least 2 characters, or leave company blank."),
  message: z.string().trim().min(10, "Write a message of at least 10 characters.").max(3000, "Keep your message under 3,000 characters."),
});

export type QuoteValues = z.infer<typeof quoteSchema>;
export type ContactValues = z.infer<typeof contactSchema>;

const submissionSecurity = {
  request_id: z.string().uuid(),
  token: z.string().min(1).max(2048),
  website: z.string().max(200),
};
export const leadSubmissionSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("quote"), values: quoteSchema.strict(), project: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/).max(150).nullable(), ...submissionSecurity }).strict(),
  z.object({ kind: z.literal("contact"), values: contactSchema.strict(), ...submissionSecurity }).strict(),
]);

// Draft preparation only: no database, fetch, analytics, logs or browser storage.
// A future server endpoint must independently revalidate data and resolve slugs,
// enforce rate limits and verify any anti-spam challenge before persisting it.
function checkHoneypot(value: string) {
  if (value) throw new Error("We could not validate this request. Please reload the page and try again.");
}

export async function prepareQuoteDraft(values: QuoteValues, honeypot: string, allowedTemplateSlugs: readonly string[]) {
  checkHoneypot(honeypot);
  const data = await quoteSchema.parseAsync(values);
  if (data.template && !allowedTemplateSlugs.includes(data.template)) throw new Error("The selected template is unavailable. Choose another template or clear the selection.");
  return { kind: "local-preview" as const, data };
}

export async function prepareContactDraft(values: ContactValues, honeypot: string) {
  checkHoneypot(honeypot);
  return { kind: "local-preview" as const, data: await contactSchema.parseAsync(values) };
}
