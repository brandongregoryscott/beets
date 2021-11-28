import { useDeleteProject } from "generated/hooks/domain/projects/use-delete-project";
import { useDeleteTrackSectionStep } from "generated/hooks/domain/track-section-steps/use-delete-track-section-step";
import { useDeleteTrackSection } from "generated/hooks/domain/track-sections/use-delete-track-section";
import { useDeleteTrack } from "generated/hooks/domain/tracks/use-delete-track";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { useMutation } from "utils/hooks/use-mutation";

interface UseDeleteWorkstationStateOptions {
    onError?: (error: Error) => void;
    onSuccess?: () => void;
}

const useDeleteWorkstationState = (
    options?: UseDeleteWorkstationStateOptions
) => {
    const { onError, onSuccess } = options ?? {};
    const { mutateAsync: deleteProject } = useDeleteProject();
    const { mutateAsync: deleteTrack } = useDeleteTrack();
    const { mutateAsync: deleteTrackSection } = useDeleteTrackSection();
    const { mutateAsync: deleteTrackSectionStep } = useDeleteTrackSectionStep();

    const deleteFn = async (workstationState: WorkstationStateRecord) => {
        const { project, tracks, trackSections, trackSectionSteps } =
            workstationState;
        await Promise.all(
            trackSectionSteps
                .map((trackSectionStep) =>
                    deleteTrackSectionStep(trackSectionStep.id)
                )
                .concat(
                    trackSections.map((trackSection) =>
                        deleteTrackSection(trackSection.id)
                    )
                )
                .concat(tracks.map((track) => deleteTrack(track.id)))
                .concat(deleteProject(project.id))
        );
    };

    const result = useMutation({
        fn: deleteFn,
        onError,
        onSuccess,
    });

    return result;
};

export { useDeleteWorkstationState };
