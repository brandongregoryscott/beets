import { TrackSectionStepRecord } from "models/track-section-step-record";
import { TrackSectionStep } from "generated/interfaces/track-section-step";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateTrackSectionStepOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: TrackSectionStepRecord) => void;
}

const useCreateTrackSectionStep = (
    options?: UseCreateTrackSectionStepOptions
): UseMutationResult<TrackSectionStepRecord, Error, TrackSectionStep> => {
    const { fromTrackSectionSteps } = useDatabase();
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const create = async (trackSectionStep: TrackSectionStep) => {
        const { data, error } = await fromTrackSectionSteps()
            .insert({
                ...(trackSectionStep instanceof TrackSectionStepRecord
                    ? trackSectionStep.toPOJO()
                    : trackSectionStep),
                id: undefined,
            })
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return new TrackSectionStepRecord(data!);
    };

    const result = useMutation<TrackSectionStepRecord, Error, TrackSectionStep>(
        {
            fn: create,
            onSuccess,
            onError,
            onSettled: () => {
                queryClient.invalidateQueries([
                    "List",
                    Tables.TrackSectionSteps,
                ]);
            },
        }
    );

    return result;
};

export { useCreateTrackSectionStep };
