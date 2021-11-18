import { ProjectRecord } from "models/project-record";
import { Project } from "generated/interfaces/project";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateProjectOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: ProjectRecord) => void;
}

const useCreateProject = (
    options?: UseCreateProjectOptions
): UseMutationResult<ProjectRecord, Error, Project> => {
    const { fromProjects } = SupabaseClient;
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const create = async (project: Project) => {
        const { data, error } = await fromProjects()
            .insert({
                ...(project instanceof ProjectRecord
                    ? project.toPOJO()
                    : project),
                id: undefined,
            })
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return new ProjectRecord(data!);
    };

    const result = useMutation<ProjectRecord, Error, Project>({
        fn: create,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Projects]);
        },
    });

    return result;
};

export { useCreateProject };
