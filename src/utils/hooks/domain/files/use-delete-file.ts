import { FileRecord } from "models/file-record";
import { storageProviderFilesKey, filesKey } from "utils/query-key-utils";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";
import { useStorageProvider } from "utils/hooks/supabase/use-storage-provider";
import { useQueryClient } from "react-query";
import { SupabaseClient } from "generated/supabase-client";

const useDeleteFile = (): UseMutationResult<void, Error, string> => {
    const queryClient = useQueryClient();
    const { storage } = useStorageProvider();
    const { fromFiles } = SupabaseClient;

    const deleteFile = async (id: string) => {
        const fileResult = await fromFiles().select("*").eq("id", id).single();
        const { data, error } = fileResult;
        if (error != null) {
            throw error;
        }

        if (data == null) {
            return;
        }

        const file = new FileRecord(data);

        const { error: deletionError } = await fromFiles()
            .delete()
            .eq("id", file.id);

        const { error: storageProviderError } = await storage
            .from(file.bucket_id)
            .remove([file.getPath()]);

        if (deletionError != null) {
            throw deletionError;
        }

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
