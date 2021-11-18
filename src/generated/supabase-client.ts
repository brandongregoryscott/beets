import { File } from "generated/interfaces/file";
import { Pgmigration } from "generated/interfaces/pgmigration";
import { Project } from "generated/interfaces/project";
import { TrackSectionStep } from "generated/interfaces/track-section-step";
import { TrackSection } from "generated/interfaces/track-section";
import { Track } from "generated/interfaces/track";
import { User } from "generated/interfaces/user";
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
    fromPgmigrations: () => client.from<Pgmigration>(Tables.Pgmigrations),
    fromProjects: () => client.from<Project>(Tables.Projects),
    fromTrackSectionSteps: () =>
        client.from<TrackSectionStep>(Tables.TrackSectionSteps),
    fromTrackSections: () => client.from<TrackSection>(Tables.TrackSections),
    fromTracks: () => client.from<Track>(Tables.Tracks),
    fromUsers: () => client.from<User>(Tables.Users),
};

export { SupabaseClient };
