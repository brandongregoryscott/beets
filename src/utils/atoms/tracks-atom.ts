import { atom } from "jotai";
import { TrackRecord } from "models/track-record";

const TracksAtom = atom<Array<TrackRecord>>([new TrackRecord()]);

export { TracksAtom };
