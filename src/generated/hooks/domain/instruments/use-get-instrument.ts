import { InstrumentRecord } from "models/instrument-record";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "utils/hooks/use-query";
import { useQuery } from "utils/hooks/use-query";

interface UseGetInstrumentOptions {
    enabled?: boolean;
    id: string;
    key?: any[];
}

const useGetInstrument = (
    options: UseGetInstrumentOptions
): UseQueryResult<InstrumentRecord | undefined, Error> => {
    const { fromInstruments } = SupabaseClient;
    const { id, enabled, key = [] } = options;

    const get = async () => {
        const query = fromInstruments()
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

        return new InstrumentRecord(data);
    };

    const result = useQuery<InstrumentRecord | undefined, Error>({
        enabled,
        key: [Tables.Instruments, id, ...key],
        fn: get,
    });

    return result;
};

export { useGetInstrument };
