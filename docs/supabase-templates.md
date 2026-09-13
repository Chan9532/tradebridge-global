# Supabase template catalog

## Data flow

```text
Supabase
  -> Server/Data Layer
  -> Template Components
  -> Visitor
```

1. Supabase stores the catalog in `public.templates`. Row Level Security allows anonymous and ordinary authenticated visitors to read only `published` and `coming_soon` rows.
2. The server-only repository in `lib/templates/repository.ts` queries an explicit public column list with the existing anon key. It never uses the service role key. Supabase values are parsed before they leave the data layer.
3. The data mapper translates database `published` to the existing UI value `available`, and `coming_soon` to `coming-soon`. The template cards, filters, detail page and quote selector therefore do not need a rewrite.
4. Server Components pass the public template model to the existing visitor-facing components. Browser code receives only those selected public fields.

## Publication states

- `published`: public, selectable and requires a demo URL.
- `coming_soon`: public, displayed as Coming Soon and cannot be selected.
- `draft`: private. Public catalog queries and RLS exclude it.
- `featured`: a separate boolean used to order the catalog and select homepage highlights. It does not make a draft public.

The migration grants anonymous and authenticated roles access to named columns rather than the whole table. Future admin-only columns remain private until they are deliberately added to both the database grant and server allowlist.

## Loading, empty and failure behavior

The `/templates` segment has a loading skeleton, a catalog empty state and a recoverable error boundary. `/templates/[slug]` adds a detail-specific loading skeleton, error boundary and existing not-found state. A configured Supabase database is authoritative: an empty result stays empty, and a database failure shows the failure state instead of silently substituting demo data.

Until Supabase runtime variables are added to the current project, the existing static records remain as a compatibility preview. Adding `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` switches catalog reads to Supabase. Apply `supabase/migrations/202609130001_digital_templates_leads.sql`, seed once with `supabase/seed-templates.sql`, and run `supabase/tests/digital_rls.sql` before enabling the hosted variables. The service role key is unnecessary for catalog reads and must remain server-only for lead submission.
