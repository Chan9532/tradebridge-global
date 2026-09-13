"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LeadChallenge } from "./lead-challenge";
import { createLeadSender, type LeadFormConfig } from "@/lib/inquiries/send-lead";
import { DraftReady, HoneyField, InquiryField } from "./inquiry-fields";
import { budgetOptions, prepareQuoteDraft, quoteSchema, serviceOptions, timelineOptions, type QuoteValues } from "@/lib/inquiries/validation";

type Selection = { slug: string; name: string };

export function ProjectQuoteForm({ selectedTemplate, selectedProject, templates = [], delivery = { enabled: false, siteKey: "" } }: { delivery?: LeadFormConfig; selectedTemplate?: Selection; selectedProject?: Selection; templates?: readonly Selection[] }) {
  const [draft, setDraft] = useState<Pick<QuoteValues, "service" | "template" | "budget" | "timeline"> | null>(null);
  const [saved, setSaved] = useState(false);
  const [token, setToken] = useState("");
  const [challengeAttempt, setChallengeAttempt] = useState(0);
  const requestId = useRef<string | null>(null);
  const inFlight = useRef(false);
  const sender = useRef(createLeadSender());
  const honeypot = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setError, clearErrors, setFocus, reset, formState: { errors, isSubmitting } } = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "", email: "", company: "", country: "", phone: "",
      service: selectedTemplate ? "Website" : "",
      template: selectedTemplate?.slug ?? "",
      description: selectedProject ? `I would like to build something similar to ${selectedProject.name} for my business.` : "",
      budget: "", timeline: "",
    },
  });

  function attrs(name: keyof QuoteValues, optional = false) {
    const id = `quote-${name}`;
    return { id, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${id}-error` : undefined, "aria-required": !optional, className: "text-base", ...register(name) };
  }

  async function submit(values: QuoteValues) {
    if (inFlight.current) return;
    inFlight.current = true;
    clearErrors("root");
    try {
      const result = await prepareQuoteDraft(values, honeypot.current?.value ?? "", templates.map(template => template.slug));
      if (delivery.enabled) {
        if (!token) throw new Error("Complete the security check before sending your request.");
        requestId.current ??= crypto.randomUUID();
        await sender.current({ kind: "quote", values: result.data, project: selectedProject?.slug ?? null, request_id: requestId.current, token, website: honeypot.current?.value ?? "" });
        setSaved(true);
        // Clear personal details after a confirmed save, retaining useful context.
        reset({ name: "", email: "", company: "", country: "", phone: "", service: result.data.service, template: result.data.template, description: "", budget: "", timeline: "" });
        requestId.current = null;
      }
      setDraft({ service: result.data.service, template: result.data.template, budget: result.data.budget, timeline: result.data.timeline });
    } catch (error) {
      setError("root", { message: error instanceof Error ? error.message : "We could not validate your details. Please try again." });
    } finally {
      inFlight.current = false;
      if (delivery.enabled) { setToken(""); setChallengeAttempt(current => current + 1); }
    }
  }

  if (draft) return <DraftReady saved={saved} title={saved ? "Your quote request has been received" : "Your project brief is ready"} onEdit={() => { setDraft(null); setSaved(false); requestAnimationFrame(() => setFocus("name")); }}>
    <dl className="mt-5 grid gap-3 rounded-xl bg-slate-50 p-5 text-sm sm:grid-cols-2">
      <div><dt className="text-slate-500">Service needed</dt><dd className="mt-1 font-semibold text-slate-800">{draft.service}</dd></div>
      <div><dt className="text-slate-500">Template selected</dt><dd className="mt-1 font-semibold text-slate-800">{templates.find(template => template.slug === draft.template)?.name ?? "None"}</dd></div>
      <div><dt className="text-slate-500">Estimated budget (USD)</dt><dd className="mt-1 font-semibold text-slate-800">{draft.budget}</dd></div>
      <div><dt className="text-slate-500">Desired timeline</dt><dd className="mt-1 font-semibold text-slate-800">{draft.timeline}</dd></div>
    </dl>
  </DraftReady>;

  return <form onChange={() => { if (!inFlight.current) requestId.current = null; }} onSubmit={handleSubmit(submit)} aria-busy={isSubmitting} className="space-y-6" noValidate>
    <p className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950">{delivery.enabled ? "Share your requirements to request a quote. All fields are required unless marked optional." : "Online delivery is not configured. This form checks your details only; nothing is sent or saved. All fields are required unless marked optional."}</p>
    {selectedProject && <p className="rounded-xl border border-slate-200 bg-white p-4 text-base text-slate-700">Reference project: <strong>{selectedProject.name}</strong></p>}
    <HoneyField inputRef={honeypot} />
    <fieldset disabled={isSubmitting} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <legend className="px-2 text-xl font-extrabold text-[#0a1a2f]">Your contact details</legend>
      <div className="grid gap-5 sm:grid-cols-2">
        <InquiryField id="quote-name" label="Name" error={errors.name?.message}><Input {...attrs("name")} autoComplete="name" maxLength={100} /></InquiryField>
        <InquiryField id="quote-email" label="Email" error={errors.email?.message}><Input {...attrs("email")} type="email" autoComplete="email" maxLength={254} /></InquiryField>
        <InquiryField id="quote-company" label="Company / Business" error={errors.company?.message}><Input {...attrs("company")} autoComplete="organization" maxLength={150} /></InquiryField>
        <InquiryField id="quote-country" label="Country" error={errors.country?.message}><Input {...attrs("country")} autoComplete="country-name" maxLength={100} /></InquiryField>
        <InquiryField id="quote-phone" label="WhatsApp or phone" optional error={errors.phone?.message}><Input {...attrs("phone", true)} type="tel" autoComplete="tel" maxLength={40} /></InquiryField>
      </div>
    </fieldset>
    <fieldset disabled={isSubmitting} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <legend className="px-2 text-xl font-extrabold text-[#0a1a2f]">Project requirements</legend>
      <div className="grid gap-5 sm:grid-cols-2">
        <InquiryField id="quote-service" label="Service needed" error={errors.service?.message}><Select {...attrs("service")}><option value="">Choose a service</option>{serviceOptions.map(value => <option key={value}>{value}</option>)}</Select></InquiryField>
        <InquiryField id="quote-template" label="Template selected" optional error={errors.template?.message}><Select {...attrs("template", true)}><option value="">None — custom project</option>{templates.map(template => <option key={template.slug} value={template.slug}>{template.name}</option>)}</Select></InquiryField>
        <InquiryField id="quote-description" label="Project description" error={errors.description?.message} className="sm:col-span-2"><Textarea {...attrs("description")} rows={6} maxLength={3000} placeholder="What should this project do for your business? Include the pages, workflow or features you need." /></InquiryField>
        <InquiryField id="quote-budget" label="Estimated budget (USD)" error={errors.budget?.message}><Select {...attrs("budget")}><option value="">Choose a budget</option>{budgetOptions.map(value => <option key={value}>{value}</option>)}</Select></InquiryField>
        <InquiryField id="quote-timeline" label="Desired timeline" error={errors.timeline?.message}><Select {...attrs("timeline")}><option value="">Choose a timeline</option>{timelineOptions.map(value => <option key={value}>{value}</option>)}</Select></InquiryField>
      </div>
    </fieldset>
    {delivery.enabled && <LeadChallenge key={challengeAttempt} siteKey={delivery.siteKey} onToken={setToken} />}
    {errors.root?.message && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-base text-red-800">{errors.root.message}</p>}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-600">{delivery.enabled ? "Your details will be used to respond to your project enquiry." : "Review your brief before contacting us."}</p>
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">{isSubmitting ? (delivery.enabled ? "Sending request…" : "Checking details…") : (delivery.enabled ? "Send Quote Request" : "Review My Quote Request")}</Button>
    </div>
    <p role="status" className="sr-only">{isSubmitting ? "Processing your project details." : ""}</p>
  </form>;
}
