import { WorkstationStateRecord } from "models/workstation-state-record";
import { ProjectRecordFactory } from "test/factories/project-record-factory";
import { TrackRecordFactory } from "test/factories/track-record-factory";
import { TrackSectionRecordFactory } from "test/factories/track-section-record-factory";
import { TrackSectionStepRecordFactory } from "test/factories/track-section-step-record-factory";
import { BaseFactory } from "test/factories/base-factory";

const WorkstationStateRecordFactory = new BaseFactory<WorkstationStateRecord>(
    ({ associations }) => {
        const project = associations.project ?? ProjectRecordFactory.build();

        const tracks =
            associations.tracks?.toArray() ??
            TrackRecordFactory.projectId(project.id).buildList(2);

        const trackSections =
            associations.trackSections?.toArray() ??
            tracks.flatMap((track) =>
                TrackSectionRecordFactory.trackId(track.id).buildList(2)
            );

        const trackSectionSteps =
            associations.trackSectionSteps?.toArray() ??
            trackSections.flatMap((trackSection) =>
                TrackSectionStepRecordFactory.trackSectionId(
                    trackSection.id
                ).buildList(trackSection.step_count)
            );

        return new WorkstationStateRecord({
            project,
            tracks,
            trackSections,
            trackSectionSteps,
            // Factory-created Records need to be mutable for params/overrides to be set
            // Immutability is reset in the afterBuild hook
        }).asMutable();
    }
);

export { WorkstationStateRecordFactory };
