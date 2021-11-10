import { useCreateOrUpdateProject } from "generated/hooks/domain/projects/use-create-or-update-project";
import { useCreateOrUpdateTrack } from "generated/hooks/domain/tracks/use-create-or-update-track";
import { ProjectRecord } from "models/project-record";
import { useMutation } from "utils/hooks/use-mutation";

interface UseSyncProjectOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: ProjectRecord) => void;
}

const useSyncProject = (options?: UseSyncProjectOptions) => {
    const { onError, onSuccess } = options ?? {};
    const { mutateAsync: createOrUpdateProject } = useCreateOrUpdateProject();
    const { mutateAsync: createOrUpdateTrack } = useCreateOrUpdateTrack();

    const sync = async (project: ProjectRecord) => {
        const projectResult = await createOrUpdateProject(project);
        const tracks = project
            .getTracks()
            .map((track) => track.merge({ project_id: projectResult.id }));
        const trackResults = await Promise.all(
            tracks.map((track) => createOrUpdateTrack(track))
        );

        return projectResult.setTracks(trackResults);
    };
    const result = useMutation({
        fn: sync,
        onError,
        onSuccess,
    });

    return result;
};

export { useSyncProject };
