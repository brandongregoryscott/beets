import { InstrumentRecord } from "models/instrument-record";
import type { Instrument } from "generated/interfaces/instrument";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "hooks/use-query";
import { useQuery } from "hooks/use-query";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import type { SortOptions } from "interfaces/sort-options";
import type { PublicSchema } from "generated/database";

interface UseListInstrumentsOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<
            PublicSchema,
            Record<string, unknown>,
            Instrument
        >
    ) => PostgrestFilterBuilder<
        PublicSchema,
        Record<string, unknown>,
        Instrument
    >;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: InstrumentRecord[]) => void;
    sortBy?: SortOptions<Instrument>;
}

const defaultFilter = (
    query: PostgrestFilterBuilder<
        PublicSchema,
        Record<string, unknown>,
        Instrument
    >
) => query;

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
