import { ProjectRecord } from "models/project-record";
import { Project } from "generated/interfaces/project";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateOrUpdateProjectOptions {
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: ProjectRecord) => void;
}

const useCreateOrUpdateProject = (
    options?: UseCreateOrUpdateProjectOptions
): UseMutationResult<ProjectRecord, Error, Project> => {
    const { fromProjects } = SupabaseClient;
    const { onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const update = async (project: Project) => {
        const { data, error } = await fromProjects()
            .upsert(
                project instanceof ProjectRecord ? project.toPOJO() : project
            )
            .limit(1)
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

export { useCreateOrUpdateProject };
