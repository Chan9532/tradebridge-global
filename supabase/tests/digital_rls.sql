-- Run with the Supabase SQL editor (postgres) AFTER the new digital migration.
-- All fixtures and writes roll back. No production records are modified.
begin;
insert into public.templates (id,name,slug,industry,style,short_description,thumbnail_url,status)
values ('65d1feb5-b1ee-4ca4-aafd-334d55292b52','RLS fixture','rls-fixture-private','Test','Test','Test','/test.png','draft');
insert into public.templates (id,name,slug,industry,style,short_description,thumbnail_url,demo_url,status)
values ('76e20fc6-c2ff-4db5-b124-445e66303c63','Published fixture','rls-fixture-published','Test','Test','Test','/test.png','/demo','published');
insert into public.templates (id,name,slug,industry,style,short_description,thumbnail_url,status)
values ('87f31ad7-d300-4ec6-a235-556f77414d74','Coming soon fixture','rls-fixture-coming','Test','Test','Test','/test.png','coming_soon');

set local role anon;
do $$ begin
  if exists (select 1 from public.templates where slug='rls-fixture-private') then raise exception 'Draft template leaked'; end if;
  if (select count(*) from public.templates where slug in ('rls-fixture-published','rls-fixture-coming')) <> 2 then raise exception 'Public template states are not readable'; end if;
  begin perform 1 from public.leads; raise exception 'Anonymous lead read allowed'; exception when insufficient_privilege then null; end;
  begin insert into public.leads default values; raise exception 'Anonymous lead insert allowed'; exception when insufficient_privilege then null; end;
  begin update public.templates set name='bad' where slug='rls-fixture-private'; raise exception 'Anonymous template write allowed'; exception when insufficient_privilege then null; end;
  begin perform public.submit_digital_lead('{}'::jsonb); raise exception 'Anonymous RPC allowed'; exception when insufficient_privilege then null; end;
end $$;
reset role;
set local role authenticated;
do $$ begin
  if exists (select 1 from public.templates where slug='rls-fixture-private') then raise exception 'Draft visible to signed-in user'; end if;
  if (select count(*) from public.templates where slug in ('rls-fixture-published','rls-fixture-coming')) <> 2 then raise exception 'Signed-in public catalog is incomplete'; end if;
  begin perform 1 from public.leads; raise exception 'Authenticated lead read allowed'; exception when insufficient_privilege then null; end;
  begin delete from public.leads; raise exception 'Authenticated lead delete allowed'; exception when insufficient_privilege then null; end;
  begin perform public.submit_digital_lead('{}'::jsonb); raise exception 'Authenticated RPC allowed'; exception when insufficient_privilege then null; end;
end $$;
reset role;
set local role service_role;
do $$
declare
  request_uuid uuid := gen_random_uuid();
  fixture_email text := gen_random_uuid()::text || '@example.invalid';
  payload jsonb;
begin
  payload := jsonb_build_object('request_id',request_uuid,'name','SQL Test','email',fixture_email,'project_description','Integration test only','source','contact');
  perform public.submit_digital_lead(payload);
  perform public.submit_digital_lead(payload);
  if (select count(*) from public.leads where request_id=request_uuid) <> 1 then raise exception 'Duplicate lead persisted'; end if;
  for i in 1..4 loop perform public.submit_digital_lead(payload || jsonb_build_object('request_id',gen_random_uuid())); end loop;
  begin
    perform public.submit_digital_lead(payload || jsonb_build_object('request_id',gen_random_uuid()));
    raise exception 'Rate limit did not reject sixth lead';
  exception when sqlstate 'P0001' then
    if sqlerrm <> 'lead_rate_limit' then raise; end if;
  end;
end $$;
reset role;
rollback;
