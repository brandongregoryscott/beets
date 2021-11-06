import { FileRecord } from "models/file-record";
import { File } from "generated/interfaces/file";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

interface UseListFilesOptions {
    filter?: (
        query: PostgrestFilterBuilder<File>
    ) => PostgrestFilterBuilder<File>;
}

const defaultFilter = (query: PostgrestFilterBuilder<File>) => query;

const useListFiles = (
    options?: UseListFilesOptions
): UseQueryResult<FileRecord[], Error> => {
    const { fromFiles } = useDatabase();
    const { filter = defaultFilter } = options ?? {};

    const result = useQuery<FileRecord[], Error>({
        key: Tables.Files,
        fn: async () => {
            const query = fromFiles().select("*");
            const { data, error } = await filter(query);
            if (error != null) {
                throw error;
            }

            return data?.map((file) => new FileRecord(file)) ?? [];
        },
    });

    return result;
};

export { useListFiles };
