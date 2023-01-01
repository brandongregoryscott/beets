import { List } from "immutable";
import { TrackRecordFactory } from "test/factories/track-record-factory";
import { TrackSectionRecordFactory } from "test/factories/track-section-record-factory";
import {
    fillWithPlaceholders,
    getCountByTrackId,
    getStepCountOffset,
} from "utils/track-section-utils";

describe("TrackSectionUtils", () => {
    describe("fillWithPlaceholders", () => {
        it("backfills smaller lists to match size of longest Track", () => {
            const { track: longestTrack, trackSections: longestTrackSections } =
                TrackRecordFactory.buildWithTrackSections({ count: 5 });
            const {
                tracks: shorterTracks,
                trackSections: shorterTrackSections,
            } = TrackRecordFactory.buildListWithTrackSections({
                count: 2,
                trackSectionCount: 4,
            });

            const result = fillWithPlaceholders(
                List.of(...longestTrackSections, ...shorterTrackSections)
            );

            expect(result).toHaveCount(
                (trackSection) => trackSection.track_id === longestTrack.id,
                longestTrackSections.length
            );
            expect(result).toHaveCount(
                (trackSection) => trackSection.track_id === shorterTracks[0].id,
                longestTrackSections.length
            );
            expect(result).toHaveCount(
                (trackSection) => trackSection.isPlaceholder(),
                2
            );
        });

        it("maintains index order", () => {
            const { track: longTrack, trackSections: longTrackSections } =
                TrackRecordFactory.buildWithTrackSections({ count: 5 });

            TrackSectionRecordFactory.rewindSequence();
            const { track: shortTrack, trackSections: shortTrackSections } =
                TrackRecordFactory.buildWithTrackSections({ count: 4 });

            const result = fillWithPlaceholders(
                List.of(...longTrackSections, ...shortTrackSections)
            );

            expect(result).toBeOrderedByIndex(
                (trackSection) => trackSection.track_id === longTrack.id
            );
            expect(result).toBeOrderedByIndex(
                (trackSection) => trackSection.track_id === shortTrack.id
            );
        });
    });

    describe("getMaxCountByTrackId", () => {
        it("should return count by trackId", () => {
            const { track: longTrack, trackSections: longTrackSections } =
                TrackRecordFactory.buildWithTrackSections({ count: 3 });
            const { track: shortTrack, trackSections: shortTrackSections } =
                TrackRecordFactory.buildWithTrackSections({ count: 1 });

            const results = [longTrack, shortTrack].map((track) =>
                getCountByTrackId(
                    List([...longTrackSections, ...shortTrackSections]),
                    track.id
                )
            );

            expect(results[0]).toBe(3);
            expect(results[1]).toBe(1);
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
