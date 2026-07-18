-- TradeBridge Global: production schema, public views and row-level security.
create extension if not exists pgcrypto;
create type public.user_role as enum ('buyer','supplier','admin');
create type public.approval_status as enum ('pending','approved','rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'buyer', full_name text, company_name text,
  email text, phone text, country text, created_at timestamptz not null default now()
);
create table public.categories (id uuid primary key default gen_random_uuid(), name text unique not null, slug text unique not null, description text, image_url text);
create table public.suppliers (
  id uuid primary key default gen_random_uuid(), user_id uuid references public.profiles(id) on delete set null,
  company_name text not null, contact_person text not null, contact_email text, contact_phone text, country text not null,
  website text, company_type text, description text, years_in_business int check (years_in_business between 0 and 200),
  export_markets text, certifications text, payment_terms text, main_products text, minimum_order_quantity text,
  company_profile_url text, certificates_url text, verified boolean not null default false,
  approval_status public.approval_status not null default 'pending', created_at timestamptz not null default now()
);
create table public.supplier_categories (id uuid primary key default gen_random_uuid(), supplier_id uuid not null references public.suppliers(id) on delete cascade, category_id uuid not null references public.categories(id) on delete cascade, unique(supplier_id,category_id));
create table public.products (
  id uuid primary key default gen_random_uuid(), supplier_id uuid references public.suppliers(id) on delete set null, category_id uuid references public.categories(id) on delete set null,
  product_name text not null, slug text unique not null, origin_country text not null, condition text check (condition in ('New','Used','Reconditioned')),
  description text, specifications jsonb not null default '{}'::jsonb, minimum_order_quantity numeric, unit text, packaging text,
  availability_status text not null default 'available', featured boolean not null default false,
  approval_status public.approval_status not null default 'pending', created_at timestamptz not null default now()
);
create table public.product_images (id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products(id) on delete cascade, image_url text not null, sort_order int not null default 0);
create table public.rfqs (
  id uuid primary key default gen_random_uuid(), buyer_id uuid references public.profiles(id) on delete set null,
  buyer_name text, company_name text, buyer_email text, buyer_phone text, buyer_country text,
  product_name text not null, category_id uuid references public.categories(id) on delete set null, quantity numeric, unit text,
  target_price numeric, destination_country text, destination_port text, preferred_origin text, specifications text,
  delivery_date date, payment_preference text, attachment_url text, additional_notes text,
  status text not null default 'new', approval_status public.approval_status not null default 'pending', created_at timestamptz not null default now()
);
create table public.supplier_offers (
  id uuid primary key default gen_random_uuid(), rfq_id uuid not null references public.rfqs(id) on delete cascade,
  supplier_id uuid not null references public.suppliers(id) on delete cascade, offered_price numeric not null, currency char(3) not null,
  incoterm text, lead_time text, offer_details text, attachment_url text, status text not null default 'submitted', created_at timestamptz not null default now(), unique(rfq_id,supplier_id)
);
create table public.inquiries (id uuid primary key default gen_random_uuid(), user_id uuid references public.profiles(id) on delete set null, product_id uuid references public.products(id) on delete set null, inquiry_type text not null, message text not null, status text not null default 'new', created_at timestamptz not null default now());
create table public.matches (id uuid primary key default gen_random_uuid(), rfq_id uuid not null references public.rfqs(id) on delete cascade, supplier_id uuid not null references public.suppliers(id) on delete cascade, match_score numeric check(match_score between 0 and 100), admin_notes text, status text not null default 'proposed', created_at timestamptz not null default now(), unique(rfq_id,supplier_id));
create table public.articles (id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null, category text not null, excerpt text, content text, featured_image text, published boolean not null default false, created_at timestamptz not null default now());
create table public.saved_products (id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade, product_id uuid not null references public.products(id) on delete cascade, created_at timestamptz not null default now(), unique(user_id,product_id));
create table public.messages (id uuid primary key default gen_random_uuid(), thread_key text not null, sender_id uuid references public.profiles(id) on delete set null, recipient_id uuid references public.profiles(id) on delete set null, body text not null, read_at timestamptz, created_at timestamptz not null default now());
create table public.documents (id uuid primary key default gen_random_uuid(), owner_id uuid references public.profiles(id) on delete cascade, entity_type text, entity_id uuid, storage_path text not null, file_name text not null, mime_type text, file_size bigint, created_at timestamptz not null default now());
create table public.admin_notifications (id uuid primary key default gen_random_uuid(), event_type text not null, entity_type text not null, entity_id uuid, message text not null, read_at timestamptz, created_at timestamptz not null default now());
create table public.internal_notes (id uuid primary key default gen_random_uuid(), admin_id uuid not null references public.profiles(id), entity_type text not null, entity_id uuid not null, note text not null, created_at timestamptz not null default now());

create index products_public_idx on public.products(approval_status,category_id,origin_country,created_at desc);
create index rfqs_public_idx on public.rfqs(approval_status,status,category_id,created_at desc);
create index suppliers_approval_idx on public.suppliers(approval_status,verified,country);
create index offers_supplier_idx on public.supplier_offers(supplier_id,created_at desc);
create index messages_recipient_idx on public.messages(recipient_id,read_at,created_at desc);

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.profiles where id=auth.uid() and role='admin') $$;
create or replace function public.current_supplier_id() returns uuid language sql stable security definer set search_path=public as $$ select id from public.suppliers where user_id=auth.uid() limit 1 $$;
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id,role,full_name,company_name,email) values(new.id,coalesce((new.raw_user_meta_data->>'role')::public.user_role,'buyer'),new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'company_name',new.email); return new; end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

alter table public.profiles enable row level security; alter table public.categories enable row level security; alter table public.suppliers enable row level security;
alter table public.supplier_categories enable row level security; alter table public.products enable row level security; alter table public.product_images enable row level security;
alter table public.rfqs enable row level security; alter table public.supplier_offers enable row level security; alter table public.inquiries enable row level security;
alter table public.matches enable row level security; alter table public.articles enable row level security; alter table public.saved_products enable row level security;
alter table public.messages enable row level security; alter table public.documents enable row level security; alter table public.admin_notifications enable row level security; alter table public.internal_notes enable row level security;

create policy "categories public read" on public.categories for select using(true); create policy "categories admin write" on public.categories for all using(public.is_admin()) with check(public.is_admin());
create policy "profiles own read" on public.profiles for select using(id=auth.uid() or public.is_admin()); create policy "profiles own update" on public.profiles for update using(id=auth.uid() or public.is_admin()) with check(id=auth.uid() or public.is_admin());
create policy "supplier owner read" on public.suppliers for select using(user_id=auth.uid() or public.is_admin()); create policy "supplier registration" on public.suppliers for insert with check(approval_status='pending' and verified=false); create policy "supplier owner update" on public.suppliers for update using(user_id=auth.uid() or public.is_admin()) with check(user_id=auth.uid() or public.is_admin()); create policy "supplier admin delete" on public.suppliers for delete using(public.is_admin());
create policy "supplier categories owner" on public.supplier_categories for all using(supplier_id=public.current_supplier_id() or public.is_admin()) with check(supplier_id=public.current_supplier_id() or public.is_admin());
create policy "approved products public" on public.products for select using(approval_status='approved' or supplier_id=public.current_supplier_id() or public.is_admin()); create policy "supplier product write" on public.products for insert with check(supplier_id=public.current_supplier_id() or public.is_admin()); create policy "supplier product update" on public.products for update using(supplier_id=public.current_supplier_id() or public.is_admin()) with check(supplier_id=public.current_supplier_id() or public.is_admin()); create policy "supplier product delete" on public.products for delete using(supplier_id=public.current_supplier_id() or public.is_admin());
create policy "approved product images read" on public.product_images for select using(exists(select 1 from public.products p where p.id=product_id and (p.approval_status='approved' or p.supplier_id=public.current_supplier_id())) or public.is_admin()); create policy "product images owner write" on public.product_images for all using(exists(select 1 from public.products p where p.id=product_id and p.supplier_id=public.current_supplier_id()) or public.is_admin()) with check(exists(select 1 from public.products p where p.id=product_id and p.supplier_id=public.current_supplier_id()) or public.is_admin());
create policy "rfq owner read" on public.rfqs for select using(buyer_id=auth.uid() or public.is_admin()); create policy "rfq submission" on public.rfqs for insert with check((buyer_id is null or buyer_id=auth.uid()) and approval_status='pending'); create policy "rfq owner update" on public.rfqs for update using(buyer_id=auth.uid() or public.is_admin()) with check(buyer_id=auth.uid() or public.is_admin()); create policy "rfq admin delete" on public.rfqs for delete using(public.is_admin());
create policy "supplier own offers" on public.supplier_offers for all using(supplier_id=public.current_supplier_id() or public.is_admin()) with check(supplier_id=public.current_supplier_id() or public.is_admin()); create policy "buyer reads offers" on public.supplier_offers for select using(exists(select 1 from public.rfqs r where r.id=rfq_id and r.buyer_id=auth.uid()));
create policy "inquiries submit" on public.inquiries for insert with check(user_id is null or user_id=auth.uid()); create policy "inquiries own read" on public.inquiries for select using(user_id=auth.uid() or public.is_admin()); create policy "inquiries admin manage" on public.inquiries for update using(public.is_admin()) with check(public.is_admin());
create policy "matches participants read" on public.matches for select using(public.is_admin() or supplier_id=public.current_supplier_id() or exists(select 1 from public.rfqs r where r.id=rfq_id and r.buyer_id=auth.uid())); create policy "matches admin write" on public.matches for all using(public.is_admin()) with check(public.is_admin());
create policy "published articles public" on public.articles for select using(published or public.is_admin()); create policy "articles admin write" on public.articles for all using(public.is_admin()) with check(public.is_admin());
create policy "saved products own" on public.saved_products for all using(user_id=auth.uid()) with check(user_id=auth.uid()); create policy "messages participants" on public.messages for select using(sender_id=auth.uid() or recipient_id=auth.uid() or public.is_admin()); create policy "messages send" on public.messages for insert with check(sender_id=auth.uid() or public.is_admin());
create policy "documents owner" on public.documents for select using(owner_id=auth.uid() or public.is_admin()); create policy "documents owner insert" on public.documents for insert with check(owner_id=auth.uid() or public.is_admin()); create policy "notifications submit" on public.admin_notifications for insert with check(true); create policy "notifications admin read" on public.admin_notifications for select using(public.is_admin()); create policy "notifications admin update" on public.admin_notifications for update using(public.is_admin()); create policy "notes admin" on public.internal_notes for all using(public.is_admin()) with check(public.is_admin());

create view public.public_suppliers as select s.id,s.company_name,s.country,s.website,s.company_type,s.description,s.years_in_business,s.export_markets,s.certifications,s.verified,s.created_at,array_remove(array_agg(c.name),null) as categories from public.suppliers s left join public.supplier_categories sc on sc.supplier_id=s.id left join public.categories c on c.id=sc.category_id where s.approval_status='approved' group by s.id;
create view public.public_rfqs as select r.id,r.product_name,r.category_id,r.quantity,r.unit,r.destination_country,r.specifications,r.delivery_date,r.status,r.created_at from public.rfqs r where r.approval_status='approved';
grant select on public.public_suppliers,public.public_rfqs to anon,authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('trade-documents','trade-documents',false,10485760,array['image/jpeg','image/png','image/webp','application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document']) on conflict(id) do nothing;
create policy "submission uploads" on storage.objects for insert to anon,authenticated with check(bucket_id='trade-documents' and (storage.foldername(name))[1] in ('rfqs','suppliers'));
create policy "document owners and admin read" on storage.objects for select to authenticated using(bucket_id='trade-documents' and (owner_id=auth.uid() or public.is_admin()));
create policy "document owners and admin delete" on storage.objects for delete to authenticated using(bucket_id='trade-documents' and (owner_id=auth.uid() or public.is_admin()));
