import { TrackSectionRecord } from "models/track-section-record";
import { TrackSection } from "generated/interfaces/track-section";
import { Tables } from "generated/enums/tables";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";
import { isTemporaryId } from "utils/core-utils";
import { isNilOrEmpty } from "utils/collection-utils";
import { useCreateTrackSection } from "generated/hooks/domain/track-sections/use-create-track-section";
import { useUpdateTrackSection } from "generated/hooks/domain/track-sections/use-update-track-section";

interface UseCreateOrUpdateTrackSectionOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: TrackSectionRecord) => void;
}

const useCreateOrUpdateTrackSection = (
    options?: UseCreateOrUpdateTrackSectionOptions
): UseMutationResult<TrackSectionRecord, Error, TrackSection> => {
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();
    const { mutateAsync: createTrackSection } = useCreateTrackSection();
    const { mutateAsync: updateTrackSection } = useUpdateTrackSection();

    const createOrUpdate = async (trackSection: TrackSection) =>
        isNilOrEmpty(trackSection.id) || isTemporaryId(trackSection.id)
            ? createTrackSection(trackSection)
            : updateTrackSection(trackSection);

    const result = useMutation<TrackSectionRecord, Error, TrackSection>({
        fn: createOrUpdate,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.TrackSections]);
        },
    });

    return result;
};

export { useCreateOrUpdateTrackSection };
