create policy "Authenticated users can create records." on storage.objects for
insert
    with check (auth.role() = 'authenticated');

create policy "Users can read their own records." on storage.objects for
select
    using (
        auth.uid() = owner
        and (storage.foldername(name)) [1] = auth.uid()
    );