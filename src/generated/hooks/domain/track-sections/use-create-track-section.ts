import { TrackSectionRecord } from "models/track-section-record";
import { TrackSection } from "generated/interfaces/track-section";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateTrackSectionOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: TrackSectionRecord) => void;
}

const useCreateTrackSection = (
    options?: UseCreateTrackSectionOptions
): UseMutationResult<TrackSectionRecord, Error, TrackSection> => {
    const { fromTrackSections } = useDatabase();
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const create = async (trackSection: TrackSection) => {
        const { data, error } = await fromTrackSections()
            .insert({
                ...(trackSection instanceof TrackSectionRecord
                    ? trackSection.toPOJO()
                    : trackSection),
                id: undefined,
            })
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return new TrackSectionRecord(data!);
    };

    const result = useMutation<TrackSectionRecord, Error, TrackSection>({
        fn: create,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.TrackSections]);
        },
    });

    return result;
};

export { useCreateTrackSection };
