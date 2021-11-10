import { TrackRecord } from "models/track-record";
import { Track } from "generated/interfaces/track";
import { Tables } from "generated/enums/tables";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";
import { isNilOrEmpty, isTemporaryId } from "utils/core-utils";
import { useCreateTrack } from "generated/hooks/domain/tracks/use-create-track";
import { useUpdateTrack } from "generated/hooks/domain/tracks/use-update-track";

interface UseCreateOrUpdateTrackOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: TrackRecord) => void;
}

const useCreateOrUpdateTrack = (
    options?: UseCreateOrUpdateTrackOptions
): UseMutationResult<TrackRecord, Error, Track> => {
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();
    const { mutateAsync: createTrack } = useCreateTrack();
    const { mutateAsync: updateTrack } = useUpdateTrack();

    const createOrUpdate = async (track: Track) =>
        isNilOrEmpty(track.id) || isTemporaryId(track.id)
            ? createTrack(track)
            : updateTrack(track);

    const result = useMutation<TrackRecord, Error, Track>({
        fn: createOrUpdate,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Tracks]);
        },
    });

    return result;
};

export { useCreateOrUpdateTrack };
