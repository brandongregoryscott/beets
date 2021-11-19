import { SupabaseClient } from "generated/supabase-client";
import { List } from "immutable";
import _ from "lodash";
import { WorkstationStateRecord } from "models/workstation-state-record";

const listWorkstations = async (): Promise<List<WorkstationStateRecord>> => {
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

export { listWorkstations };
