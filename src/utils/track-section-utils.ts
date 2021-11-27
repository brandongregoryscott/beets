import { List } from "immutable";
import _ from "lodash";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";

const TrackSectionUtils = {
    getByTrackSection(
        trackSection: TrackSectionRecord,
        trackSectionSteps: List<TrackSectionStepRecord>
    ): List<TrackSectionStepRecord> {
        return trackSectionSteps.filter(
            (trackSectionStep) =>
                trackSectionStep.track_section_id === trackSection.id
        );
    },
    getStepCountOffset(
        trackSections: List<TrackSectionRecord>,
        index: number
    ): number {
        const trackSectionsBefore = trackSections.slice(0, index);
        return _.sumBy(
            trackSectionsBefore.toArray(),
            (trackSection) => trackSection.step_count
        );
    },
};

export { TrackSectionUtils };
