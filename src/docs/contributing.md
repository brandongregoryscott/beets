# Contributing

This section of the guide details how to setup the app for local development and contributing back. If you find the information is lacking or inaccurate, or you'd like to propose a new section, [please open up an issue](https://github.com/brandongregoryscott/beets/issues/new) or [shoot me an email](mailto:contact@brandonscott.me). I'll do my best to respond and add documentation or assist where possible!

## Prerequisites

-   [`npm`](https://www.npmjs.com/) v7 and [`node`](https://nodejs.org/) v14.18 installed
-   [Supabase](https://supabase.com/) account

## Fork and Clone

To get started, [fork](https://github.com/brandongregoryscott/beets/fork) and clone the repo with `git`:

```
git clone git@github.com:{username}/beets.git && cd beets
```

## Install Dependencies

Install the app's dependencies using `npm`:

```
npm install
```

## Env File

To run the app locally, you'll need to ensure you have a [Supabase](https://supabase.com/) account with a project setup for beets.

Copy the sample `.env` and update the file to reflect your Supabase project's API key and URLs.

```
cp .env.sample .env
```

### REACT_APP_SUPABASE_ANON_KEY and REACT_APP_SUPABASE_URL

Your Supabase API key (`REACT_APP_SUPABASE_ANON_KEY`) and URL (`REACT_APP_SUPABASE_URL`) can be found at `https://app.supabase.io/project/{your-project-id}/settings/api` and the page should look something like this:

![Supabase Settings page](../../public/assets/SupabaseSettings.png)

### DATABASE_URL

The database URL (`DATABASE_URL`) can be found at `https://app.supabase.io/project/{your-project-id}/settings/database` and the page should look like this:

![Supabase Database Settings page](../../public/assets/SupabaseDatabaseSettings.png)

The connection string can be copied from the bottom of the page.

![Supabase Database Connection String](../../public/assets/SupabaseDatabaseConnectionString.png)

### REACT_APP_SUPABASE_STORAGE_PUBLIC_URL

The storage URL (`REACT_APP_SUPABASE_STORAGE_PUBLIC_URL`) is not found in the Supabase UI, but it should be easy to fill out once you've found your Supabase URL (`REACT_APP_SUPABASE_URL`). It follows the following format:

```
https://{your-project-id}.supabase.in/storage/v1/object/public
```

For example, if your `REACT_APP_SUPABASE_URL` is the following:

```
https://ef7c47561c6e47.supabase.co
```

The value for `REACT_APP_SUPABASE_STORAGE_PUBLIC_URL` should be:

```
https://ef7c47561c6e47.supabase.in/storage/v1/object/public
```

## Migrating the Database

Database migrations are managed in code via [`node-pg-migrate`](https://salsita.github.io/node-pg-migrate). There are a few SQL scripts that need to be run manually in the Supabase SQL Editor due to permissioning issues, but most migrations can be run from the command line.

### Setup Storage Policies

The scripts that need to be run manually in the Supabase SQL Editor are related to storage buckets and objects (files). The SQL editor can be found at `https://app.supabase.io/project/{your-project-id}/sql` and the page should look like this:

These two scripts can be run in any order:

-   [Storage Bucket Policies](https://github.com/brandongregoryscott/beets/blob/main/src/scripts/storage_buckets_policies.sql)
    -   This script adds a [RLS (Row-Level Security)](https://supabase.com/docs/guides/auth/row-level-security) permission entry for anyone to read information from the `storage.buckets` table. More granular permissioning is added in the [Storage File Policies](https://github.com/brandongregoryscott/beets/blob/main/src/scripts/storage_file_policies.sql) script.
-   [Storage File Policies](https://github.com/brandongregoryscott/beets/blob/main/src/scripts/storage_file_policies.sql)
    -   Adds the following [RLS (Row-Level Security)](https://supabase.com/docs/guides/auth/row-level-security) permissions:
        -   Restricts file creation to authenticated users only.
        -   Restricts file deletion to the file's owner only.
        -   Restricts file reads to the file's owner OR for any file in the `public` directory, which is used to hold public samples for the demo project.
