import type { Public } from "generated/interfaces/public";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "hooks/use-query";
import { useQuery } from "hooks/use-query";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import type { SortOptions } from "interfaces/sort-options";

interface UseListPublicsOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<Public>
    ) => PostgrestFilterBuilder<Public>;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: Public[]) => void;
    sortBy?: SortOptions<Public>;
}

const defaultFilter = (query: PostgrestFilterBuilder<Public>) => query;

const useListPublics = (
    options?: UseListPublicsOptions
): UseQueryResult<Public[], Error> => {
    const { fromPublics } = SupabaseClient;
    const {
        enabled,
        filter = defaultFilter,
        key = [],
        onError,
        onSuccess,
        sortBy,
    } = options ?? {};

    const list = async () => {
        let query = fromPublics().select("*");
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

    const result = useQuery<Public[], Error>({
        enabled,
        key: [Tables.Publics, sortBy, ...key],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListPublics };
