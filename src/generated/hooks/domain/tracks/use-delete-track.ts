import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseDeleteTrackOptions {
    onError?: (error: Error) => void;
    onSuccess?: () => void;
}

const useDeleteTrack = (
    options?: UseDeleteTrackOptions
): UseMutationResult<void, Error, string> => {
    const { fromTracks } = useDatabase();
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const deleteFn = async (id: string) => {
        const { error } = await fromTracks().delete().eq("id", id);

        if (error != null) {
            throw error;
        }
    };

    const result = useMutation<void, Error, string>({
        fn: deleteFn,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Tracks]);
        },
    });

    return result;
};

export { useDeleteTrack };
