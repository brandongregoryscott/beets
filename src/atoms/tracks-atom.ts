import type { List } from "immutable";
import type { TrackRecord } from "models/track-record";
import type { WorkstationStateRecord } from "models/workstation-state-record";
import { derivedAtomFactory } from "atoms/derived-atom-factory";
import {
    CurrentWorkstationStateAtom,
    InitialWorkstationStateAtom,
} from "atoms/workstation-atom";

const CurrentTracksAtom = derivedAtomFactory<
    WorkstationStateRecord,
    List<TrackRecord>
>(CurrentWorkstationStateAtom, "tracks");

const InitialTracksAtom = derivedAtomFactory<
    WorkstationStateRecord,
    List<TrackRecord>
>(InitialWorkstationStateAtom, "tracks");

export { CurrentTracksAtom, InitialTracksAtom };
