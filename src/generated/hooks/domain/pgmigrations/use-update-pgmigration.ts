import { Pgmigration } from "generated/interfaces/pgmigration";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseUpdatePgmigrationOptions {
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: Pgmigration) => void;
}

const useUpdatePgmigration = (
    options?: UseUpdatePgmigrationOptions
): UseMutationResult<Pgmigration, Error, Pgmigration> => {
    const { fromPgmigrations } = useDatabase();
    const { onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const update = async (pgmigration: Pgmigration) => {
        const { data, error } = await fromPgmigrations()
            .update(pgmigration)
            .eq("id", pgmigration.id)
            .single();

        if (error != null) {
            throw error;
        }

        return data!;
    };

    const result = useMutation<Pgmigration, Error, Pgmigration>({
        fn: update,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(Tables.Pgmigrations);
            onSettled?.();
        },
    });

    return result;
};

export { useUpdatePgmigration };
