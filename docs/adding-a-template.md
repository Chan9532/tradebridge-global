# Adding a template

Once the Supabase variables are configured, `public.templates` is the catalog source for cards, filters, detail pages, metadata and quote-form selection. Do not add a separate Next.js page for each template.

## 1. Choose the publication state

- Use `published` only when the internal demo has been reviewed and the design can be selected for customization.
- Use `coming_soon` while the design is safe to show but is not ready for selection.
- Keep incomplete or private work as `draft`.
- A published template requires a working `demo_url`.
- A coming-soon template must use `demo_url: null`.
- `featured` is a separate boolean. It controls ordering and homepage highlights, but never makes a draft public.

## 2. Add the record

Create a row through the existing Supabase project's authorized dashboard or migration workflow. Use this shape as a guide and replace every example value with real internal information:

```sql
insert into public.templates (
  name, slug, industry, style, short_description,
  thumbnail_url, demo_url, screenshots, pages, features,
  starting_price, mobile_responsive, featured, status
) values (
  'Template Name',
  'template-name',
  'Industry Name',
  'Clean',
  'One concise sentence explaining the business use of this design.',
  'https://example.supabase.co/storage/v1/object/public/template-assets/template-name/cover.webp',
  null,
  '{}',
  array['Home', 'Services', 'About', 'Contact'],
  array['Clear service overview', 'Lead enquiry form', 'Trust section'],
  null,
  true,
  false,
  'coming_soon'
);
```

Rules for the record:

1. Keep the slug unique, lowercase and hyphenated. The database creates the UUID.
2. Keep descriptions concise and factual.
3. Use a supported style from `lib/templates/themes.ts`; unknown styles receive the safe default visual theme.
4. List only pages and features actually planned or implemented.
5. Use local asset paths only for previews already shipped with the site. New assets should use reviewed HTTPS URLs from a deliberately public bucket or another approved public host.
6. Do not copy screenshots from another template marketplace or website.

## 3. Publish only when ready

When the design and internal demo are complete, update the same row:

```sql
update public.templates
set screenshots = array[
      'https://example.supabase.co/storage/v1/object/public/template-assets/template-name/home.webp',
      'https://example.supabase.co/storage/v1/object/public/template-assets/template-name/inner.webp'
    ],
    demo_url = '/templates/template-name/demo',
    starting_price = 399,
    status = 'published'
where slug = 'template-name';
```

The detail page then enables Live Demo and Use This Design. The quote page preserves and validates the template slug and name. Returning the status to `draft` removes it from public catalog and detail queries.

## 4. Validate before publishing

- `/templates` shows the correct status, industry, style and price.
- `/templates/template-name` opens without errors.
- A coming-soon entry has no active demo or selection button.
- A published entry opens its demo and Use This Design preserves the selected template on `/get-quote`.
- Draft slugs return the not-found state to anonymous visitors.
- Search and industry/style/page-count filters still find the entry.
- Mobile and desktop layouts remain usable.

Run `supabase/tests/digital_rls.sql` after policy changes. It rolls back its fixtures and verifies that draft records and private leads remain inaccessible to visitor roles.
