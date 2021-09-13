create policy "Authenticated users can create their own record." on users for
insert
    with check (auth.uid() = id);

create policy "Users can read any record." on users for
select
    using (true);