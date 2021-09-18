create table files (
    id uuid references storage.objects not null,
    bucketid text references storage.buckets not null,
    createdon timestamptz DEFAULT timezone('utc' :: text, now()) null,
    createdbyid uuid DEFAULT auth.uid() null,
    deletedon timestamptz null,
    deletedbyid uuid null,
    description text null,
    name text not null,
    path text not null,
    size bigint null,
    type text not null,
    updatedon timestamptz null,
    updatedbyid uuid null,
    primary key (id)
);

alter table
    files enable row level security;

-- create unique index id_deletedon on files (id, deletedon)
-- where
--     deletedon IS NULL;
create policy "Authenticated users can create records." on files for
insert
    with check (auth.role() = 'authenticated');

create policy "Users can update their own records." on files for
update
    using (auth.uid() = createdbyid);

create policy "Users can read their own records." on files for
select
    using (auth.uid() = createdbyid);