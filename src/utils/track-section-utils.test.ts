import { List } from "immutable";
import { uniqueId } from "lodash";
import { TrackSectionRecord } from "models/track-section-record";
import {
    getCountByTrackId,
    getMaxCountByTrackId,
    getStepCountOffset,
} from "utils/track-section-utils";

describe("TrackSectionUtils", () => {
    describe("getMaxCountByTrackId", () => {
        it("should return count by trackId", () => {
            const track1Id = uniqueId();
            const track2Id = uniqueId();

            const trackSections = List.of(
                new TrackSectionRecord({ track_id: track1Id }),
                new TrackSectionRecord({ track_id: track1Id }),
                new TrackSectionRecord({ track_id: track1Id }),
                new TrackSectionRecord({ track_id: track2Id })
            );

            expect(getCountByTrackId(trackSections, track1Id)).toBe(3);
            expect(getCountByTrackId(trackSections, track2Id)).toBe(1);
        });
    });

    describe("getMaxCountByTrackId", () => {
        it("should return count for maximum count by trackId", () => {
            const track1Id = uniqueId();
            const track2Id = uniqueId();

            const result = getMaxCountByTrackId(
                List.of(
                    new TrackSectionRecord({ track_id: track1Id }),
                    new TrackSectionRecord({ track_id: track1Id }),
                    new TrackSectionRecord({ track_id: track1Id }),
                    new TrackSectionRecord({ track_id: track2Id })
                )
            );

            expect(result).toBe(3);
        });
    });

    describe("getStepCountOffset", () => {
        test("given index, returns step_count sum of TrackSections prior", () => {
            // Arrange
            const trackSections = List.of(
                new TrackSectionRecord({
                    index: 0,
                    step_count: 8,
                }),
                new TrackSectionRecord({
                    index: 1,
                    step_count: 4,
                }),
                new TrackSectionRecord({
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
