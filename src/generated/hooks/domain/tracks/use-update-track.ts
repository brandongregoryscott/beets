import { TrackRecord } from "models/track-record";
import { Track } from "generated/interfaces/track";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseUpdateTrackOptions {
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: TrackRecord) => void;
}

const useUpdateTrack = (
    options?: UseUpdateTrackOptions
): UseMutationResult<TrackRecord, Error, Track> => {
    const { fromTracks } = useDatabase();
    const { onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const update = async (track: Track) => {
        const { data, error } = await fromTracks()
            .update(track instanceof TrackRecord ? track.toPOJO() : track)
            .eq("id", track.id)
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

export { useUpdateTrack };
