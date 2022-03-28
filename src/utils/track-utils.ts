import { List } from "immutable";
import { TrackRecord } from "models/track-record";

const unsoloAll = (tracks: List<TrackRecord>): List<TrackRecord> =>
    tracks.map((track) => track.merge({ solo: false }));

export { unsoloAll };
