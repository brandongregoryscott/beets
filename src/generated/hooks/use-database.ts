import { File } from "generated/interfaces/file";
import { Pgmigration } from "generated/interfaces/pgmigration";
import { Project } from "generated/interfaces/project";
import { TrackSection } from "generated/interfaces/track-section";
import { Track } from "generated/interfaces/track";
import { User } from "generated/interfaces/user";
import { useCallback } from "react";
import { useSupabase } from "utils/hooks/supabase/use-supabase";
import { Tables } from "generated/enums/tables";

const useDatabase = () => {
    const { supabase } = useSupabase();

    const fromFiles = useCallback(
        () => supabase.from<File>(Tables.Files),
        [supabase]
    );

    const fromPgmigrations = useCallback(
        () => supabase.from<Pgmigration>(Tables.Pgmigrations),
        [supabase]
    );

    const fromProjects = useCallback(
        () => supabase.from<Project>(Tables.Projects),
        [supabase]
    );

    const fromTrackSections = useCallback(
        () => supabase.from<TrackSection>(Tables.TrackSections),
        [supabase]
    );

    const fromTracks = useCallback(
        () => supabase.from<Track>(Tables.Tracks),
        [supabase]
    );

    const fromUsers = useCallback(
        () => supabase.from<User>(Tables.Users),
        [supabase]
    );

    return {
        fromFiles,
        fromPgmigrations,
        fromProjects,
        fromTrackSections,
        fromTracks,
        fromUsers,
    };
};

export { useDatabase };
