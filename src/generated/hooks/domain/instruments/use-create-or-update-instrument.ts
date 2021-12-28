import { InstrumentRecord } from "models/instrument-record";
import { Instrument } from "generated/interfaces/instrument";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateOrUpdateInstrumentOptions {
    onConflict?: keyof Instrument;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: InstrumentRecord) => void;
}

const useCreateOrUpdateInstrument = (
    options?: UseCreateOrUpdateInstrumentOptions
): UseMutationResult<InstrumentRecord, Error, Instrument> => {
    const { fromInstruments } = SupabaseClient;
    const { onConflict, onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const createOrUpdate = async (instrument: Instrument) => {
        const { data, error } = await fromInstruments()
            .upsert(
                instrument instanceof InstrumentRecord
                    ? instrument.toPOJO()
                    : instrument,
                { onConflict }
            )
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return new InstrumentRecord(data!);
    };

    const result = useMutation<InstrumentRecord, Error, Instrument>({
        fn: createOrUpdate,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(Tables.Instruments);
            onSettled?.();
        },
    });

    return result;
};

export { useCreateOrUpdateInstrument };
