import { Instrument } from "generated/interfaces/instrument";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

interface UseGetInstrumentOptions {
    enabled?: boolean;
    id: string;
}

const useGetInstrument = (
    options: UseGetInstrumentOptions
): UseQueryResult<Instrument | undefined, Error> => {
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

        return data;
    };

    const result = useQuery<Instrument | undefined, Error>({
        enabled,
        key: [Tables.Instruments, id],
        fn: get,
    });

    return result;
};

export { useGetInstrument };
