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
            const longestTrack = TrackRecordFactory.build();
            const longestTrackSections = TrackSectionRecordFactory.buildList(
                5,
                undefined,
                { associations: { track_id: longestTrack.id } }
            );
            TrackSectionRecordFactory.rewindSequence();
            const shorterTracks = TrackRecordFactory.buildList(2);
            const shorterTrackSections = shorterTracks.flatMap((track) => {
                TrackSectionRecordFactory.rewindSequence();
                return TrackSectionRecordFactory.buildList(4, undefined, {
                    associations: { track_id: track.id },
                });
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
    });

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
