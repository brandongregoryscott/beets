import { FileRecord } from "models/file-record";
import { filesKey } from "utils/query-key-utils";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";
import { useQueryClient } from "react-query";
import { useDatabase } from "generated/hooks/use-database";

interface UseUpdateFilesOptions {
    onSettled?: () => void;
}

const useUpdateFile = (
    options?: UseUpdateFilesOptions
): UseMutationResult<FileRecord, Error, FileRecord> => {
    const queryClient = useQueryClient();
    const { fromFiles } = useDatabase();

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
        key: filesKey(),
        fn: updateFile,
        onSettled: () => {
            queryClient.invalidateQueries(filesKey());
            options?.onSettled?.();
        },
    });

    return { ...mutation };
};

export { useUpdateFile };
