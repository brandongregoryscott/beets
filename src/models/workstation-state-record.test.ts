import { faker } from "@faker-js/faker/locale/en";
import { List } from "immutable";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { TrackRecordFactory } from "test/factories/track-record-factory";
import { TrackSectionRecordFactory } from "test/factories/track-section-record-factory";
import { WorkstationStateRecordFactory } from "test/factories/workstation-state-record-factory";

describe(WorkstationStateRecord.name, () => {
    describe("getStepCount", () => {
        it("should return sum of all TrackSection stepCount values", () => {
            const stepCount = faker.datatype.number({ min: 1, max: 8 });
            const tracks = TrackRecordFactory.buildList(2);
            const trackSections = tracks.flatMap((track) =>
                TrackSectionRecordFactory.buildList(
                    5,
                    { step_count: stepCount },
                    {
                        associations: { track_id: track.id },
                    }
                )
            );

            const workstation = WorkstationStateRecordFactory.build({
                tracks: List(tracks),
                trackSections: List(trackSections),
            });
            const expected = trackSections.length * stepCount;

            const result = workstation.getStepCount();

            expect(result).toBe(expected);
        });

        it("should return 0 when no TrackSections exist", () => {
            const workstation = WorkstationStateRecordFactory.build({
                trackSections: List(),
            });

            const result = workstation.getStepCount();

            expect(result).toBe(0);
        });
    });
});
