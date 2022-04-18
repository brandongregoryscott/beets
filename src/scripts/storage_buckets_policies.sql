insert into
    storage.buckets (id, name, public)
values
    ('samples', 'samples', true) on conflict do nothing;

create policy "Users can read any records." on storage.buckets for
select
    using (true);