import { TrackSectionRecord } from "models/track-section-record";
import { TrackSection } from "generated/interfaces/track-section";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseUpdateTrackSectionOptions {
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: TrackSectionRecord) => void;
}

const useUpdateTrackSection = (
    options?: UseUpdateTrackSectionOptions
): UseMutationResult<TrackSectionRecord, Error, TrackSection> => {
    const { fromTrackSections } = useDatabase();
    const { onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const update = async (trackSection: TrackSection) => {
        const { data, error } = await fromTrackSections()
            .update(
                trackSection instanceof TrackSectionRecord
                    ? trackSection.toPOJO()
                    : trackSection
            )
            .eq("id", trackSection.id)
            .single();

        if (error != null) {
            throw error;
        }

        return new TrackSectionRecord(data!);
    };

    const result = useMutation<TrackSectionRecord, Error, TrackSection>({
        fn: update,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.TrackSections]);
            onSettled?.();
        },
    });

    return result;
};

export { useUpdateTrackSection };
