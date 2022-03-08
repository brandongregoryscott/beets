import { Pgmigration } from "generated/interfaces/pgmigration";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

interface UseGetPgmigrationOptions {
    enabled?: boolean;
    id: string;
    key?: any[];
}

const useGetPgmigration = (
    options: UseGetPgmigrationOptions
): UseQueryResult<Pgmigration | undefined, Error> => {
    const { fromPgmigrations } = SupabaseClient;
    const { id, enabled, key = [] } = options;

    const get = async () => {
        const query = fromPgmigrations()
            .select("*")
            .eq("id", id)
            .limit(1)
            .single();
        const { data, error } = await query;
        if (error != null) {
            throw error;
        }

        if (data == null) {
            return undefined;
        }

        return data;
    };

    const result = useQuery<Pgmigration | undefined, Error>({
        enabled,
        key: [Tables.Pgmigrations, id, ...key],
        fn: get,
    });

    return result;
};

export { useGetPgmigration };
