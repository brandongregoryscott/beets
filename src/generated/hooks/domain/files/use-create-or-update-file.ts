import { FileRecord } from "models/file-record";
import { File } from "generated/interfaces/file";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateOrUpdateFileOptions {
    onConflict?: keyof File;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: FileRecord) => void;
}

const useCreateOrUpdateFile = (
    options?: UseCreateOrUpdateFileOptions
): UseMutationResult<FileRecord, Error, File> => {
    const { fromFiles } = SupabaseClient;
    const { onConflict, onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const createOrUpdate = async (file: File) => {
        const { data, error } = await fromFiles()
            .upsert(file instanceof FileRecord ? file.toPOJO() : file, {
                onConflict,
            })
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return new FileRecord(data!);
    };

    const result = useMutation<FileRecord, Error, File>({
        fn: createOrUpdate,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(Tables.Files);
            onSettled?.();
        },
    });

    return result;
};

export { useCreateOrUpdateFile };
