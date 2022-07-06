import { FileRecord } from "models/file-record";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "utils/hooks/use-query";
import { useQuery } from "utils/hooks/use-query";

interface UseGetFileOptions {
    enabled?: boolean;
    id: string;
    key?: any[];
}

const useGetFile = (
    options: UseGetFileOptions
): UseQueryResult<FileRecord | undefined, Error> => {
    const { fromFiles } = SupabaseClient;
    const { id, enabled, key = [] } = options;

    const get = async () => {
        const query = fromFiles().select("*").eq("id", id).limit(1).single();
        const { data, error } = await query;
        if (error != null) {
            throw error;
        }

        if (data == null) {
            return undefined;
        }

        return new FileRecord(data);
    };

    const result = useQuery<FileRecord | undefined, Error>({
        enabled,
        key: [Tables.Files, id, ...key],
        fn: get,
    });

    return result;
};

export { useGetFile };
