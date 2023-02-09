import type { Public } from "generated/interfaces/public";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import type { UseMutationResult } from "hooks/use-mutation";
import { useMutation } from "hooks/use-mutation";

interface UseCreateOrUpdatePublicOptions {
    onConflict?: keyof Public;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: Public) => void;
}

const useCreateOrUpdatePublic = (
    options?: UseCreateOrUpdatePublicOptions
): UseMutationResult<Public, Error, Public> => {
    const { fromPublics } = SupabaseClient;
    const { onConflict, onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const createOrUpdate = async (public: Public) => {
        const { data, error } = await fromPublics()
            .upsert(public, { onConflict })
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return data!;
    };

    const result = useMutation<Public, Error, Public>({
        fn: createOrUpdate,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(Tables.Publics);
            onSettled?.();
        },
    });

    return result;
};

export { useCreateOrUpdatePublic };
