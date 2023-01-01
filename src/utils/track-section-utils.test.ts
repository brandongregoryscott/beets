import { faker } from "@faker-js/faker/locale/en";
import { List } from "immutable";
import { sum } from "lodash";
import { TrackRecordFactory } from "test/factories/track-record-factory";
import { TrackSectionRecordFactory } from "test/factories/track-section-record-factory";
import {
    fillWithPlaceholders,
    getCountByTrackId,
    getMaxStepCountByTrackId,
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

            TrackSectionRecordFactory.rewind();
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

        it("backfills smaller lists to match stepCount of longest Track", () => {
            const longerTrack = TrackRecordFactory.build();
            const longerTrackSections = TrackSectionRecordFactory.trackId(
                longerTrack.id
            ).buildList(4, {
                step_count: faker.datatype.number({ min: 8, max: 16 }),
            });

            const shorterTrack = TrackRecordFactory.build();
            const shorterTrackSections = TrackSectionRecordFactory.trackId(
                shorterTrack.id
            ).buildList(2, {
                step_count: faker.datatype.number({ min: 1, max: 4 }),
            });

            const result = fillWithPlaceholders([
                ...shorterTrackSections,
                ...longerTrackSections,
            ]);

            const longerTrackStepCount = sum(
                result
                    .filter(
                        (trackSection) =>
                            trackSection.track_id === longerTrack.id
                    )
                    .map((trackSection) => trackSection.step_count)
                    .toArray()
            );
            const shorterTrackStepCount = sum(
                result
                    .filter(
                        (trackSection) =>
                            trackSection.track_id === shorterTrack.id
                    )
                    .map((trackSection) => trackSection.step_count)
                    .toArray()
            );

            expect(shorterTrackStepCount).toBe(longerTrackStepCount);
        });
    });

    describe("getMaxCountByTrackId", () => {
        it("should return count by trackId", () => {
            const { track: longTrack, trackSections: longTrackSections } =
                TrackRecordFactory.buildWithTrackSections({ count: 3 });
            const { track: shortTrack, trackSections: shortTrackSections } =
                TrackRecordFactory.buildWithTrackSections({ count: 1 });
            const trackSections = List.of(
                ...longTrackSections,
                ...shortTrackSections
            );

            const longTrackResult = getCountByTrackId(
                trackSections,
                longTrack.id
            );
            const shortTrackResult = getCountByTrackId(
                trackSections,
                shortTrack.id
            );

            expect(longTrackResult).toBe(longTrackSections.length);
            expect(shortTrackResult).toBe(shortTrackSections.length);
        });
    });

    describe("getMaxStepCountByTrackId", () => {
        it("returns maximum sum of stepCount values for any Track", () => {
            const trackSections = List.of(
                TrackSectionRecordFactory.build({
                    step_count: 8,
                }),
                TrackSectionRecordFactory.build({
                    step_count: 4,
                }),
                TrackSectionRecordFactory.build({
                    step_count: 12,
                })
            );

            const result = getMaxStepCountByTrackId(trackSections);

            expect(result).toBe(12);
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
