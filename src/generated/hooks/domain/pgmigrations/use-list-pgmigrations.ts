import { Pgmigration } from "generated/interfaces/pgmigration";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

interface UseListPgmigrationsOptions {
    filter?: (
        query: PostgrestFilterBuilder<Pgmigration>
    ) => PostgrestFilterBuilder<Pgmigration>;
}

const defaultFilter = (query: PostgrestFilterBuilder<Pgmigration>) => query;

const useListPgmigrations = (
    options?: UseListPgmigrationsOptions
): UseQueryResult<Pgmigration[], Error> => {
    const { fromPgmigrations } = useDatabase();
    const { filter = defaultFilter } = options ?? {};

    const result = useQuery<Pgmigration[], Error>({
        key: Tables.Pgmigrations,
        fn: async () => {
            let query = fromPgmigrations().select("*");
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

export { useListPgmigrations };
