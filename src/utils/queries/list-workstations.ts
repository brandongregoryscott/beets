import { Project } from "generated/interfaces/project";
import { Track } from "generated/interfaces/track";
import { TrackSection } from "generated/interfaces/track-section";
import { TrackSectionStep } from "generated/interfaces/track-section-step";
import { SupabaseClient } from "generated/supabase-client";
import { List } from "immutable";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { sortBy } from "utils/collection-utils";

const listWorkstations = async (): Promise<List<WorkstationStateRecord>> => {
    const [
        projectsResult,
        tracksResult,
        trackSectionsResult,
        trackSectionStepsResult,
    ] = await Promise.all([
        SupabaseClient.fromProjects().select("*"),
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

    const workstations = mapToWorkstations(
        projects,
        tracks,
        trackSections,
        trackSectionSteps
    );

    return sortBy(workstations, (workstationState) =>
        workstationState.project.getUpdatedOn()
    ).reverse();
};

const mapToWorkstations = (
    projects?: Project[] | null,
    tracks?: Track[] | null,
    trackSections?: TrackSection[] | null,
    trackSectionSteps?: TrackSectionStep[] | null
): WorkstationStateRecord[] =>
    projects?.map((project) => {
        const tracksForProject = tracks?.filter(
            (track) => track.project_id === project.id
        );

        const trackIds = tracksForProject?.map((track) => track.id);
        const trackSectionsForTracks = trackSections?.filter((trackSection) =>
            trackIds?.includes(trackSection.track_id)
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
    }) ?? [];

export { listWorkstations };
