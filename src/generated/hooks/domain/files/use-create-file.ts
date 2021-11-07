import { FileRecord } from "models/file-record";
import { File } from "generated/interfaces/file";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateFileOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: FileRecord) => void;
}

const useCreateFile = (
    options?: UseCreateFileOptions
): UseMutationResult<FileRecord, Error, File> => {
    const { fromFiles } = useDatabase();
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const create = async (file: File) => {
        const { data, error } = await fromFiles()
            .insert(file)
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return new FileRecord(data!);
    };

    const result = useMutation<FileRecord, Error, File>({
        fn: create,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(Tables.Files);
        },
    });

    return result;
};

export { useCreateFile };
