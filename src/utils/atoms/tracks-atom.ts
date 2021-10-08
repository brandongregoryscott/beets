import { atom, PrimitiveAtom } from "jotai";
import { TrackRecord } from "models/track-record";

const TracksAtom: PrimitiveAtom<Array<TrackRecord>> = atom<Array<TrackRecord>>([
    new TrackRecord(),
]);

export { TracksAtom };
