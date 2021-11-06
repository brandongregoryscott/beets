import { TrackRecord } from "models/track-record";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateTrackOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: TrackRecord) => void;
}

const useCreateTrack = (
    options?: UseCreateTrackOptions
): UseMutationResult<TrackRecord, Error, Track> => {
    const { fromTracks } = useDatabase();
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const create = async (track: Track) => {
        const { data, error } = await fromTracks()
            .insert(track)
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
            queryClient.invalidateQueries(Tables.Tracks);
        },
    });

    return result;
};

export { useCreateTrack };
