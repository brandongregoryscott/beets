import type { List } from "immutable";
import { sumBy } from "lodash";
import type { TrackRecord } from "models/track-record";
import type { TrackSectionRecord } from "models/track-section-record";
import { getByTrackId } from "utils/track-section-utils";

const getMaxStepCount = (
    tracks: List<TrackRecord>,
    trackSections: List<TrackSectionRecord>
): number => {
    // Calculate sum of steps by track
    const stepSums = tracks.map((track) => {
        const trackSectionsByTrack = getByTrackId(track.id, trackSections);
        return sumBy(
            trackSectionsByTrack.toArray(),
            (trackSection) => trackSection.step_count
        );
    });

    return stepSums.max() ?? 0;
};

const unsoloAll = (tracks: List<TrackRecord>): List<TrackRecord> =>
    tracks.map((track) => track.merge({ solo: false }));

export { getMaxStepCount, unsoloAll };
