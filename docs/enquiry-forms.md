# Enquiry forms

/contact and /get-quote share validation and use POST /api/leads when delivery is fully configured and LEAD_SUBMISSIONS_ENABLED=true. Without that configuration they remain clearly labeled local previews; the endpoint returns 503 and never writes.

The quote form preserves template selection and Work references. /quote redirects with its query string intact. On a confirmed save, personal fields clear and the success state appears. Service/template context is retained for another request. Failure messages keep the entered values; unchanged retries reuse their request UUID, while edited submissions receive a new one. Source is assigned by the backend, not trusted from browser input.

Security, schema, migration/seed instructions and remote verification steps are documented in supabase-leads.md. Browser modules never import the service-role client. No email automation is configured.

Tests: node --test tests/inquiry-validation.test.mjs tests/lead-submission.test.mjs
