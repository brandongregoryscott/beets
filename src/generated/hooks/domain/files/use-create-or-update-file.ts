import { FileRecord } from "models/file-record";
import { File } from "generated/interfaces/file";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";
import { isNilOrEmpty, isTemporaryId } from "utils/core-utils";
import { useCreateFile } from "generated/hooks/domain/files/use-create-file";
import { useUpdateFile } from "generated/hooks/domain/files/use-update-file";

interface UseCreateOrUpdateFileOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: FileRecord) => void;
}

const useCreateOrUpdateFile = (
    options?: UseCreateOrUpdateFileOptions
): UseMutationResult<FileRecord, Error, File> => {
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();
    const { mutateAsync: createFile } = useCreateFile();
    const { mutateAsync: updateFile } = useUpdateFile();

    const createOrUpdate = async (file: File) =>
        isNilOrEmpty(file.id) || isTemporaryId(file.id)
            ? createFile(file)
            : updateFile(file);

    const result = useMutation<FileRecord, Error, File>({
        fn: createOrUpdate,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Files]);
        },
    });

    return result;
};

export { useCreateOrUpdateFile };
