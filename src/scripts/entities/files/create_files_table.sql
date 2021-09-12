create table files (
    id uuid references storage.objects not null,
    bucketid uuid not null,
    createdon timestamptz DEFAULT timezone('utc' :: text, now()) null,
    createdbyid uuid null,
    deletedon timestamptz null,
    deletedbyid uuid null,
    description text null,
    name text not null,
    path text not null,
    size bigint null,
    type text not null,
    updatedon timestamptz null,
    updatedbyid uuid null,
    foreign key (bucketid),
    primary key (id)
);

alter table
    files enable row level security;