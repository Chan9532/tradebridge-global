-- Additive migration: keep the existing TradeBridge Supabase project and tables.
begin;

create table public.templates (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(btrim(name)) between 1 and 150),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  industry text not null,
  style text not null,
  short_description text not null,
  thumbnail_url text not null,
  demo_url text,
  screenshots text[] not null default '{}',
  pages text[] not null default '{}',
  features text[] not null default '{}',
  starting_price numeric(12,2) check (starting_price >= 0),
  mobile_responsive boolean not null default true,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft','published','coming_soon')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status <> 'published' or nullif(btrim(demo_url), '') is not null),
  check (status <> 'coming_soon' or demo_url is null)
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique,
  name text not null check (length(btrim(name)) between 2 and 100),
  email text not null check (length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  company text check (length(company) between 2 and 150),
  country text check (length(country) between 2 and 100),
  phone text check (length(phone) <= 40),
  service text check (service in ('Website','Landing Page','CRM','Dashboard','Booking System','Automation','AI Integration','AI Agent','Other')),
  template_id uuid references public.templates(id) on delete set null,
  project_slug text check (project_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  project_description text not null check (length(btrim(project_description)) between 10 and 3000),
  budget text check (budget in ('Under $500','$500–$1,000','$1,000–$2,500','$2,500–$5,000','$5,000+','Need guidance')),
  timeline text check (timeline in ('Within 2–4 weeks','Within 1–2 months','Within 3 months','Flexible','Need guidance')),
  status text not null default 'new' check (status in ('new','contacted','qualified','closed','spam')),
  source text not null check (source in ('get-quote','contact')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (source <> 'get-quote' or (company is not null and country is not null and service is not null and budget is not null and timeline is not null and length(btrim(project_description)) >= 20))
);
create index leads_template_idx on public.leads(template_id);
create index leads_email_created_idx on public.leads(lower(email), created_at desc);
create index leads_status_created_idx on public.leads(status, created_at desc);
create index templates_published_idx on public.templates(status, featured desc, created_at desc);

create function public.digital_set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
revoke all on function public.digital_set_updated_at() from public, anon, authenticated;
create trigger templates_updated_at before update on public.templates for each row execute function public.digital_set_updated_at();
create trigger leads_updated_at before update on public.leads for each row execute function public.digital_set_updated_at();

alter table public.templates enable row level security;
alter table public.templates force row level security;
alter table public.leads enable row level security;
alter table public.leads force row level security;
revoke all on table public.templates, public.leads from public, anon, authenticated;
-- Column-level grants keep future admin-only columns private by default.
grant select (id,name,slug,industry,style,short_description,thumbnail_url,demo_url,screenshots,pages,features,starting_price,mobile_responsive,featured,status,created_at)
  on public.templates to anon, authenticated;
grant select, insert, update, delete on public.templates, public.leads to service_role;
create policy "published templates are readable" on public.templates for select to anon, authenticated
  using (status in ('published', 'coming_soon'));
-- No lead policies for visitors or signed-in users. In particular, do not use
-- the legacy is_admin() helper: its profile role is not a trusted authority.

-- Callable only by the trusted application server. Uses the caller's permissions;
-- never grants anonymous insert rights or acts as a public SECURITY DEFINER.
create function public.submit_digital_lead(p_lead jsonb) returns void
language plpgsql security invoker set search_path = '' as $$
begin
  -- Serialize requests for the same email across every app instance.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(lower(p_lead->>'email'), 0));
  if exists (select 1 from public.leads where request_id = (p_lead->>'request_id')::uuid) then return; end if;
  if (select count(*) from public.leads where lower(email) = lower(p_lead->>'email') and created_at > now() - interval '1 hour') >= 5 then
    raise exception using errcode = 'P0001', message = 'lead_rate_limit';
  end if;
  if p_lead->>'template_id' is not null and not exists (
    select 1 from public.templates where id = (p_lead->>'template_id')::uuid and status = 'published'
  ) then raise exception using errcode = 'P0001', message = 'template_unavailable'; end if;
  insert into public.leads (request_id, name, email, company, country, phone, service, template_id, project_slug, project_description, budget, timeline, source)
  values ((p_lead->>'request_id')::uuid, p_lead->>'name', lower(p_lead->>'email'), p_lead->>'company', p_lead->>'country', p_lead->>'phone', p_lead->>'service', (p_lead->>'template_id')::uuid, p_lead->>'project_slug', p_lead->>'project_description', p_lead->>'budget', p_lead->>'timeline', p_lead->>'source')
  on conflict (request_id) do nothing;
end;
$$;
revoke all on function public.submit_digital_lead(jsonb) from public, anon, authenticated;
grant execute on function public.submit_digital_lead(jsonb) to service_role;

commit;
