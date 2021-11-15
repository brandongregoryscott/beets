import { useCreateOrUpdateProject } from "generated/hooks/domain/projects/use-create-or-update-project";
import { useCreateOrUpdateTrack } from "generated/hooks/domain/tracks/use-create-or-update-track";
import { useDeleteTrack } from "generated/hooks/domain/tracks/use-delete-track";
import { List } from "immutable";
import { ProjectRecord } from "models/project-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { isNilOrEmpty, isTemporaryId } from "utils/core-utils";
import { useMutation } from "utils/hooks/use-mutation";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

interface UseSyncWorkstationState {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: WorkstationStateRecord) => void;
}

const useSyncWorkstationState = (options?: UseSyncWorkstationState) => {
    const { onError, onSuccess } = options ?? {};
    const { mutateAsync: createOrUpdateProject } = useCreateOrUpdateProject();
    const { mutateAsync: createOrUpdateTrack } = useCreateOrUpdateTrack();
    const { mutateAsync: deleteTrack } = useDeleteTrack();
    const { initialState, state } = useWorkstationState();

    const sync = async () => {
        const {
            createdOrUpdatedProject,
            createdOrUpdatedTracks,
            deletedTracks,
        } = initialState.diff(state);
        let project: ProjectRecord | undefined;
        if (createdOrUpdatedProject != null) {
            project = await createOrUpdateProject(createdOrUpdatedProject);
        }

        if (!createdOrUpdatedTracks?.isEmpty()) {
            let tracks = List(createdOrUpdatedTracks);
            const projectId = [
                state.project.id,
                initialState.project.id,
                project?.id,
            ].find((id?: string) => !isNilOrEmpty(id) && !isTemporaryId(id));

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
                    tracks.map((track) => createOrUpdateTrack(track))
                )
            );
        }

        if (!deletedTracks?.isEmpty()) {
            await Promise.all(
                deletedTracks!.map((track) => deleteTrack(track.id))
            );
        }

        // TODO: Refresh state from API
        return new WorkstationStateRecord({
            project: project ?? state.project,
            tracks: state.tracks,
        });
    };

    const result = useMutation({
        fn: sync,
        onError,
        onSuccess,
    });

    return result;
};

export { useSyncWorkstationState };
