import assert from "node:assert/strict";
import test from "node:test";
import { contactSchema, quoteSchema, prepareQuoteDraft, prepareContactDraft, serviceOptions } from "../lib/inquiries/validation.ts";

const validQuote = {
  name: " Test Person ", email: "test@example.com", company: "Example Business", country: "Japan",
  phone: "", service: "Website", template: "", description: "A website with a practical enquiry workflow.",
  budget: "Need guidance", timeline: "Flexible",
};

test("accepts each offered service and optional empty phone/template", () => {
  for (const service of serviceOptions) assert.equal(quoteSchema.parse({ ...validQuote, service }).name, "Test Person");
});

test("rejects invalid choices, contact data and incomplete requirements", () => {
  for (const [key, value] of Object.entries({ name: " ", email: "invalid", company: "", country: "", phone: "call me", service: "Unknown", description: "too short", budget: "anything", timeline: "" })) {
    const result = quoteSchema.safeParse({ ...validQuote, [key]: value });
    assert.equal(result.success, false, key);
    assert.ok(result.error.issues.some(issue => issue.path[0] === key), key);
  }
  assert.equal(quoteSchema.safeParse({ ...validQuote, description: "x".repeat(3001) }).success, false);
  assert.equal(quoteSchema.safeParse({ ...validQuote, phone: "+81 (90) 1234-5678" }).success, true);
});

test("draft preparation validates template membership and spam signal", async () => {
  const result = await prepareQuoteDraft({ ...validQuote, template: "studio-launch" }, "", ["studio-launch"]);
  assert.equal(result.kind, "local-preview");
  assert.equal(result.data.template, "studio-launch");
  await assert.rejects(prepareQuoteDraft({ ...validQuote, template: "unknown" }, "", ["studio-launch"]), /unavailable/);
  await assert.rejects(prepareQuoteDraft(validQuote, "bot entry", []), /could not validate/);
});

test("contact supports optional company and validates message/email", async () => {
  const contact = { name: "Test Person", email: "test@example.com", company: "", message: "I would like to discuss a project." };
  assert.equal((await prepareContactDraft(contact, "")).kind, "local-preview");
  assert.equal(contactSchema.safeParse({ ...contact, email: "bad" }).success, false);
  assert.equal(contactSchema.safeParse({ ...contact, message: "short" }).success, false);
  await assert.rejects(prepareContactDraft(contact, "bot entry"), /could not validate/);
});
