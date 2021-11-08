import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseDeleteProjectOptions {
    onError?: (error: Error) => void;
    onSuccess?: () => void;
}

const useDeleteProject = (
    options?: UseDeleteProjectOptions
): UseMutationResult<void, Error, string> => {
    const { fromProjects } = useDatabase();
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const deleteFn = async (id: string) => {
        const { error } = await fromProjects().delete().eq("id", id);

        if (error != null) {
            throw error;
        }
    };

    const result = useMutation<void, Error, string>({
        fn: deleteFn,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Projects]);
        },
    });

    return result;
};

export { useDeleteProject };
