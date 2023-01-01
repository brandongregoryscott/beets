import { faker } from "@faker-js/faker/locale/en";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { ProjectRecordFactory } from "test/factories/project-record-factory";
import { TrackRecordFactory } from "test/factories/track-record-factory";
import { TrackSectionRecordFactory } from "test/factories/track-section-record-factory";
import { TrackSectionStepRecordFactory } from "test/factories/track-section-step-record-factory";
import { BaseFactory } from "test/factories/base-factory";

const WorkstationStateRecordFactory = new BaseFactory<WorkstationStateRecord>(
    ({ afterBuild, associations, sequence }) => {
        faker.seed(sequence);

        afterBuild((workstation) => workstation.asImmutable());

        const project = associations.project ?? ProjectRecordFactory.build();

        const tracks =
            associations.tracks?.toArray() ??
            TrackRecordFactory.buildList(2, undefined, {
                associations: { project_id: project.id },
            });

        const trackSections =
            associations.trackSections?.toArray() ??
            tracks.flatMap((track) =>
                TrackSectionRecordFactory.buildList(2, undefined, {
                    associations: { track_id: track.id },
                })
            );

        const trackSectionSteps =
            associations.trackSectionSteps?.toArray() ??
            trackSections.flatMap((trackSection) =>
                TrackSectionStepRecordFactory.buildList(
                    trackSection.step_count,
                    undefined,
                    {
                        associations: { track_section_id: trackSection.id },
                    }
                )
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
