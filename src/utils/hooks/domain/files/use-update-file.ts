import { FileRecord } from "models/file-record";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";
import { useQueryClient } from "react-query";
import { SupabaseClient } from "generated/supabase-client";
import { Tables } from "generated/enums/tables";

interface UseUpdateFilesOptions {
    onSettled?: () => void;
}

const useUpdateFile = (
    options?: UseUpdateFilesOptions
): UseMutationResult<FileRecord, Error, FileRecord> => {
    const { onSettled } = options ?? {};
    const queryClient = useQueryClient();
    const { fromFiles } = SupabaseClient;

    const updateFile = async (file: FileRecord) => {
        const { error: updateError, data: updatedFile } = await fromFiles()
            .update(file.toPOJO())
            .eq("id", file.id)
            .single();

        if (updateError != null) {
            throw updateError;
        }

        return new FileRecord(updatedFile!);
    };

    const mutation = useMutation<FileRecord, Error, FileRecord>({
        fn: updateFile,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Files]);
            onSettled?.();
        },
    });

    return { ...mutation };
};

export { useUpdateFile };
