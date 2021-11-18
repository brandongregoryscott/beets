import { WorkstationStateRecord } from "models/workstation-state-record";
import { List } from "immutable";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { SupabaseClient } from "generated/supabase-client";
import _ from "lodash";
import { Tables } from "generated/enums/tables";

interface UseListWorkstationsOptions {}

const useListWorkstations = (
    options: UseListWorkstationsOptions
): UseQueryResult<List<WorkstationStateRecord>> => {
    const listWorkstations = async () => {
        const [projectsResult, tracksResult, trackSectionsResult] =
            await Promise.all([
                SupabaseClient.fromProjects()
                    .select("*")
                    .order("created_on", { ascending: false }),
                SupabaseClient.fromTracks().select("*"),
                SupabaseClient.fromTrackSections().select("*"),
            ]);

        const { data: projects, error: projectsError } = projectsResult;
        const { data: tracks, error: tracksError } = tracksResult;
        const { data: trackSections, error: trackSectionsError } =
            trackSectionsResult;

        if (projectsError != null) {
            throw projectsError;
        }

        if (tracksError != null) {
            throw tracksError;
        }

        if (trackSectionsError != null) {
            throw trackSectionsError;
        }

        return List(
            projects?.map((project) => {
                const tracksForProject = tracks?.filter(
                    (track) => track.project_id === project.id
                );

                const trackSectionsForTracks = _.intersectionWith(
                    trackSections,
                    tracks ?? [],
                    (trackSection, track) => trackSection.track_id === track.id
                );

                return new WorkstationStateRecord({
                    project,
                    tracks: tracksForProject,
                    trackSections: trackSectionsForTracks,
                });
            })
        );
    };

    const result = useQuery<List<WorkstationStateRecord>, Error>({
        key: [Tables.Projects, Tables.Tracks, Tables.TrackSections],
        fn: listWorkstations,
    });

    return result;
};

export { useListWorkstations };
