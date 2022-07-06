import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import type { UseMutationResult } from "utils/hooks/use-mutation";
import { useMutation } from "utils/hooks/use-mutation";

interface UseDeleteTrackSectionOptions {
    onError?: (error: Error) => void;
    onSuccess?: () => void;
}

const useDeleteTrackSection = (
    options?: UseDeleteTrackSectionOptions
): UseMutationResult<void, Error, string> => {
    const { fromTrackSections } = SupabaseClient;
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const deleteFn = async (id: string) => {
        const { error } = await fromTrackSections().delete().eq("id", id);

        if (error != null) {
            throw error;
        }
    };

    const result = useMutation<void, Error, string>({
        fn: deleteFn,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(Tables.TrackSections);
        },
    });

    return result;
};

export { useDeleteTrackSection };
