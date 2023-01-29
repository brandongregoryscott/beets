import type { File } from "generated/interfaces/file";
import type { Instrument } from "generated/interfaces/instrument";
import type { Pgmigration } from "generated/interfaces/pgmigration";
import type { Project } from "generated/interfaces/project";
import type { Track } from "generated/interfaces/track";
import type { TrackSection } from "generated/interfaces/track-section";
import type { TrackSectionStep } from "generated/interfaces/track-section-step";
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
    fromFiles: () => client.from<Tables.Files, File>(Tables.Files),
    fromInstruments: () =>
        client.from<Tables.Instruments, Instrument>(Tables.Instruments),
    fromPgmigrations: () =>
        client.from<Tables.Pgmigrations, Pgmigration>(Tables.Pgmigrations),
    fromProjects: () => client.from<Tables.Projects, Project>(Tables.Projects),
    fromTracks: () => client.from<Tables.Tracks, Track>(Tables.Tracks),
    fromTrackSections: () =>
        client.from<Tables.TrackSections, TrackSection>(Tables.TrackSections),
    fromTrackSectionSteps: () =>
        client.from<Tables.TrackSectionSteps, TrackSectionStep>(
            Tables.TrackSectionSteps
        ),
    fromUsers: () => client.from<Tables.Users, User>(Tables.Users),
};

export { SupabaseClient };
