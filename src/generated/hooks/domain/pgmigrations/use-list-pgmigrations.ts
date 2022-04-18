import { Pgmigration } from "generated/interfaces/pgmigration";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { SortOptions } from "interfaces/sort-options";

interface UseListPgmigrationsOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<Pgmigration>
    ) => PostgrestFilterBuilder<Pgmigration>;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: Pgmigration[]) => void;
    sortBy?: SortOptions<Pgmigration>;
}

const defaultFilter = (query: PostgrestFilterBuilder<Pgmigration>) => query;

const useListPgmigrations = (
    options?: UseListPgmigrationsOptions
): UseQueryResult<Pgmigration[], Error> => {
    const { fromPgmigrations } = SupabaseClient;
    const {
        enabled,
        filter = defaultFilter,
        key = [],
        onError,
        onSuccess,
        sortBy,
    } = options ?? {};

    const list = async () => {
        let query = fromPgmigrations().select("*");
        if (sortBy != null) {
            query = query.order(sortBy.column, {
                ascending: sortBy.order === "asc",
            });
        }

        const { data, error } = await filter(query);
        if (error != null) {
            throw error;
        }

        return data ?? [];
    };

    const result = useQuery<Pgmigration[], Error>({
        enabled,
        key: [Tables.Pgmigrations, sortBy, ...key],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListPgmigrations };
