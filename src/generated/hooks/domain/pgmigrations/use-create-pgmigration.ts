import { Pgmigration } from "generated/interfaces/pgmigration";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreatePgmigrationOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: Pgmigration) => void;
}

const useCreatePgmigration = (
    options?: UseCreatePgmigrationOptions
): UseMutationResult<Pgmigration, Error, Pgmigration> => {
    const { fromPgmigrations } = SupabaseClient;
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const create = async (pgmigration: Pgmigration) => {
        const { data, error } = await fromPgmigrations()
            .insert({ ...pgmigration, id: undefined })
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return data!;
    };

    const result = useMutation<Pgmigration, Error, Pgmigration>({
        fn: create,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Pgmigrations]);
        },
    });

    return result;
};

export { useCreatePgmigration };
