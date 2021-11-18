import { FileRecord } from "models/file-record";
import { File } from "generated/interfaces/file";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseUpdateFileOptions {
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: FileRecord) => void;
}

const useUpdateFile = (
    options?: UseUpdateFileOptions
): UseMutationResult<FileRecord, Error, File> => {
    const { fromFiles } = SupabaseClient;
    const { onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const update = async (file: File) => {
        const { data, error } = await fromFiles()
            .update(file instanceof FileRecord ? file.toPOJO() : file)
            .eq("id", file.id)
            .single();

        if (error != null) {
            throw error;
        }

        return new FileRecord(data!);
    };

    const result = useMutation<FileRecord, Error, File>({
        fn: update,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Files]);
            onSettled?.();
        },
    });

    return result;
};

export { useUpdateFile };
