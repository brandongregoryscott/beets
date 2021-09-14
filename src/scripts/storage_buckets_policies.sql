create policy "Users can read any records." on storage.buckets for
select
    using (true);