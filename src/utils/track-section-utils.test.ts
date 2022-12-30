import { List } from "immutable";
import { TrackRecordFactory } from "test/factories/track-record-factory";
import { TrackSectionRecordFactory } from "test/factories/track-section-record-factory";
import {
    getCountByTrackId,
    getStepCountOffset,
} from "utils/track-section-utils";

describe("TrackSectionUtils", () => {
    describe("getMaxCountByTrackId", () => {
        it("should return count by trackId", () => {
            const tracks = TrackRecordFactory.buildList(2);
            const trackSections = List(
                tracks.flatMap((track, index) =>
                    TrackSectionRecordFactory.buildList(
                        index % 2 === 0 ? 3 : 1,
                        undefined,
                        { associations: { track_id: track.id } }
                    )
                )
            );

            const results = tracks.map((track) =>
                getCountByTrackId(trackSections, track.id)
            );

            expect(results[0]).toBe(3);
            expect(results[0]).toBe(1);
        });
    });

    describe("getStepCountOffset", () => {
        test("given index, returns step_count sum of TrackSections prior", () => {
            // Arrange
            const trackSections = List.of(
                TrackSectionRecordFactory.build({
                    index: 0,
                    step_count: 8,
                }),
                TrackSectionRecordFactory.build({
                    index: 1,
                    step_count: 4,
                }),
                TrackSectionRecordFactory.build({
                    index: 2,
                    step_count: 8,
                })
            );

            // Act
            const result = getStepCountOffset(trackSections, 2);

            // Assert
            expect(result).toBe(12);
        });
    });
});
