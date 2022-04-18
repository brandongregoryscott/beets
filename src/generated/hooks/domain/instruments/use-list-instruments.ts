import { InstrumentRecord } from "models/instrument-record";
import { Instrument } from "generated/interfaces/instrument";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { SortOptions } from "interfaces/sort-options";

interface UseListInstrumentsOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<Instrument>
    ) => PostgrestFilterBuilder<Instrument>;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: InstrumentRecord[]) => void;
    sortBy?: SortOptions<Instrument>;
}

const defaultFilter = (query: PostgrestFilterBuilder<Instrument>) => query;

const useListInstruments = (
    options?: UseListInstrumentsOptions
): UseQueryResult<InstrumentRecord[], Error> => {
    const { fromInstruments } = SupabaseClient;
    const {
        enabled,
        filter = defaultFilter,
        key = [],
        onError,
        onSuccess,
        sortBy,
    } = options ?? {};

    const list = async () => {
        let query = fromInstruments().select("*");
        if (sortBy != null) {
            query = query.order(sortBy.column, {
                ascending: sortBy.order === "asc",
            });
        }

        const { data, error } = await filter(query);
        if (error != null) {
            throw error;
        }

        return (
            data?.map((instrument) => new InstrumentRecord(instrument)) ?? []
        );
    };

    const result = useQuery<InstrumentRecord[], Error>({
        enabled,
        key: [Tables.Instruments, sortBy, ...key],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListInstruments };
