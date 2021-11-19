import { SupabaseClient } from "generated/supabase-client";
import { ProjectRecord } from "models/project-record";
import { WorkstationStateRecord } from "models/workstation-state-record";

const getWorkstationByProjectId = async (
    projectId: string
): Promise<WorkstationStateRecord> => {
    const [projectResult, tracksResult] = await Promise.all([
        SupabaseClient.fromProjects()
            .select("*")
            .eq("id", projectId)
            .limit(1)
            .single(),
        SupabaseClient.fromTracks().select("*").eq("project_id", projectId),
    ]);
    const { data: project, error: projectError } = projectResult;
    const { data: tracks, error: tracksError } = tracksResult;

    if (projectError != null) {
        throw projectError;
    }

    if (tracksError != null) {
        throw tracksError;
    }

    const { data: trackSections, error: trackSectionsError } =
        await SupabaseClient.fromTrackSections()
            .select("*")
            .in("track_id", tracks?.map((track) => track.id) ?? []);

    if (trackSectionsError != null) {
        throw trackSectionsError;
    }

    return new WorkstationStateRecord({
        project: new ProjectRecord(project!),
        tracks: tracks ?? [],
        trackSections: trackSections ?? [],
    });
};

export { getWorkstationByProjectId };
