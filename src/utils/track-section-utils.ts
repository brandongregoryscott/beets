import type { List } from "immutable";
import { sumBy } from "lodash";
import type { TrackRecord } from "models/track-record";
import type { TrackSectionRecord } from "models/track-section-record";

const getByTrack = (
    track: TrackRecord,
    trackSections: List<TrackSectionRecord>
): List<TrackSectionRecord> =>
    trackSections.filter((trackSection) => trackSection.track_id === track.id);

const getMaxCountByTrackId = (
    trackSections: List<TrackSectionRecord>
): number =>
    trackSections.countBy((trackSection) => trackSection.track_id).max() ?? 0;

const getStepCountOffset = (
    trackSections: List<TrackSectionRecord>,
    index: number
): number => getTotalStepCount(trackSections.slice(0, index));

const getTotalStepCount = (trackSections: List<TrackSectionRecord>): number =>
    sumBy(trackSections.toArray(), (trackSection) => trackSection.step_count);

export {
    getByTrack,
    getStepCountOffset,
    getMaxCountByTrackId,
    getTotalStepCount,
};
