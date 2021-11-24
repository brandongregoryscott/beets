import { TrackRecord } from "models/track-record";
import { Track } from "generated/interfaces/track";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateOrUpdateTrackOptions {
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: TrackRecord) => void;
}

const useCreateOrUpdateTrack = (
    options?: UseCreateOrUpdateTrackOptions
): UseMutationResult<TrackRecord, Error, Track> => {
    const { fromTracks } = SupabaseClient;
    const { onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const update = async (track: Track) => {
        const { data, error } = await fromTracks()
            .upsert(track instanceof TrackRecord ? track.toPOJO() : track)
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return new TrackRecord(data!);
    };

    const result = useMutation<TrackRecord, Error, Track>({
        fn: update,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Tracks]);
            onSettled?.();
        },
    });

    return result;
};

export { useCreateOrUpdateTrack };
