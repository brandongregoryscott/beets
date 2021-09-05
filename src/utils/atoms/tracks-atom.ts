import { Track } from "interfaces/track";
import { atom } from "jotai";
import { newTrack } from "utils/new-track";

const TracksAtom = atom<Array<Track>>([newTrack()]);

export { TracksAtom };
