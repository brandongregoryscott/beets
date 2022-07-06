import { TrackSectionStepRecord } from "models/track-section-step-record";
import type { TrackSectionStep } from "generated/interfaces/track-section-step";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import type { UseMutationResult } from "utils/hooks/use-mutation";
import { useMutation } from "utils/hooks/use-mutation";

interface UseCreateOrUpdateTrackSectionStepOptions {
    onConflict?: keyof TrackSectionStep;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: TrackSectionStepRecord) => void;
}

const useCreateOrUpdateTrackSectionStep = (
    options?: UseCreateOrUpdateTrackSectionStepOptions
): UseMutationResult<TrackSectionStepRecord, Error, TrackSectionStep> => {
    const { fromTrackSectionSteps } = SupabaseClient;
    const { onConflict, onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const createOrUpdate = async (trackSectionStep: TrackSectionStep) => {
        const { data, error } = await fromTrackSectionSteps()
            .upsert(
                trackSectionStep instanceof TrackSectionStepRecord
                    ? trackSectionStep.toPOJO()
                    : trackSectionStep,
                { onConflict }
            )
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return new TrackSectionStepRecord(data!);
    };

    const result = useMutation<TrackSectionStepRecord, Error, TrackSectionStep>(
        {
            fn: createOrUpdate,
            onSuccess,
            onError,
            onSettled: () => {
                queryClient.invalidateQueries(Tables.TrackSectionSteps);
                onSettled?.();
            },
        }
    );

    return result;
};

export { useCreateOrUpdateTrackSectionStep };
