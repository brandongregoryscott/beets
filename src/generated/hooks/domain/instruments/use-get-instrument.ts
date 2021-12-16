import { InstrumentRecord } from "models/instrument-record";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

interface UseGetInstrumentOptions {
    enabled?: boolean;
    id: string;
}

const useGetInstrument = (
    options: UseGetInstrumentOptions
): UseQueryResult<InstrumentRecord | undefined, Error> => {
    const { fromInstruments } = SupabaseClient;
    const { id, enabled } = options;

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
        key: [Tables.Instruments, id],
        fn: get,
    });

    return result;
};

export { useGetInstrument };
