import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseDeleteUserOptions {
    onError?: (error: Error) => void;
    onSuccess?: () => void;
}

const useDeleteUser = (
    options?: UseDeleteUserOptions
): UseMutationResult<void, Error, string> => {
    const { fromUsers } = SupabaseClient;
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const deleteFn = async (id: string) => {
        const { error } = await fromUsers().delete().eq("id", id);

        if (error != null) {
            throw error;
        }
    };

    const result = useMutation<void, Error, string>({
        fn: deleteFn,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Users]);
        },
    });

    return result;
};

export { useDeleteUser };
