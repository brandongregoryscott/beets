import type { File } from "generated/interfaces/file";
import type { Instrument } from "generated/interfaces/instrument";
import type { Pgmigration } from "generated/interfaces/pgmigration";
import type { Project } from "generated/interfaces/project";
import type { TrackSectionStep } from "generated/interfaces/track-section-step";
import type { TrackSection } from "generated/interfaces/track-section";
import type { Track } from "generated/interfaces/track";
import type { User } from "generated/interfaces/user";
import { Tables } from "generated/enums/tables";
import { createClient } from "@supabase/supabase-js";
import { env } from "utils/env";

const client = createClient(
    env.REACT_APP_SUPABASE_URL!,
    env.REACT_APP_SUPABASE_ANON_KEY!
);

const SupabaseClient = {
    ...client,
    fromFiles: () => client.from<File>(Tables.Files),
    fromInstruments: () => client.from<Instrument>(Tables.Instruments),
    fromPgmigrations: () => client.from<Pgmigration>(Tables.Pgmigrations),
    fromProjects: () => client.from<Project>(Tables.Projects),
    fromTrackSectionSteps: () =>
        client.from<TrackSectionStep>(Tables.TrackSectionSteps),
    fromTrackSections: () => client.from<TrackSection>(Tables.TrackSections),
    fromTracks: () => client.from<Track>(Tables.Tracks),
    fromUsers: () => client.from<User>(Tables.Users),
};

export { SupabaseClient };
