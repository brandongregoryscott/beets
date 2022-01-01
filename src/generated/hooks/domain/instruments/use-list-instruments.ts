import { InstrumentRecord } from "models/instrument-record";
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
    onSuccess?: (resultObjects: InstrumentRecord[]) => void;
}

const defaultFilter = (query: PostgrestFilterBuilder<Instrument>) => query;

const useListInstruments = (
    options?: UseListInstrumentsOptions
): UseQueryResult<InstrumentRecord[], Error> => {
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

        return (
            data?.map((instrument) => new InstrumentRecord(instrument)) ?? []
        );
    };

    const result = useQuery<InstrumentRecord[], Error>({
        enabled,
        key: Tables.Instruments,
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListInstruments };
