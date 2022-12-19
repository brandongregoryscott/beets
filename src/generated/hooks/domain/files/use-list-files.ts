import { FileRecord } from "models/file-record";
import type { File } from "generated/interfaces/file";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "hooks/use-query";
import { useQuery } from "hooks/use-query";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import type { SortOptions } from "interfaces/sort-options";

interface UseListFilesOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<File>
    ) => PostgrestFilterBuilder<File>;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: FileRecord[]) => void;
    sortBy?: SortOptions<File>;
}

const defaultFilter = (query: PostgrestFilterBuilder<File>) => query;

const useListFiles = (
    options?: UseListFilesOptions
): UseQueryResult<FileRecord[], Error> => {
    const { fromFiles } = SupabaseClient;
    const {
        enabled,
        filter = defaultFilter,
        key = [],
        onError,
        onSuccess,
        sortBy,
    } = options ?? {};

    const list = async () => {
        let query = fromFiles().select("*");
        if (sortBy != null) {
            query = query.order(sortBy.column, {
                ascending: sortBy.order === "asc",
            });
        }

        const { data, error } = await filter(query);
        if (error != null) {
            throw error;
        }

        return data?.map((file) => new FileRecord(file)) ?? [];
    };

    const result = useQuery<FileRecord[], Error>({
        enabled,
        key: [Tables.Files, sortBy, ...key],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListFiles };
