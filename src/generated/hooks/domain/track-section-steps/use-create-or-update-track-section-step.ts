import { TrackSectionStepRecord } from "models/track-section-step-record";
import { TrackSectionStep } from "generated/interfaces/track-section-step";
import { Tables } from "generated/enums/tables";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";
import { isNilOrEmpty, isTemporaryId } from "utils/core-utils";
import { useCreateTrackSectionStep } from "generated/hooks/domain/track-section-steps/use-create-track-section-step";
import { useUpdateTrackSectionStep } from "generated/hooks/domain/track-section-steps/use-update-track-section-step";

interface UseCreateOrUpdateTrackSectionStepOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: TrackSectionStepRecord) => void;
}

const useCreateOrUpdateTrackSectionStep = (
    options?: UseCreateOrUpdateTrackSectionStepOptions
): UseMutationResult<TrackSectionStepRecord, Error, TrackSectionStep> => {
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();
    const { mutateAsync: createTrackSectionStep } = useCreateTrackSectionStep();
    const { mutateAsync: updateTrackSectionStep } = useUpdateTrackSectionStep();

    const createOrUpdate = async (trackSectionStep: TrackSectionStep) =>
        isNilOrEmpty(trackSectionStep.id) || isTemporaryId(trackSectionStep.id)
            ? createTrackSectionStep(trackSectionStep)
            : updateTrackSectionStep(trackSectionStep);

    const result = useMutation<TrackSectionStepRecord, Error, TrackSectionStep>(
        {
            fn: createOrUpdate,
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

export { useCreateOrUpdateTrackSectionStep };
