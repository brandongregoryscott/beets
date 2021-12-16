import { Instrument } from "generated/interfaces/instrument";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateOrUpdateInstrumentOptions {
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: Instrument) => void;
}

const useCreateOrUpdateInstrument = (
    options?: UseCreateOrUpdateInstrumentOptions
): UseMutationResult<Instrument, Error, Instrument> => {
    const { fromInstruments } = SupabaseClient;
    const { onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const createOrUpdate = async (instrument: Instrument) => {
        const { data, error } = await fromInstruments()
            .upsert(instrument)
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return data!;
    };

    const result = useMutation<Instrument, Error, Instrument>({
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
