import { List, Map } from "immutable";
import _ from "lodash";
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { StepType } from "reactronica";
import {
    initializeList,
    intersectionWith,
    sortByIndex,
} from "utils/collection-utils";
import { FileUtils } from "utils/file-utils";
import { TrackSectionUtils } from "utils/track-section-utils";

const TrackSectionStepUtils = {
    toStepTypes(
        trackSections: List<TrackSectionRecord>,
        trackSectionSteps: List<TrackSectionStepRecord>,
        files: List<FileRecord>
    ): Array<StepType> {
        trackSections = sortByIndex(trackSections);
        trackSectionSteps = sortByIndex(trackSectionSteps);

        const total = _.sumBy(
            trackSections.toArray(),
            (trackSection) => trackSection.step_count
        );
        let steps = initializeList<StepType>(total, []);

        trackSections.forEach((trackSection) => {
            const trackSectionsStepsForTrackSection =
                TrackSectionUtils.getByTrackSection(
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

                const fileMap = Map(FileUtils.mapToMidiNotes(files));
                const midiNotes = filesForTrackSectionSteps
                    .map((file) => ({
                        name: fileMap.keyOf(file)!,
                    }))
                    .toArray();

                steps = steps.set(index, midiNotes as StepType);
            });
        });

        return steps.toArray();
    },
};

export { TrackSectionStepUtils };
