import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import type { UseMutationResult } from "hooks/use-mutation";
import { useMutation } from "hooks/use-mutation";

interface UseDeleteInstrumentOptions {
    onError?: (error: Error) => void;
    onSuccess?: () => void;
}

const useDeleteInstrument = (
    options?: UseDeleteInstrumentOptions
): UseMutationResult<void, Error, string> => {
    const { fromInstruments } = SupabaseClient;
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const deleteFn = async (id: string) => {
        const { error } = await fromInstruments().delete().eq("id", id);

        if (error != null) {
            throw error;
        }
    };

    const result = useMutation<void, Error, string>({
        fn: deleteFn,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(Tables.Instruments);
        },
    });

    return result;
};

export { useDeleteInstrument };
