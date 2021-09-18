import { FileRecord } from "models/file-record";
import { useDatabase } from "utils/hooks/supabase/use-database";
import { storageProviderFilesKey, filesKey } from "utils/query-key-utils";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";
import { useStorageProvider } from "utils/hooks/supabase/use-storage-provider";
import { useQueryClient } from "react-query";

const useDeleteFile = (): UseMutationResult<void, Error, string> => {
    const queryClient = useQueryClient();
    const { storage } = useStorageProvider();
    const { from } = useDatabase();
    const fileTable = from("files");

    const deleteFile = async (id: string) => {
        const fileResult = await fileTable.select("*").eq("id", id).single();
        const { data, error } = fileResult;
        if (error != null) {
            throw error;
        }

        if (data == null) {
            return;
        }

        const file = new FileRecord(data);

        const { error: deletionError } = await fileTable.update({
            id,
            deletedon: new Date().toISOString(),
        });

        if (deletionError != null) {
            throw deletionError;
        }

        const { error: storageProviderError } = await storage
            .from(file.bucketid)
            .remove([file.getPath()]);

        if (storageProviderError != null) {
            throw storageProviderError;
        }
    };

    const mutation = useMutation<void, Error, string>({
        key: filesKey(),
        fn: deleteFile,
        onSettled: () => {
            queryClient.invalidateQueries(filesKey());
            queryClient.invalidateQueries(storageProviderFilesKey());
        },
    });

    return { ...mutation };
};

export { useDeleteFile };
