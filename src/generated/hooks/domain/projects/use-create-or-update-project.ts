import { ProjectRecord } from "models/project-record";
import { Project } from "generated/interfaces/project";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";
import { isNilOrEmpty, isTemporaryId } from "utils/core-utils";
import { useCreateProject } from "generated/hooks/domain/projects/use-create-project";
import { useUpdateProject } from "generated/hooks/domain/projects/use-update-project";

interface UseCreateOrUpdateProjectOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: ProjectRecord) => void;
}

const useCreateOrUpdateProject = (
    options?: UseCreateOrUpdateProjectOptions
): UseMutationResult<ProjectRecord, Error, Project> => {
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();
    const { mutateAsync: createProject } = useCreateProject();
    const { mutateAsync: updateProject } = useUpdateProject();

    const createOrUpdate = async (project: Project) =>
        isNilOrEmpty(project.id) || isTemporaryId(project.id)
            ? createProject(project)
            : updateProject(project);

    const result = useMutation<ProjectRecord, Error, Project>({
        fn: createOrUpdate,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Projects]);
        },
    });

    return result;
};

export { useCreateOrUpdateProject };
