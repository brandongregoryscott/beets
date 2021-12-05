import { List } from "immutable";
import _ from "lodash";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";

const getByTrack = (
    track: TrackRecord,
    trackSections: List<TrackSectionRecord>
): List<TrackSectionRecord> =>
    trackSections.filter((trackSection) => trackSection.track_id === track.id);

const getStepCountOffset = (
    trackSections: List<TrackSectionRecord>,
    index: number
): number => getTotalStepCount(trackSections.slice(0, index));

const getTotalStepCount = (trackSections: List<TrackSectionRecord>): number =>
    _.sumBy(trackSections.toArray(), (trackSection) => trackSection.step_count);

export { getByTrack, getStepCountOffset, getTotalStepCount };
