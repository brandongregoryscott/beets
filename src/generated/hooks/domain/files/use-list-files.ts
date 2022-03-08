import { FileRecord } from "models/file-record";
import { File } from "generated/interfaces/file";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

interface UseListFilesOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<File>
    ) => PostgrestFilterBuilder<File>;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: FileRecord[]) => void;
}

const defaultFilter = (query: PostgrestFilterBuilder<File>) => query;

const useListFiles = (
    options?: UseListFilesOptions
): UseQueryResult<FileRecord[], Error> => {
    const { fromFiles } = SupabaseClient;
    const {
        enabled,
        filter = defaultFilter,
        onError,
        onSuccess,
    } = options ?? {};

    const list = async () => {
        const query = fromFiles().select("*");
        const { data, error } = await filter(query);
        if (error != null) {
            throw error;
        }

        return data?.map((file) => new FileRecord(file)) ?? [];
    };

    console.log("filter", filter);
    const result = useQuery<FileRecord[], Error>({
        enabled,
        key: [Tables.Files, ...(options?.key ?? [])],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListFiles };
