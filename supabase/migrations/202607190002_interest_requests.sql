-- Product interest catalog and privacy-safe combined customer requests.
create table if not exists public.product_categories (
  id uuid primary key default gen_random_uuid(), name text unique not null, slug text unique not null,
  description text, image_url text, display_order int not null default 0, is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists public.product_items (
  id uuid primary key default gen_random_uuid(), category_id uuid not null references public.product_categories(id) on delete cascade,
  name text not null, slug text unique not null, short_description text, image_url text, is_active boolean not null default true,
  display_order int not null default 0, created_at timestamptz not null default now()
);
create table if not exists public.customer_requests (
  id uuid primary key default gen_random_uuid(), reference_number text unique not null, full_name text not null,
  company_name text not null, email text not null, whatsapp text not null, country text not null, request_purpose text not null,
  preferred_origin text, destination_country text, destination_port text, target_price text, expected_purchase_date date,
  payment_preference text, details text not null, attachment_url text, status text not null default 'New',
  admin_notes text, assigned_to uuid references public.profiles(id) on delete set null, assigned_to_name text, created_at timestamptz not null default now(),
  constraint customer_request_status check(status in ('New','Under Review','Discussion Started','Sourcing Suppliers','Quotation Sent','Negotiation','Deal Confirmed','Closed','Cancelled'))
);
create table if not exists public.customer_request_items (
  id uuid primary key default gen_random_uuid(), request_id uuid not null references public.customer_requests(id) on delete cascade,
  product_item_id uuid references public.product_items(id) on delete set null, product_name text not null, category_name text not null,
  quantity text not null, unit text not null, condition text not null, specification text, created_at timestamptz not null default now()
);
create index if not exists product_items_category_idx on public.product_items(category_id,is_active,display_order);
create index if not exists customer_requests_admin_idx on public.customer_requests(status,request_purpose,created_at desc);
create index if not exists customer_request_items_request_idx on public.customer_request_items(request_id);
alter table public.product_categories enable row level security; alter table public.product_items enable row level security;
alter table public.customer_requests enable row level security; alter table public.customer_request_items enable row level security;
create policy "active product categories public" on public.product_categories for select using(is_active or public.is_admin());
create policy "product categories admin" on public.product_categories for all using(public.is_admin()) with check(public.is_admin());
create policy "active product items public" on public.product_items for select using(is_active or public.is_admin());
create policy "product items admin" on public.product_items for all using(public.is_admin()) with check(public.is_admin());
create policy "customer requests admin only" on public.customer_requests for select using(public.is_admin());
create policy "customer requests admin update" on public.customer_requests for update using(public.is_admin()) with check(public.is_admin());
create policy "customer request items admin only" on public.customer_request_items for select using(public.is_admin());
create policy "customer request items admin update" on public.customer_request_items for update using(public.is_admin()) with check(public.is_admin());

create or replace function public.submit_customer_request(request_data jsonb, items_data jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare request_id uuid; request_ref text; item jsonb;
begin
  if jsonb_array_length(items_data) < 1 or jsonb_array_length(items_data) > 50 then raise exception 'Select between 1 and 50 products'; end if;
  request_ref := 'TBG-' || to_char(now(),'YYYYMMDD') || '-' || upper(substr(encode(gen_random_bytes(6),'hex'),1,6));
  insert into public.customer_requests(reference_number,full_name,company_name,email,whatsapp,country,request_purpose,preferred_origin,destination_country,destination_port,target_price,expected_purchase_date,payment_preference,details,attachment_url)
  values(request_ref,left(trim(request_data->>'full_name'),100),left(trim(request_data->>'company_name'),150),left(trim(request_data->>'email'),254),left(trim(request_data->>'whatsapp'),30),left(trim(request_data->>'country'),80),left(trim(request_data->>'request_purpose'),80),left(trim(request_data->>'preferred_origin'),80),left(trim(request_data->>'destination_country'),80),left(trim(request_data->>'destination_port'),120),left(trim(request_data->>'target_price'),100),nullif(request_data->>'expected_purchase_date','')::date,left(trim(request_data->>'payment_preference'),80),left(trim(request_data->>'details'),5000),nullif(request_data->>'attachment_url','')) returning id into request_id;
  for item in select * from jsonb_array_elements(items_data) loop
    insert into public.customer_request_items(request_id,product_item_id,product_name,category_name,quantity,unit,condition,specification)
    values(request_id,(select id from public.product_items where slug=item->>'product_slug' and is_active limit 1),left(trim(item->>'product_name'),160),left(trim(item->>'category_name'),120),left(trim(item->>'quantity'),60),left(trim(item->>'unit'),40),left(trim(item->>'condition'),20),left(trim(item->>'specification'),2000));
  end loop;
  insert into public.admin_notifications(event_type,entity_type,entity_id,message) values('customer_request_submitted','customer_request',request_id,'New combined product request '||request_ref);
  return jsonb_build_object('id',request_id,'reference_number',request_ref);
end $$;
revoke all on function public.submit_customer_request(jsonb,jsonb) from public;
grant execute on function public.submit_customer_request(jsonb,jsonb) to anon,authenticated;
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id,role,full_name,company_name,email) values(new.id,'buyer',new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'company_name',new.email); return new; end $$;
drop policy if exists "submission uploads" on storage.objects;
create policy "submission uploads" on storage.objects for insert to anon,authenticated with check(bucket_id='trade-documents' and (storage.foldername(name))[1] in ('rfqs','suppliers','customer-requests'));

insert into public.product_categories(name,slug,description,image_url,display_order) values
('Industrial Machinery','industrial-machinery','Production, processing and plant equipment','/forklift-warehouse.jpg',1),('Forklifts and Warehouse Equipment','forklifts-and-warehouse-equipment','Material handling and warehouse equipment','/forklift-warehouse.jpg',2),('Construction Equipment','construction-equipment','Heavy and compact construction machinery','/port-logistics.jpg',3),('Automotive and Auto Parts','automotive-and-auto-parts','Vehicles and replacement components','/forklift-warehouse.jpg',4),('Factory Automation','factory-automation','Controls, robotics and automation components','/forklift-warehouse.jpg',5),('Plastics and Polymers','plastics-and-polymers','Prime and recycled polymer materials','/port-logistics.jpg',6),('Packaging Materials','packaging-materials','Flexible, rigid and industrial packaging','/port-logistics.jpg',7),('Metals and Scrap','metals-and-scrap','Ferrous and non-ferrous materials','/port-logistics.jpg',8),('Chemicals','chemicals','Industrial and specialty chemical products','/port-logistics.jpg',9),('Agricultural and Food Products','agricultural-and-food-products','Food commodities and agricultural equipment','/forklift-warehouse.jpg',10),('Electrical and Energy Products','electrical-and-energy-products','Electrical distribution and renewable energy products','/port-logistics.jpg',11) on conflict(slug) do update set description=excluded.description,display_order=excluded.display_order,is_active=true;

with catalog(category_slug,names) as (values
('industrial-machinery',array['Injection moulding machines','Extrusion machines','Blow moulding machines','Packaging machines','Printing machines','CNC machines','Press machines','Food-processing machinery','Textile machinery','Air compressors','Industrial generators','Used production lines']),
('forklifts-and-warehouse-equipment',array['Electric forklifts','Diesel forklifts','LPG forklifts','Reach trucks','Hand pallet trucks','Forklift batteries','Forklift tyres','Forklift spare parts','Warehouse racks','Material-handling equipment']),
('construction-equipment',array['Excavators','Mini excavators','Wheel loaders','Bulldozers','Cranes','Road rollers','Dump trucks','Concrete equipment','Construction machinery parts']),
('automotive-and-auto-parts',array['Used passenger vehicles','Commercial vehicles','Trucks','Buses','Engines','Gearboxes','Suspension parts','Brake parts','Hybrid batteries','Filters','Bearings','Body parts','Motorcycle parts']),
('factory-automation',array['PLC systems','Servo motors','Inverters','Industrial robots','Sensors','Control panels','Human-machine interfaces','Automation spare parts','Used factory equipment']),
('plastics-and-polymers',array['PP','HDPE','LDPE','LLDPE','PET','PVC','PS','ABS','HIPS','Engineering plastics','Recycled granules','Regrind','Plastic flakes','Off-grade materials','Plastic additives','Masterbatch']),
('packaging-materials',array['PP woven bags','FIBC jumbo bags','Flexible packaging','Plastic films','PET preforms','Bottles','Caps and closures','Corrugated boxes','Food packaging','Industrial packaging','PVC tarpaulin rolls']),
('metals-and-scrap',array['Steel scrap','Aluminium scrap','Copper scrap','Stainless-steel scrap','Brass scrap','Used machinery scrap','Industrial metal waste','Metal ingots','Metal coils','Metal sheets']),
('chemicals',array['Industrial chemicals','Plastic additives','Adhesives','Coatings','Printing inks','Cleaning chemicals','Water-treatment chemicals','Lubricants','Solvents','Specialty chemicals']),
('agricultural-and-food-products',array['Rice','Pulses','Spices','Sugar','Tea','Coffee','Food ingredients','Agricultural machinery','Water pumps','Irrigation equipment','Food-processing equipment']),
('electrical-and-energy-products',array['Electric cables','Transformers','Switchgear','Circuit breakers','LED lighting','Solar panels','Solar inverters','Batteries','Electric motors','Generators','Industrial pumps'])
), expanded as (
select pc.id category_id,item.name,regexp_replace(regexp_replace(lower(replace(item.name,'&','and')),'[^a-z0-9]+','-','g'),'(^-|-$)','','g') slug,item.ordinality::int display_order
from catalog c join public.product_categories pc on pc.slug=c.category_slug cross join lateral unnest(c.names) with ordinality as item(name,ordinality)
)
insert into public.product_items(category_id,name,slug,short_description,display_order)
select category_id,name,slug,'Sourcing options arranged to match specification, quantity, origin and destination requirements.',display_order from expanded
on conflict(slug) do update set category_id=excluded.category_id,name=excluded.name,display_order=excluded.display_order,is_active=true;
