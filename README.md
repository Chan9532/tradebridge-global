# TradeBridge Global

A production-oriented international sourcing and commission-based trade-matching platform. The public experience is built around an industry catalog, a persistent multi-product Interest List, a combined sourcing request, approved buyer requests, and practical market intelligence. Supplier records and direct contact details remain private and are managed internally.

## Stack

- Next.js 16, TypeScript and Tailwind CSS 4
- shadcn/ui-style reusable primitives
- Supabase Auth, Postgres, Row Level Security and Storage
- React Hook Form, Zod, Lucide and Sonner
- Vercel deployment configuration and Sites-compatible build

## Local setup

1. Install Node.js 22 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add your Supabase project values.
4. Apply `supabase/migrations/202607190001_initial_schema.sql`, followed by `supabase/migrations/202607190002_interest_requests.sql`, in the Supabase SQL editor or with the Supabase CLI.
5. Optionally apply `supabase/seed.sql` for additional demo articles.
6. Run `npm run dev` and open `http://localhost:3000`.

Without Supabase variables the interface runs in demo mode. Forms show realistic success states but durable writes and real accounts activate only after Supabase is configured.

## Supabase setup

The migrations create all core tables, private storage, indexes, the authentication profile trigger, privacy-safe public views and RLS policies. The product-interest migration adds `product_categories`, `product_items`, `customer_requests`, and `customer_request_items`, plus an atomic `submit_customer_request` function that generates a unique reference and creates an admin notification.

Public pages expose only active catalog data, approved RFQs and published articles. Supplier profiles, buyer identities, attachments, direct contact details and internal commercial fields are never exposed publicly.

Create the first admin by registering an account, then update its profile with a trusted server-side action or the Supabase SQL editor:

```sql
update public.profiles set role = 'admin' where email = 'admin@example.com';
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` to browser code. Configure Storage bucket limits through the included migration and review allowed MIME types before expanding file support.

## Validation and deployment

- `npm run build` validates the Cloudflare/Sites-compatible output.
- `npm run build:vercel` validates the standard Next.js output.
- `npm run lint` runs static checks.
- Deploy to Vercel by importing the repository and adding the environment variables from `.env.example`. `vercel.json` selects the standard Next.js build.

Before production launch, replace placeholder contact details and office location, set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain, connect the WhatsApp and LinkedIn destinations, and confirm email templates in Supabase Auth.

## Security model

- Public users read only active sourcing categories and items, approved privacy-safe RFQs, and published articles.
- Buyers manage their own private RFQs, combined product requests, saved products and messages.
- Suppliers manage their own profile, products and offers.
- Admin authorization is checked server-side and again by RLS for data access.
- Files are private, MIME/size restricted and shared only through authorized workflows.
- Inputs are validated with Zod before submission; database constraints and RLS provide the second enforcement layer.

## Main routes

Public: `/`, `/products`, `/request`, `/buyer-requests`, `/sourcing-service`, `/market-insights`, `/market-insights/[slug]`, `/about`, `/contact`.

Accounts: `/auth/login`, `/buyer-dashboard`, `/supplier-dashboard`, `/admin`.

The supplier and admin dashboards are protected operational areas. Supplier accounts are provisioned privately; there is intentionally no public supplier directory or public supplier registration route.
