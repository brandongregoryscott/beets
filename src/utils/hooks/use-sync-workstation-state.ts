import { useCreateOrUpdateProject } from "generated/hooks/domain/projects/use-create-or-update-project";
import { useCreateOrUpdateTrackSectionStep } from "generated/hooks/domain/track-section-steps/use-create-or-update-track-section-step";
import { useDeleteTrackSectionStep } from "generated/hooks/domain/track-section-steps/use-delete-track-section-step";
import { useCreateOrUpdateTrackSection } from "generated/hooks/domain/track-sections/use-create-or-update-track-section";
import { useDeleteTrackSection } from "generated/hooks/domain/track-sections/use-delete-track-section";
import { useCreateOrUpdateTrack } from "generated/hooks/domain/tracks/use-create-or-update-track";
import { useDeleteTrack } from "generated/hooks/domain/tracks/use-delete-track";
import { List } from "immutable";
import { ProjectRecord } from "models/project-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { hasValues, isNilOrEmpty } from "utils/collection-utils";
import { isTemporaryId } from "utils/core-utils";
import { useMutation } from "utils/hooks/use-mutation";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { getWorkstationByProjectId } from "utils/queries/get-workstation-by-project-id";

interface UseSyncWorkstationState {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: WorkstationStateRecord) => void;
}

const MissingProjectIdError = new Error(
    "ProjectId was not found on new Tracks"
);
const UnmatchedTemporaryIdError = new Error(
    "Entity could not be matched by temporaryId"
);

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
    const { initialState, state } = useWorkstationState();

    const sync = async () => {
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
        let tracks: List<TrackRecord> | undefined;
        let trackSections: List<TrackSectionRecord> | undefined;
        let trackSectionSteps: List<TrackSectionStepRecord> | undefined;

        if (createdOrUpdatedProject != null) {
            project = await createOrUpdateProject(createdOrUpdatedProject);
        }

        const projectId = [
            state.project.id,
            initialState.project.id,
            project?.id,
        ].find((id?: string) => !isNilOrEmpty(id) && !isTemporaryId(id))!;

        if (hasValues(createdOrUpdatedTracks)) {
            tracks = List(createdOrUpdatedTracks);

            const hasMissingProjectIds = tracks.some((track) =>
                isNilOrEmpty(track.project_id)
            );
            const projectIdFound = !isNilOrEmpty(projectId);
            if (hasMissingProjectIds && !projectIdFound) {
                throw MissingProjectIdError;
            }

            if (hasMissingProjectIds) {
                tracks = tracks.map((track) =>
                    track.merge({ project_id: projectId })
                );
            }

            tracks = List(
                await Promise.all(
                    tracks.map(async (track) => {
                        const result = await createOrUpdateTrack(track);

                        return result.setTemporaryId(track.getTemporaryId());
                    })
                )
            );
        }

        if (hasValues(deletedTracks)) {
            await Promise.all(
                deletedTracks.map((track) => deleteTrack(track.id))
            );
        }

        if (hasValues(createdOrUpdatedTrackSections)) {
            trackSections = List(createdOrUpdatedTrackSections);
            const hasMissingTrackId = trackSections.some(
                (trackSection) => !trackSection.hasTrackId()
            );

            if (hasMissingTrackId) {
                trackSections = trackSections.map((trackSection) => {
                    if (trackSection.hasTrackId()) {
                        return trackSection;
                    }

                    const originalTrack = tracks?.find(
                        (track) =>
                            track.getTemporaryId() === trackSection.track_id
                    );

                    if (originalTrack == null) {
                        throw UnmatchedTemporaryIdError;
                    }

                    return trackSection.merge({ track_id: originalTrack?.id });
                });
            }

            trackSections = List(
                await Promise.all(
                    trackSections.map(async (trackSection) => {
                        const result = await createOrUpdateTrackSection(
                            trackSection
                        );

                        return result.setTemporaryId(
                            trackSection.getTemporaryId()
                        );
                    })
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
            trackSectionSteps = List(createdOrUpdatedTrackSectionSteps);
            const hasMissingTrackSectionId = trackSectionSteps.some(
                (trackSectionStep) => !trackSectionStep.hasTrackSectionId()
            );

            if (hasMissingTrackSectionId) {
                trackSectionSteps = trackSectionSteps.map(
                    (trackSectionStep) => {
                        if (trackSectionStep.hasTrackSectionId()) {
                            return trackSectionStep;
                        }

                        const originalTrackSection = trackSections?.find(
                            (trackSection) =>
                                trackSection.getTemporaryId() ===
                                trackSectionStep.track_section_id
                        );

                        if (originalTrackSection == null) {
                            throw UnmatchedTemporaryIdError;
                        }

                        return trackSectionStep.merge({
                            track_section_id: originalTrackSection?.id,
                        });
                    }
                );
            }

            trackSectionSteps = List(
                await Promise.all(
                    trackSectionSteps.map((trackSectionStep) =>
                        createOrUpdateTrackSectionStep(trackSectionStep)
                    )
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
