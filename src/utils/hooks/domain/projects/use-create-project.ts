import { useQueryClient } from "react-query";
import { projectsKey } from "utils/query-key-utils";
import { useDatabase } from "generated/hooks/use-database";
import { Project } from "generated/interfaces/project";
import { useMutation } from "utils/hooks/use-mutation";

interface UseCreateProjectOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: Project) => void;
}

const useCreateProject = (options?: UseCreateProjectOptions) => {
    const { onSuccess, onError } = options ?? {};
    const { fromProjects } = useDatabase();
    const queryClient = useQueryClient();

    const create = async (project: Project) => {
        const { data, error } = await fromProjects()
            .insert(project)
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return data!;
    };

    const mutation = useMutation({
        fn: create,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(projectsKey());
        },
    });

    return mutation;
};

export { useCreateProject };
