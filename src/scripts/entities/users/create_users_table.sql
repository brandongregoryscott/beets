create table users (
  id uuid references auth.users not null,
  createdon timestamptz DEFAULT timezone('utc' :: text, now()) null,
  createdbyid uuid null,
  deletedon timestamptz null,
  deletedbyid uuid null,
  email text not null,
  updatedon timestamptz,
  updatedbyid uuid null,
  primary key (id)
);

alter table
  users enable row level security;