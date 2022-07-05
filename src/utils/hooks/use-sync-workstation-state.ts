import { useCreateOrUpdateProject } from "generated/hooks/domain/projects/use-create-or-update-project";
import { useCreateOrUpdateTrackSectionStep } from "generated/hooks/domain/track-section-steps/use-create-or-update-track-section-step";
import { useDeleteTrackSectionStep } from "generated/hooks/domain/track-section-steps/use-delete-track-section-step";
import { useCreateOrUpdateTrackSection } from "generated/hooks/domain/track-sections/use-create-or-update-track-section";
import { useDeleteTrackSection } from "generated/hooks/domain/track-sections/use-delete-track-section";
import { useCreateOrUpdateTrack } from "generated/hooks/domain/tracks/use-create-or-update-track";
import { useDeleteTrack } from "generated/hooks/domain/tracks/use-delete-track";
import { ProjectRecord } from "models/project-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { hasValues } from "utils/collection-utils";
import { useMutation } from "utils/hooks/use-mutation";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { getWorkstationByProjectId } from "utils/queries/get-workstation-by-project-id";
import { isNotNilOrEmpty } from "utils/core-utils";
import { trackProjectCreated } from "utils/analytics-utils";

interface UseSyncWorkstationState {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: WorkstationStateRecord) => void;
}

const useSyncWorkstationState = (options?: UseSyncWorkstationState) => {
    const { onError, onSuccess } = options ?? {};
    const { mutateAsync: createOrUpdateProject } = useCreateOrUpdateProject();
    const { mutateAsync: createOrUpdateTrack } = useCreateOrUpdateTrack();
    const { mutateAsync: createOrUpdateTrackSection } =
        useCreateOrUpdateTrackSection();
    const { mutateAsync: createOrUpdateTrackSectionStep } =
        useCreateOrUpdateTrackSectionStep();
    const { mutateAsync: deleteTrack } = useDeleteTrack();
    const { mutateAsync: deleteTrackSection } = useDeleteTrackSection();
    const { mutateAsync: deleteTrackSectionStep } = useDeleteTrackSectionStep();
    const { initialState } = useWorkstationState();

    const sync = async (state: WorkstationStateRecord) => {
        const {
            createdOrUpdatedProject,
            createdOrUpdatedTracks,
            createdOrUpdatedTrackSections,
            createdOrUpdatedTrackSectionSteps,
            deletedTracks,
            deletedTrackSections,
            deletedTrackSectionSteps,
        } = initialState.diff(state);
        let project: ProjectRecord | undefined;

        if (createdOrUpdatedProject != null) {
            trackProjectCreated(createdOrUpdatedProject);
            project = await createOrUpdateProject(createdOrUpdatedProject);
        }

        const projectId = [
            state.project.id,
            initialState.project.id,
            project?.id,
        ].find(isNotNilOrEmpty)!;

        if (hasValues(createdOrUpdatedTracks)) {
            const tracks = createdOrUpdatedTracks.map((track) =>
                track.merge({ project_id: projectId })
            );

            await Promise.all(
                tracks.map((track) => createOrUpdateTrack(track))
            );
        }

        if (hasValues(deletedTracks)) {
            await Promise.all(
                deletedTracks.map((track) => deleteTrack(track.id))
            );
        }

        if (hasValues(createdOrUpdatedTrackSections)) {
            await Promise.all(
                createdOrUpdatedTrackSections.map((trackSection) =>
                    createOrUpdateTrackSection(trackSection)
                )
            );
        }

        if (hasValues(deletedTrackSections)) {
            await Promise.all(
                deletedTrackSections.map((trackSection) =>
                    deleteTrackSection(trackSection.id)
                )
            );
        }

        if (hasValues(createdOrUpdatedTrackSectionSteps)) {
            await Promise.all(
                createdOrUpdatedTrackSectionSteps.map((trackSectionStep) =>
                    createOrUpdateTrackSectionStep(trackSectionStep)
                )
            );
        }

        if (hasValues(deletedTrackSectionSteps)) {
            await Promise.all(
                deletedTrackSectionSteps.map((trackSectionStep) =>
                    deleteTrackSectionStep(trackSectionStep.id)
                )
            );
        }

        return getWorkstationByProjectId(projectId);
    };

    const result = useMutation({
        fn: sync,
        onError,
        onSuccess,
    });

    return result;
};

export { useSyncWorkstationState };
