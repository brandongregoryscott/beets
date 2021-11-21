import { List } from "immutable";
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
};

export { TrackSectionUtils };
