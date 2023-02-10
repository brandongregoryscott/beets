import type { Database } from "generated/database";
import { Tables } from "generated/enums/tables";
import { createClient } from "@supabase/supabase-js";
import { env } from "utils/env";

const client = createClient<Database>(
    env.REACT_APP_SUPABASE_URL!,
    env.REACT_APP_SUPABASE_ANON_KEY!
);

const SupabaseClient = {
    ...client,
    fromFiles: () => client.from(Tables.Files),
    fromInstruments: () => client.from(Tables.Instruments),
    fromPgmigrations: () => client.from(Tables.Pgmigrations),
    fromProjects: () => client.from(Tables.Projects),
    fromTracks: () => client.from(Tables.Tracks),
    fromTrackSections: () => client.from(Tables.TrackSections),
    fromTrackSectionSteps: () => client.from(Tables.TrackSectionSteps),
    fromUsers: () => client.from(Tables.Users),
};

export { SupabaseClient };
