import { List } from "immutable";
import { TrackSectionRecord } from "models/track-section-record";
import { getStepCountOffset } from "utils/track-section-utils";

describe("TrackSectionUtils", () => {
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
