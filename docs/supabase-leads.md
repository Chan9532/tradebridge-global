# Supabase: templates and private leads

Existing integration reused: @supabase/ssr, @supabase/supabase-js, lib/supabase/client.ts, lib/supabase/server.ts, the Supabase migration folder and existing environment names. No new Supabase project, CLI config, authentication system or storage bucket was created.

## Schema and relationship

`templates`: UUID id, unique slug, name, industry, style, short_description, thumbnail_url, demo_url, screenshots/pages/features (text arrays), starting_price (numeric USD), mobile_responsive, featured, status, created_at and updated_at. Status is draft, published or coming_soon. Demo URL and starting price are nullable; published templates require a demo URL. Other fields have a non-null value or default. Screenshot and responsive fields preserve the current catalog.

`leads`: UUID id, unique request_id, name, email, company, country, phone, service, template_id, project_slug, project_description, budget, timeline, status, source, created_at and updated_at. Phone, template_id and project_slug are nullable. Company, country, service, budget and timeline may be null on contact messages; quote rows require company, country, service, budget and timeline. Source is contact or get-quote, set by the server. Status defaults to new and is never accepted from a browser payload.

Many leads reference one template by its UUID. The server resolves the selected slug to a published template; deleting a template sets the FK to null without deleting leads. project_slug references the static Work catalog and is verified server-side. Updated timestamps are maintained by triggers.

## Public/private boundary

Both tables enable and force RLS. Explicit column grants permit anon/authenticated SELECT only on the public template fields, filtered by an RLS policy to published/coming_soon. Draft records are not public. Future admin-only columns are private by default. No visitor or ordinary authenticated role can insert/update/delete templates or SELECT/INSERT/UPDATE/DELETE leads. The submit function also denies PUBLIC, anon and authenticated execution.

Lead identities, contact details, requirements, budgets, source data, status and timestamps are private. There is no public lead endpoint, lead listing, public view or Realtime subscription. Initial administration uses the Supabase dashboard with authorized operator access. The service role bypasses RLS and is restricted to a server-only module; never add NEXT_PUBLIC_ to its name or pass the client/key to a component.

The older trade migration trusts a user-editable profile role in is_admin() and handle_new_user(). The digital tables do not use that helper. Do not grant digital access based on it. This change does not certify or repair the unrelated legacy trade tables: their role escalation requires a separate review before they are relied upon.

## Request path

The form sends only an allowlisted JSON shape to POST /api/leads. The endpoint repeats Zod validation, checks the configured Origin, reads at most 16 KiB, rejects the honeypot, verifies Turnstile server-side (single-use token, hostname and action=lead), resolves template/project references, and calls submit_digital_lead with server-controlled source fields. No GET lead route exists.

The SQL function is SECURITY INVOKER, executable only by service_role. It takes a transaction-scoped advisory lock for the email, accepts at most five new leads per email per hour, and uses a unique request_id for idempotency. Client in-flight guards prevent rapid double clicks; a failed retry retains its ID unless details are edited. The email limit and Turnstile reduce abuse; an edge/global rate limit is still appropriate for protection against distributed resource-exhaustion attacks. No raw IP addresses are retained.

Only a confirmed database success shows received and clears personal fields. Service/template context remains for a subsequent enquiry, and source/project attribution is saved on the lead. On failures, fields remain populated. Logs contain only stage, controlled diagnostic code and UUID, never raw errors, payloads, emails, keys or challenge tokens. No email automation is created.

## Activate on the existing project

1. Verify the existing project URL. Do not create a second Supabase project or rerun the old trade bootstrap migration.
2. Apply supabase/migrations/202609130001_digital_templates_leads.sql using the existing project's migration workflow or SQL editor. It is additive and intentionally fails if conflicting tables already exist so their schema can be inspected.
3. Run supabase/seed-templates.sql once to import the 10 existing internal templates. Conflict handling preserves live edits. No sample leads are seeded.
4. Run supabase/tests/digital_rls.sql with the SQL editor. It checks anonymous/authenticated denial, draft visibility, idempotency and the rate limit, then rolls back its fixtures.
5. Set the existing URL and anon key plus SUPABASE_SERVICE_ROLE_KEY in ignored .env.local for local use or server secrets for hosting. Configure a Turnstile site/secret pair and exact LEAD_ALLOWED_ORIGINS. Do not paste keys in chat, commit them or put elevated keys in NEXT_PUBLIC variables. Set allowed Turnstile hostnames to the deployed site. Use test keys only in an isolated local environment.
6. Only after the migration, RLS verification and secrets are ready, set LEAD_SUBMISSIONS_ENABLED=true and restart/rebuild. Browser-facing site keys may require a rebuild. The endpoint fails closed otherwise; forms clearly remain preview-only.
7. Run a controlled test submission on the configured project and inspect its saved source/template fields using authorized dashboard access. Verify browser anon/authenticated access remains denied. No live DB verification was possible without credentials in this workspace.

When Supabase is configured, the catalog reads it using the existing non-elevated server client and RLS. Empty database results stay empty; outages are not disguised as static templates. The static catalog is used only without Supabase configuration. Existing generated template preview URLs are internal demo artwork, not database screenshots.

Tests: node --test tests/inquiry-validation.test.mjs tests/lead-submission.test.mjs. Endpoint tests use injected database/verification adapters to simulate valid saving and failures; they do not prove a remote migration was applied.

References: https://supabase.com/docs/guides/database/secure-data and https://developers.cloudflare.com/turnstile/get-started/server-side-validation/.
