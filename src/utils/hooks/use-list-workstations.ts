import { WorkstationStateRecord } from "models/workstation-state-record";
import { useListTracks } from "generated/hooks/domain/tracks/use-list-tracks";
import { useListTrackSections } from "generated/hooks/domain/track-sections/use-list-track-sections";
import { useCallback, useMemo } from "react";
import { List } from "immutable";
import { useListProjects } from "generated/hooks/domain/projects/use-list-projects";

interface UseListWorkstationsOptions {}

interface UseListWorkstationsResult {
    isError: boolean;
    isLoading: boolean;
    resultObject: List<WorkstationStateRecord>;
    refetch: () => void;
}

const useListWorkstations = (
    options: UseListWorkstationsOptions
): UseListWorkstationsResult => {
    const {
        refetch: refetchProjects,
        resultObject: projects,
        isError: isProjectsError,
        isLoading: isProjectsLoading,
    } = useListProjects({
        filter: (query) => query.order("created_on", { ascending: false }),
    });

    const {
        refetch: refetchTracks,
        resultObject: tracks,
        isError: isTracksError,
        isLoading: isTracksLoading,
    } = useListTracks();

    const {
        refetch: refetchTrackSections,
        resultObject: trackSections,
        isError: isTrackSectionsError,
        isLoading: isTrackSectionsLoading,
    } = useListTrackSections();

    const isLoading =
        isProjectsLoading || isTracksLoading || isTrackSectionsLoading;
    const isError = isProjectsError || isTracksError || isTrackSectionsError;

    const resultObject = useMemo(
        () =>
            List(
                projects?.map((project) => {
                    const tracksForProject = List(
                        tracks?.filter(
                            (track) => track.project_id === project.id
                        ) ?? []
                    );

                    const trackIds = tracksForProject.map((track) => track.id);
                    const trackSectionsForTracks = List(
                        trackSections?.filter((trackSection) =>
                            trackIds.includes(trackSection.track_id)
                        )
                    );
                    return new WorkstationStateRecord({
                        project,
                        tracks: tracksForProject,
                        trackSections: trackSectionsForTracks,
                    });
                }) ?? []
            ),
        [projects, tracks, trackSections]
    );

    const refetch = useCallback(() => {
        refetchProjects();
        refetchTracks();
        refetchTrackSections();
    }, [refetchProjects, refetchTracks, refetchTrackSections]);

    return { resultObject, isError, isLoading, refetch };
};

export { useListWorkstations };
