import { List } from "immutable";
import _ from "lodash";
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { MidiNote } from "types/midi-note";
import { initializeList, intersectionWith } from "utils/collection-utils";
import { getTotalStepCount } from "utils/track-section-utils";
import { InstrumentRecord } from "models/instrument-record";
import { ToneStep } from "interfaces/tone-step";
import { ToneStepGroup } from "interfaces/tone-step-group";

interface ClampIndexToRangeOptions {
    endIndex: number;
    index: number;
    startIndex?: number;
}

/**
 * Remaps the current index between the given range of indexes
 */

const clampIndexToRange = (options: ClampIndexToRangeOptions): number => {
    const { index, startIndex = 0, endIndex } = options;
    const result = index % (endIndex - startIndex + 1);
    return result + startIndex;
};

const getByTrackSection = (
    trackSection: TrackSectionRecord,
    trackSectionSteps: List<TrackSectionStepRecord>
): List<TrackSectionStepRecord> =>
    trackSectionSteps.filter(
        (trackSectionStep) =>
            trackSectionStep.track_section_id === trackSection.id
    );

const isSelected = (
    trackSectionSteps: List<TrackSectionStepRecord>,
    index: number,
    note: MidiNote
): boolean =>
    trackSectionSteps.some(
        (trackSectionStep) =>
            trackSectionStep.index === index && trackSectionStep.note === note
    );

const toInstrumentStepTypes = (
    trackSections: List<TrackSectionRecord>,
    trackSectionSteps: List<TrackSectionStepRecord>,
    instrument?: InstrumentRecord
): Array<ToneStepGroup> => {
    const total = getTotalStepCount(trackSections);
    let steps = initializeList<Array<ToneStep>>(total, []);
    let indexAccumulator = 0;

    trackSections.forEach((trackSection) => {
        const trackSectionsStepsForTrackSection = getByTrackSection(
            trackSection,
            trackSectionSteps
        );

        _.range(0, trackSection.step_count).forEach((index) => {
            const stepsByIndex = trackSectionsStepsForTrackSection.filter(
                (trackSectionStep) => trackSectionStep.index === index
            );

            if (stepsByIndex.isEmpty()) {
                return;
            }

            const midiNotes: ToneStep[] = stepsByIndex
                .map((trackSectionStep) => ({
                    note: trackSectionStep.note as MidiNote,
                    duration: instrument?.duration,
                }))
                .toArray();

            steps = steps.set(index + indexAccumulator, midiNotes);
        });

        indexAccumulator += trackSection.step_count;
    });

    return steps.map((steps, index) => ({ index, steps })).toArray();
};

const toSequencerStepTypes = (
    trackSections: List<TrackSectionRecord>,
    trackSectionSteps: List<TrackSectionStepRecord>,
    files: List<FileRecord>
): Array<ToneStepGroup> => {
    const total = getTotalStepCount(trackSections);
    let steps = initializeList<Array<ToneStep>>(total, []);
    let indexAccumulator = 0;

    trackSections.forEach((trackSection) => {
        const trackSectionsStepsForTrackSection = getByTrackSection(
            trackSection,
            trackSectionSteps
        );

        _.range(0, trackSection.step_count).forEach((index) => {
            const stepsByIndex = trackSectionsStepsForTrackSection.filter(
                (trackSectionStep) => trackSectionStep.index === index
            );

            if (stepsByIndex.isEmpty()) {
                return;
            }

            const filesForTrackSectionSteps = intersectionWith(
                files,
                stepsByIndex,
                (file, trackSection) => trackSection.file_id === file.id
            );

            const midiNotes: ToneStep[] = filesForTrackSectionSteps
                .map((file) => ({
                    note: file.getMidiNote(),
                }))
                .toArray();

            steps = steps.set(index + indexAccumulator, midiNotes);
        });

        indexAccumulator += trackSection.step_count;
    });

    return steps.map((steps, index) => ({ index, steps })).toArray();
};

export {
    clampIndexToRange,
    getByTrackSection,
    isSelected,
    toInstrumentStepTypes,
    toSequencerStepTypes,
};
export type { ClampIndexToRangeOptions };
