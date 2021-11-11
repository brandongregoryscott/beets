import { TrackSectionStepRecord } from "models/track-section-step-record";
import { TrackSectionStep } from "generated/interfaces/track-section-step";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseUpdateTrackSectionStepOptions {
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: TrackSectionStepRecord) => void;
}

const useUpdateTrackSectionStep = (
    options?: UseUpdateTrackSectionStepOptions
): UseMutationResult<TrackSectionStepRecord, Error, TrackSectionStep> => {
    const { fromTrackSectionSteps } = useDatabase();
    const { onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const update = async (trackSectionStep: TrackSectionStep) => {
        const { data, error } = await fromTrackSectionSteps()
            .update(
                trackSectionStep instanceof TrackSectionStepRecord
                    ? trackSectionStep.toPOJO()
                    : trackSectionStep
            )
            .eq("id", trackSectionStep.id)
            .single();

        if (error != null) {
            throw error;
        }

        return new TrackSectionStepRecord(data!);
    };

    const result = useMutation<TrackSectionStepRecord, Error, TrackSectionStep>(
        {
            fn: update,
            onSuccess,
            onError,
            onSettled: () => {
                queryClient.invalidateQueries([
                    "List",
                    Tables.TrackSectionSteps,
                ]);
                onSettled?.();
            },
        }
    );

    return result;
};

export { useUpdateTrackSectionStep };
