import { TrackRecord } from "models/track-record";
import { Track } from "generated/interfaces/track";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateOrUpdateTrackOptions {
    onConflict?: keyof Track;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: TrackRecord) => void;
}

const useCreateOrUpdateTrack = (
    options?: UseCreateOrUpdateTrackOptions
): UseMutationResult<TrackRecord, Error, Track> => {
    const { fromTracks } = SupabaseClient;
    const { onConflict, onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const createOrUpdate = async (track: Track) => {
        const { data, error } = await fromTracks()
            .upsert(track instanceof TrackRecord ? track.toPOJO() : track, {
                onConflict,
            })
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return new TrackRecord(data!);
    };

    const result = useMutation<TrackRecord, Error, Track>({
        fn: createOrUpdate,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(Tables.Tracks);
            onSettled?.();
        },
    });

    return result;
};

export { useCreateOrUpdateTrack };
