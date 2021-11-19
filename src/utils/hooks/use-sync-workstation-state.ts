import { useCreateOrUpdateProject } from "generated/hooks/domain/projects/use-create-or-update-project";
import { useCreateOrUpdateTrackSection } from "generated/hooks/domain/track-sections/use-create-or-update-track-section";
import { useDeleteTrackSection } from "generated/hooks/domain/track-sections/use-delete-track-section";
import { useCreateOrUpdateTrack } from "generated/hooks/domain/tracks/use-create-or-update-track";
import { useDeleteTrack } from "generated/hooks/domain/tracks/use-delete-track";
import { List } from "immutable";
import { ProjectRecord } from "models/project-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { hasValues, isNilOrEmpty, isTemporaryId } from "utils/core-utils";
import { useMutation } from "utils/hooks/use-mutation";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { getWorkstationByProjectId } from "utils/queries/get-workstation-by-project-id";

interface UseSyncWorkstationState {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: WorkstationStateRecord) => void;
}

const useSyncWorkstationState = (options?: UseSyncWorkstationState) => {
    const { onError, onSuccess } = options ?? {};
    const { mutateAsync: createOrUpdateProject } = useCreateOrUpdateProject();
    const { mutateAsync: createOrUpdateTrack } = useCreateOrUpdateTrack();
    const { mutateAsync: createOrUpdateTrackSection } =
        useCreateOrUpdateTrackSection();
    const { mutateAsync: deleteTrack } = useDeleteTrack();
    const { mutateAsync: deleteTrackSection } = useDeleteTrackSection();
    const { initialState, state } = useWorkstationState();

    const sync = async () => {
        const {
            createdOrUpdatedProject,
            createdOrUpdatedTracks,
            createdOrUpdatedTrackSections,
            deletedTracks,
            deletedTrackSections,
        } = initialState.diff(state);
        let project: ProjectRecord | undefined;
        let tracks: List<TrackRecord> | undefined;
        let trackSections: List<TrackSectionRecord> | undefined;
        if (createdOrUpdatedProject != null) {
            project = await createOrUpdateProject(createdOrUpdatedProject);
        }
        const projectId = [
            state.project.id,
            initialState.project.id,
            project?.id,
        ].find((id?: string) => !isNilOrEmpty(id) && !isTemporaryId(id))!;

        if (hasValues(createdOrUpdatedTracks)) {
            tracks = List(createdOrUpdatedTracks);

            const hasMissingProjectIds = tracks.some((track) =>
                isNilOrEmpty(track.project_id)
            );
            const projectIdFound = !isNilOrEmpty(projectId);
            if (hasMissingProjectIds && !projectIdFound) {
                throw new Error(
                    "New tracks were added but could not be created without a ProjectId."
                );
            }

            if (hasMissingProjectIds) {
                tracks = tracks.map((track) =>
                    track.merge({ project_id: projectId })
                );
            }

            tracks = List(
                await Promise.all(
                    tracks.map(async (track) => {
                        const result = await createOrUpdateTrack(track);

                        return result.setTemporaryId(track.id);
                    })
                )
            );
        }

        if (hasValues(deletedTracks)) {
            await Promise.all(
                deletedTracks.map((track) => deleteTrack(track.id))
            );
        }

        if (hasValues(createdOrUpdatedTrackSections)) {
            trackSections = List(createdOrUpdatedTrackSections);
            const hasMissingTrackId = trackSections.some(
                (trackSection) => !trackSection.hasTrackId()
            );

            if (hasMissingTrackId) {
                trackSections = trackSections.map((trackSection) => {
                    if (trackSection.hasTrackId()) {
                        return trackSection;
                    }

                    const originalTrack = tracks?.find(
                        (track) =>
                            track.getTemporaryId() === trackSection.track_id
                    );

                    console.log(
                        `Matched TrackSection ${trackSection.id} with temporaryId ${trackSection.track_id} to ${originalTrack?.id}`
                    );

                    if (originalTrack == null) {
                        throw new Error(
                            `Tried to match up track section ${trackSection.id} with temporary trackId ${trackSection.track_id}, but nothing was found.`
                        );
                    }

                    return trackSection.merge({ track_id: originalTrack?.id });
                });
            }

            trackSections = List(
                await Promise.all(
                    trackSections.map((trackSection) =>
                        createOrUpdateTrackSection(trackSection)
                    )
                )
            );
        }

        if (hasValues(deletedTrackSections)) {
            await Promise.all(
                deletedTrackSections.map((trackSection) =>
                    deleteTrackSection(trackSection.id)
                )
            );
        }

        return getWorkstationByProjectId(projectId);
    };

    const result = useMutation({
        fn: sync,
        onError,
        onSuccess,
    });

    return result;
};

export { useSyncWorkstationState };
