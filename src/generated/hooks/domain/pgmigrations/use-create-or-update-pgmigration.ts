import { Pgmigration } from "generated/interfaces/pgmigration";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";
import { isNilOrEmpty, isTemporaryId } from "utils/core-utils";
import { useCreatePgmigration } from "generated/hooks/domain/pgmigrations/use-create-pgmigration";
import { useUpdatePgmigration } from "generated/hooks/domain/pgmigrations/use-update-pgmigration";

interface UseCreateOrUpdatePgmigrationOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: Pgmigration) => void;
}

const useCreateOrUpdatePgmigration = (
    options?: UseCreateOrUpdatePgmigrationOptions
): UseMutationResult<Pgmigration, Error, Pgmigration> => {
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();
    const { mutateAsync: createPgmigration } = useCreatePgmigration();
    const { mutateAsync: updatePgmigration } = useUpdatePgmigration();

    const createOrUpdate = async (pgmigration: Pgmigration) =>
        isNilOrEmpty(pgmigration.id) || isTemporaryId(pgmigration.id)
            ? createPgmigration(pgmigration)
            : updatePgmigration(pgmigration);

    const result = useMutation<Pgmigration, Error, Pgmigration>({
        fn: createOrUpdate,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Pgmigrations]);
        },
    });

    return result;
};

export { useCreateOrUpdatePgmigration };
