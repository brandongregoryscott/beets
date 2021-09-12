create policy "Users can insert their own entity." on users for
insert
    with check (auth.uid() = id);