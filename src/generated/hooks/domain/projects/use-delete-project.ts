import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import type { UseMutationResult } from "hooks/use-mutation";
import { useMutation } from "hooks/use-mutation";

interface UseDeleteProjectOptions {
    onError?: (error: Error) => void;
    onSuccess?: () => void;
}

const useDeleteProject = (
    options?: UseDeleteProjectOptions
): UseMutationResult<void, Error, string> => {
    const { fromProjects } = SupabaseClient;
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
            queryClient.invalidateQueries(Tables.Projects);
        },
    });

    return result;
};

export { useDeleteProject };
