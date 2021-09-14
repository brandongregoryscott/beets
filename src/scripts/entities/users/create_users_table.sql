create table users (
  id uuid references auth.users not null,
  createdon timestamptz DEFAULT timezone('utc' :: text, now()) null,
  createdbyid uuid DEFAULT auth.uid() null,
  deletedon timestamptz null,
  deletedbyid uuid null,
  email text not null,
  updatedon timestamptz null,
  updatedbyid uuid null,
  primary key (id)
);

alter table
  users enable row level security;

create policy "Authenticated users can create their own record." on users for
insert
  with check (auth.role() = 'authenticated');

create policy "Users can read any record." on users for
select
  using (true);