"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactSchema, prepareContactDraft, type ContactValues } from "@/lib/inquiries/validation";
import { LeadChallenge } from "./lead-challenge";
import { createLeadSender, type LeadFormConfig } from "@/lib/inquiries/send-lead";
import { DraftReady, HoneyField, InquiryField } from "./inquiry-fields";

export function ContactInquiryForm({ delivery = { enabled: false, siteKey: "" } }: { delivery?: LeadFormConfig }) {
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);
  const [token, setToken] = useState("");
  const [challengeAttempt, setChallengeAttempt] = useState(0);
  const requestId = useRef<string | null>(null);
  const inFlight = useRef(false);
  const sender = useRef(createLeadSender());
  const honeypot = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setError, clearErrors, setFocus, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", company: "", message: "" },
  });
  function attrs(name: keyof ContactValues) {
    const id = `contact-${name}`;
    return { id, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${id}-error` : undefined, "aria-required": name !== "company", className: "text-base", ...register(name) };
  }
  async function submit(values: ContactValues) {
    if (inFlight.current) return;
    inFlight.current = true;
    clearErrors("root");
    try {
      const draft = await prepareContactDraft(values, honeypot.current?.value ?? "");
      if (delivery.enabled) {
        if (!token) throw new Error("Complete the security check before sending your message.");
        requestId.current ??= crypto.randomUUID();
        await sender.current({ kind: "contact", values: draft.data, request_id: requestId.current, token, website: honeypot.current?.value ?? "" });
        setSaved(true);
        reset({ name: "", email: "", company: "", message: "" });
        requestId.current = null;
      }
      setReady(true);
    } catch (error) {
      setError("root", { message: error instanceof Error ? error.message : "We could not validate your message. Please try again." });
    } finally {
      inFlight.current = false;
      if (delivery.enabled) { setToken(""); setChallengeAttempt(current => current + 1); }
    }
  }
  if (ready) return <DraftReady saved={saved} title={saved ? "Your message has been received" : "Your message is ready"} onEdit={() => { setReady(false); setSaved(false); requestAnimationFrame(() => setFocus("name")); }} />;
  return <form onChange={() => { if (!inFlight.current) requestId.current = null; }} onSubmit={handleSubmit(submit)} aria-busy={isSubmitting} className="space-y-5" noValidate>
    <h2 className="text-2xl font-extrabold text-[#0a1a2f]">{delivery.enabled ? "Send a message" : "Prepare a message"}</h2>
    <p className="text-sm leading-6 text-slate-600">{delivery.enabled ? "Your details will be used to respond to your enquiry. All fields are required unless marked optional." : "Online delivery is not configured. This form checks your details only; nothing is sent or saved. All fields are required unless marked optional."}</p>
    <HoneyField inputRef={honeypot} />
    <fieldset disabled={isSubmitting} className="grid min-w-0 gap-5 sm:grid-cols-2">
      <legend className="sr-only">Your message details</legend>
      <InquiryField id="contact-name" label="Name" error={errors.name?.message}><Input {...attrs("name")} autoComplete="name" maxLength={100} /></InquiryField>
      <InquiryField id="contact-email" label="Email" error={errors.email?.message}><Input {...attrs("email")} type="email" autoComplete="email" maxLength={254} /></InquiryField>
      <InquiryField id="contact-company" label="Company / Business" optional error={errors.company?.message} className="sm:col-span-2"><Input {...attrs("company")} autoComplete="organization" maxLength={150} /></InquiryField>
      <InquiryField id="contact-message" label="Message" error={errors.message?.message} className="sm:col-span-2"><Textarea {...attrs("message")} rows={6} maxLength={3000} /></InquiryField>
    </fieldset>
    {delivery.enabled && <LeadChallenge key={challengeAttempt} siteKey={delivery.siteKey} onToken={setToken} />}
    {errors.root?.message && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-base text-red-800">{errors.root.message}</p>}
    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">{isSubmitting ? (delivery.enabled ? "Sending message…" : "Checking message…") : (delivery.enabled ? "Send Message" : "Review My Message")}</Button>
    <p role="status" className="sr-only">{isSubmitting ? "Checking your message." : ""}</p>
  </form>;
}
