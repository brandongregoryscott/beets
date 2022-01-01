import { List } from "immutable";
import _ from "lodash";
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { randomInt } from "utils/core-utils";
import { toSequencerStepTypes } from "utils/track-section-step-utils";

describe("TrackSectionStepUtils", () => {
    const files = List(
        _.range(0, 8).map(
            (index: number) => new FileRecord({ id: `file-${index}` })
        )
    );
    const notes = files.map((file) => file.getMidiNote());

    const buildTrackSectionStep = (trackSectionId: string, index: number) =>
        new TrackSectionStepRecord({
            file_id: files.get(index)?.id,
            index,
            track_section_id: trackSectionId,
        });

    const sumStepCount = (trackSections: List<TrackSectionRecord>): number =>
        _.sumBy(
            trackSections.toArray(),
            (trackSection) => trackSection.step_count
        );

    describe("toSequencerStepTypes", () => {
        it("returns sum of TrackSection.step_count", () => {
            // Arrange
            const trackSections = List(
                _.range(1, 5).map(
                    (index: number) =>
                        new TrackSectionRecord({
                            index,
                            step_count: randomInt(1, 8),
                        })
                )
            );

            // Act
            const result = toSequencerStepTypes(trackSections, List(), List());

            // Assert
            expect(result).toHaveLength(sumStepCount(trackSections));
        });

        it("given multiple TrackSections with varying TrackSectionSteps, it returns properly mapped StepNoteTypes", () => {
            // Arrange
            const trackSection1 = new TrackSectionRecord({
                index: 0,
                step_count: 8,
            });
            const trackSection1Steps = List(
                _.range(0, 8).map((index: number) =>
                    buildTrackSectionStep(trackSection1.id, index)
                )
            );

            const trackSection2 = new TrackSectionRecord({
                index: 1,
                step_count: 1,
            });
            const trackSection2Steps = List.of(
                buildTrackSectionStep(trackSection2.id, 0)
            );

            const trackSections = List.of(trackSection1, trackSection2);
            const trackSectionSteps =
                trackSection1Steps.concat(trackSection2Steps);

            // Act
            const result = toSequencerStepTypes(
                trackSections,
                trackSectionSteps,
                files
            );

            // Assert
            _.range(0, 8).map((index: number) => {
                expect(result[index]).toStrictEqual([
                    { name: notes.get(index) },
                ]);
            });
            expect(result[8]).toStrictEqual([{ name: notes.get(0) }]);
        });
    });
});
