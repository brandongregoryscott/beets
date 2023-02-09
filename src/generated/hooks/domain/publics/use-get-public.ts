import type { Public } from "generated/interfaces/public";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "hooks/use-query";
import { useQuery } from "hooks/use-query";

interface UseGetPublicOptions {
    enabled?: boolean;
    id: string;
    key?: any[];
}

const useGetPublic = (
    options: UseGetPublicOptions
): UseQueryResult<Public | undefined, Error> => {
    const { fromPublics } = SupabaseClient;
    const { id, enabled, key = [] } = options;

    const get = async () => {
        const query = fromPublics().select("*").eq("id", id).limit(1).single();
        const { data, error } = await query;
        if (error != null) {
            throw error;
        }

        if (data == null) {
            return undefined;
        }

        return data;
    };

    const result = useQuery<Public | undefined, Error>({
        enabled,
        key: [Tables.Publics, id, ...key],
        fn: get,
    });

    return result;
};

export { useGetPublic };
