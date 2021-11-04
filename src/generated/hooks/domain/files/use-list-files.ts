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

const useListFiles = (
    options?: UseListFilesOptions
): UseQueryResult<File[], Error> => {
    const { fromFiles } = useDatabase();
    const { filter } = options ?? {};

    const result = useQuery<File[], Error>({
        key: Tables.Files,
        fn: async () => {
            let query = fromFiles().select("*");
            if (filter != null) {
                query = filter(query);
            }

            const { data, error } = await query;
            if (error != null) {
                throw error;
            }

            return data ?? [];
        },
    });

    return result;
};

export { useListFiles };
