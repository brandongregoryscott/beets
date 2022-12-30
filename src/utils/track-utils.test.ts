import { faker } from "@faker-js/faker/locale/en";
import { List } from "immutable";
import { TrackRecordFactory } from "test/factories/track-record-factory";
import { TrackSectionRecordFactory } from "test/factories/track-section-record-factory";
import { getMaxStepCount } from "utils/track-utils";

describe("TrackUtils", () => {
    describe(getMaxStepCount.name, () => {
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

            const result = getMaxStepCount(
                List.of(expectedTrack, unexpectedTrack),
                List.of(...expectedTrackSections, ...unexpectedTrackSections)
            );

            expect(result).toBe(expectedTrackSections.length * stepCount);
        });

        it("should return 0 when no TrackSections exist", () => {
            const tracks = List(TrackRecordFactory.buildList(2));

            const result = getMaxStepCount(tracks, List());

            expect(result).toBe(0);
        });
    });
});
