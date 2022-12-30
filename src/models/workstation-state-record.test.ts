import { faker } from "@faker-js/faker/locale/en";
import { List } from "immutable";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { TrackRecordFactory } from "test/factories/track-record-factory";
import { TrackSectionRecordFactory } from "test/factories/track-section-record-factory";
import { WorkstationStateRecordFactory } from "test/factories/workstation-state-record-factory";

describe(WorkstationStateRecord.name, () => {
    describe("getMaxStepCount", () => {
        it("should return max sum of TrackSection stepCount values by Track", () => {
            const expectedTrack = TrackRecordFactory.build();
            const stepCount = faker.datatype.number({ min: 1, max: 16 });
            const expectedTrackSections = TrackSectionRecordFactory.buildList(
                faker.datatype.number({ min: 2, max: 4 }),
                { step_count: stepCount },
                { associations: { track_id: expectedTrack.id } }
            );
            const unexpectedTrack = TrackRecordFactory.build();
            const unexpectedTrackSections = TrackSectionRecordFactory.buildList(
                expectedTrackSections.length - 1,
                { step_count: stepCount },
                { associations: { track_id: unexpectedTrack.id } }
            );
            const workstation = WorkstationStateRecordFactory.build({
                tracks: List.of(expectedTrack, unexpectedTrack),
                trackSections: List.of(
                    ...expectedTrackSections,
                    ...unexpectedTrackSections
                ),
            });

            const result = workstation.getMaxStepCount();

            expect(result).toBe(expectedTrackSections.length * stepCount);
        });

        it("should return 0 when no TrackSections exist", () => {
            const workstation = WorkstationStateRecordFactory.build({
                trackSections: List(),
            });

            const result = workstation.getMaxStepCount();

            expect(result).toBe(0);
        });
    });
});
