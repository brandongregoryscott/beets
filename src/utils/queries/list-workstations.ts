import { SupabaseClient } from "generated/supabase-client";
import { List } from "immutable";
import { WorkstationStateRecord } from "models/workstation-state-record";

const listWorkstations = async (): Promise<List<WorkstationStateRecord>> => {
    const [
        projectsResult,
        tracksResult,
        trackSectionsResult,
        trackSectionStepsResult,
    ] = await Promise.all([
        SupabaseClient.fromProjects()
            .select("*")
            .order("updated_on", { ascending: false })
            .order("created_on", { ascending: false }),
        SupabaseClient.fromTracks().select("*"),
        SupabaseClient.fromTrackSections().select("*"),
        SupabaseClient.fromTrackSectionSteps().select("*"),
    ]);

    const { data: projects, error: projectsError } = projectsResult;
    const { data: tracks, error: tracksError } = tracksResult;
    const { data: trackSections, error: trackSectionsError } =
        trackSectionsResult;
    const { data: trackSectionSteps, error: trackSectionStepsError } =
        trackSectionStepsResult;

    if (projectsError != null) {
        throw projectsError;
    }

    if (tracksError != null) {
        throw tracksError;
    }

    if (trackSectionsError != null) {
        throw trackSectionsError;
    }

    if (trackSectionStepsError != null) {
        throw trackSectionStepsError;
    }

    return List(
        projects?.map((project) => {
            const tracksForProject = tracks?.filter(
                (track) => track.project_id === project.id
            );

            const trackIds = tracksForProject?.map((track) => track.id);
            const trackSectionsForTracks = trackSections?.filter(
                (trackSection) => trackIds?.includes(trackSection.track_id)
            );

            const trackSectionIds = trackSectionsForTracks?.map(
                (trackSection) => trackSection.id
            );

            const trackSectionStepsForTrackSections = trackSectionSteps?.filter(
                (trackSectionStep) =>
                    trackSectionIds?.includes(trackSectionStep.track_section_id)
            );

            return new WorkstationStateRecord({
                project,
                tracks: tracksForProject,
                trackSections: trackSectionsForTracks,
                trackSectionSteps: trackSectionStepsForTrackSections,
            });
        })
    );
};

export { listWorkstations };
