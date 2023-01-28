import type { Project } from "generated/interfaces/project";
import type { Track } from "generated/interfaces/track";
import type { TrackSection } from "generated/interfaces/track-section";
import type { TrackSectionStep } from "generated/interfaces/track-section-step";
import type { User } from "generated/interfaces/user";
import type { File } from "generated/interfaces/file";
import type { TrackSection } from "generated/interfaces/track-section";
import type { TrackSectionStep } from "generated/interfaces/track-section-step";
import type { Instrument } from "generated/interfaces/instrument";
import { Tables } from "generated/enums/tables";
import { createClient } from "@supabase/supabase-js";
import { env } from "utils/env";

const client = createClient(
    env.REACT_APP_SUPABASE_URL!,
    env.REACT_APP_SUPABASE_ANON_KEY!
);

const SupabaseClient = {
    ...client,
    fromProjects: () => client.from<Project>(Tables.Projects),
    fromTracks: () => client.from<Track>(Tables.Tracks),
    fromTrackSections: () => client.from<TrackSection>(Tables.TrackSections),
    fromTrackSectionSteps: () =>
        client.from<TrackSectionStep>(Tables.TrackSectionSteps),
    fromUsers: () => client.from<User>(Tables.Users),
    fromFiles: () => client.from<File>(Tables.Files),
    fromTrackSections: () => client.from<TrackSection>(Tables.TrackSections),
    fromTrackSectionSteps: () =>
        client.from<TrackSectionStep>(Tables.TrackSectionSteps),
    fromInstruments: () => client.from<Instrument>(Tables.Instruments),
};

export { SupabaseClient };
