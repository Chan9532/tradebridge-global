# Template management

`/admin/templates` uses the Site's existing ChatGPT sign-in capability. Access is granted only when the authenticated email appears in the server-only `ADMIN_EMAILS` allowlist. There is no local demo login and no public link to the route.

Every create or update request is checked again by `/api/admin/templates`. The API requires an authenticated allowlisted user, an approved browser origin, JSON content, and schema-valid fields. Database writes use `SUPABASE_SERVICE_ROLE_KEY` only on the server. The key is never sent to the browser. Supabase RLS continues to expose only `published` and `coming_soon` template rows to public catalog clients; drafts remain private.

Required hosted environment values:

- `ADMIN_EMAILS`: comma-separated owner/admin email addresses.
- `ADMIN_ALLOWED_ORIGINS`: comma-separated HTTPS origins allowed to submit admin changes.
- Existing `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` values.

Data flow:

1. The Site authenticates the visitor through ChatGPT sign-in.
2. The server checks the authenticated email against `ADMIN_EMAILS`.
3. The server reads all template statuses with the Supabase service-role client.
4. The browser submits validated changes to the protected same-origin API.
5. The API repeats authorization and validation, then writes to Supabase.
6. Public template pages continue to read only public columns and public statuses through RLS.
