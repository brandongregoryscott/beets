import { Pgmigration } from "generated/interfaces/pgmigration";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

interface UseListPgmigrationsOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<Pgmigration>
    ) => PostgrestFilterBuilder<Pgmigration>;
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: Pgmigration[]) => void;
}

const defaultFilter = (query: PostgrestFilterBuilder<Pgmigration>) => query;

const useListPgmigrations = (
    options?: UseListPgmigrationsOptions
): UseQueryResult<Pgmigration[], Error> => {
    const { fromPgmigrations } = SupabaseClient;
    const {
        enabled,
        filter = defaultFilter,
        onError,
        onSuccess,
    } = options ?? {};

    const list = async () => {
        const query = fromPgmigrations().select("*");
        const { data, error } = await filter(query);
        if (error != null) {
            throw error;
        }

        return data ?? [];
    };

    const result = useQuery<Pgmigration[], Error>({
        enabled,
        key: Tables.Pgmigrations,
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListPgmigrations };
