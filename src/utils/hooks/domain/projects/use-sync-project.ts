import { Tables } from "generated/enums/tables";
import { useCreateProject } from "generated/hooks/domain/projects/use-create-project";
import { useUpdateProject } from "generated/hooks/domain/projects/use-update-project";
import { useCreateTrack } from "generated/hooks/domain/tracks/use-create-track";
import { useUpdateTrack } from "generated/hooks/domain/tracks/use-update-track";
import { List } from "immutable";
import { ProjectRecord } from "models/project-record";
import { isNilOrEmpty, isTemporaryId } from "utils/core-utils";
import { useMutation } from "utils/hooks/use-mutation";

interface UseSyncProjectOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: ProjectRecord) => void;
}

const useSyncProject = (options?: UseSyncProjectOptions) => {
    const { onError, onSuccess } = options ?? {};
    const { mutateAsync: createProject } = useCreateProject();
    const { mutateAsync: updateProject } = useUpdateProject();
    const { mutateAsync: createTrack } = useCreateTrack();
    const { mutateAsync: updateTrack } = useUpdateTrack();

    const sync = async (project: ProjectRecord) => {
        const projectResult = isNilOrEmpty(project.id)
            ? await createProject(project.toPOJO())
            : await updateProject(project.toPOJO());

        console.log("project", project);
        console.log("project.getTracks()", project.getTracks());

        console.log(
            "project.getTracks() is List",
            List.isList(project.getTracks())
        );
        console.log("project.getTracks().map", project.getTracks().map);

        const trackResults = await Promise.all(
            project.getTracks().map((track) =>
                isNilOrEmpty(track.id) || isTemporaryId(track.id)
                    ? createTrack(
                          track
                              .merge({
                                  project_id: projectResult.id,
                              })
                              .toPOJO()
                      )
                    : updateTrack(track.toPOJO())
            )
        );

        return projectResult.setTracks(trackResults);
    };
    const result = useMutation({
        key: [Tables.Projects, Tables.Tracks],
        fn: sync,
        onError,
        onSuccess,
    });

    return result;
};

export { useSyncProject };
