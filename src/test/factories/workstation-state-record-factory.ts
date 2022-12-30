import { Factory } from "fishery";
import { faker } from "@faker-js/faker/locale/en";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { ProjectRecordFactory } from "test/factories/project-record-factory";
import { TrackRecordFactory } from "test/factories/track-record-factory";
import { TrackSectionRecordFactory } from "test/factories/track-section-record-factory";
import { TrackSectionStepRecordFactory } from "test/factories/track-section-step-record-factory";

const WorkstationStateRecordFactory = Factory.define<WorkstationStateRecord>(
    ({ sequence }) => {
        faker.seed(sequence);

        const project = ProjectRecordFactory.build();

        const tracks = TrackRecordFactory.buildList(2, undefined, {
            associations: { project_id: project.id },
        });

        const trackSections = tracks.flatMap((track) =>
            TrackSectionRecordFactory.buildList(2, undefined, {
                associations: { track_id: track.id },
            })
        );

        const trackSectionSteps = trackSections.flatMap((trackSection) =>
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
        });
    }
);

export { WorkstationStateRecordFactory };
