import { ProjectRecord } from "models/project-record";
import { Project } from "generated/interfaces/project";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseUpdateProjectOptions {
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: ProjectRecord) => void;
}

const useUpdateProject = (
    options?: UseUpdateProjectOptions
): UseMutationResult<ProjectRecord, Error, Project> => {
    const { fromProjects } = useDatabase();
    const { onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const update = async (project: Project) => {
        const { data, error } = await fromProjects()
            .update(
                project instanceof ProjectRecord ? project.toPOJO() : project
            )
            .eq("id", project.id)
            .single();

        if (error != null) {
            throw error;
        }

        return new ProjectRecord(data!);
    };

    const result = useMutation<ProjectRecord, Error, Project>({
        fn: update,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Projects]);
            onSettled?.();
        },
    });

    return result;
};

export { useUpdateProject };
