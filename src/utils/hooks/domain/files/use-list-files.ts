import { FileRecord } from "models/file-record";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { filesKey } from "utils/query-key-utils";
import { File } from "generated/interfaces/file";
import { SupabaseClient } from "generated/supabase-client";

interface UseListFilesOptions {}

const useListFiles = (
    options?: UseListFilesOptions
): UseQueryResult<FileRecord[], Error> => {
    const { fromFiles } = SupabaseClient;
    const listQuery = useQuery<FileRecord[], Error>({
        key: filesKey(),
        fn: async () => {
            const result = await fromFiles().select("*");
            const { data, error } = result;
            if (error != null) {
                throw error;
            }

            return data?.map((file: File) => new FileRecord(file)) ?? [];
        },
    });

    return { ...listQuery };
};

export { useListFiles };
