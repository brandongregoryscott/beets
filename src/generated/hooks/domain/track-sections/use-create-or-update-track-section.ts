import { TrackSectionRecord } from "models/track-section-record";
import { TrackSection } from "generated/interfaces/track-section";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateOrUpdateTrackSectionOptions {
    onConflict?: keyof TrackSection;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: TrackSectionRecord) => void;
}

const useCreateOrUpdateTrackSection = (
    options?: UseCreateOrUpdateTrackSectionOptions
): UseMutationResult<TrackSectionRecord, Error, TrackSection> => {
    const { fromTrackSections } = SupabaseClient;
    const { onConflict, onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const createOrUpdate = async (trackSection: TrackSection) => {
        const { data, error } = await fromTrackSections()
            .upsert(
                trackSection instanceof TrackSectionRecord
                    ? trackSection.toPOJO()
                    : trackSection,
                { onConflict }
            )
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return new TrackSectionRecord(data!);
    };

    const result = useMutation<TrackSectionRecord, Error, TrackSection>({
        fn: createOrUpdate,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(Tables.TrackSections);
            onSettled?.();
        },
    });

    return result;
};

export { useCreateOrUpdateTrackSection };
