import { TrackRecord } from "models/track-record";
import { Track } from "generated/interfaces/track";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateTrackOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: TrackRecord) => void;
}

const useCreateTrack = (
    options?: UseCreateTrackOptions
): UseMutationResult<TrackRecord, Error, Track> => {
    const { fromTracks } = SupabaseClient;
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const create = async (track: Track) => {
        const { data, error } = await fromTracks()
            .insert({
                ...(track instanceof TrackRecord ? track.toPOJO() : track),
                id: undefined,
            })
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return new TrackRecord(data!);
    };

    const result = useMutation<TrackRecord, Error, Track>({
        fn: create,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Tracks]);
        },
    });

    return result;
};

export { useCreateTrack };
