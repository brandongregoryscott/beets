import { Instrument } from "generated/interfaces/instrument";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

interface UseListInstrumentsOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<Instrument>
    ) => PostgrestFilterBuilder<Instrument>;
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: Instrument[]) => void;
}

const defaultFilter = (query: PostgrestFilterBuilder<Instrument>) => query;

const useListInstruments = (
    options?: UseListInstrumentsOptions
): UseQueryResult<Instrument[], Error> => {
    const { fromInstruments } = SupabaseClient;
    const {
        enabled,
        filter = defaultFilter,
        onError,
        onSuccess,
    } = options ?? {};

    const list = async () => {
        const query = fromInstruments().select("*");
        const { data, error } = await filter(query);
        if (error != null) {
            throw error;
        }

        return data ?? [];
    };

    const result = useQuery<Instrument[], Error>({
        enabled,
        key: Tables.Instruments,
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListInstruments };
