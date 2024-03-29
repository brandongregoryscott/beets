import { ProjectRecord } from "models/project-record";
import type { Project } from "generated/interfaces/project";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import type { UseMutationResult } from "hooks/use-mutation";
import { useMutation } from "hooks/use-mutation";

interface UseCreateOrUpdateProjectOptions {
    onConflict?: keyof Project;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: ProjectRecord) => void;
}

const useCreateOrUpdateProject = (
    options?: UseCreateOrUpdateProjectOptions
): UseMutationResult<ProjectRecord, Error, Project> => {
    const { fromProjects } = SupabaseClient;
    const { onConflict, onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const createOrUpdate = async (project: Project) => {
        const { data, error } = await fromProjects()
            .upsert(
                project instanceof ProjectRecord ? project.toPOJO() : project,
                { onConflict }
            )
            .select("*")
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return new ProjectRecord(data!);
    };

    const result = useMutation<ProjectRecord, Error, Project>({
        fn: createOrUpdate,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(Tables.Projects);
            onSettled?.();
        },
    });

    return result;
};

export { useCreateOrUpdateProject };
