import { useCreateOrUpdateProject } from "generated/hooks/domain/projects/use-create-or-update-project";
import { useCreateOrUpdateTrack } from "generated/hooks/domain/tracks/use-create-or-update-track";
import { List } from "immutable";
import { WorkstationState } from "interfaces/workstation-state";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { useMutation } from "utils/hooks/use-mutation";

interface UseSyncWorkstationState {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: WorkstationStateRecord) => void;
}

const useSyncWorkstationState = (options?: UseSyncWorkstationState) => {
    const { onError, onSuccess } = options ?? {};
    const { mutateAsync: createOrUpdateProject } = useCreateOrUpdateProject();
    const { mutateAsync: createOrUpdateTrack } = useCreateOrUpdateTrack();

    const sync = async (workstationState: WorkstationState) => {
        const { project, tracks } = workstationState;
        const projectResult = await createOrUpdateProject(project);
        const _tracks = tracks.map((track) =>
            track.merge({ project_id: projectResult.id })
        );
        const trackResults = await Promise.all(
            _tracks.map((track) => createOrUpdateTrack(track))
        );

        return new WorkstationStateRecord({
            project: projectResult,
            tracks: List(trackResults),
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
