import { List } from "immutable";
import { TrackRecord } from "models/track-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { derivedAtomFactory } from "utils/atoms/derived-atom-factory";
import {
    CurrentWorkstationStateAtom,
    InitialWorkstationStateAtom,
} from "utils/atoms/workstation-atom";

const CurrentTracksAtom = derivedAtomFactory<
    WorkstationStateRecord,
    List<TrackRecord>
>(CurrentWorkstationStateAtom, "tracks");

const InitialTracksAtom = derivedAtomFactory<
    WorkstationStateRecord,
    List<TrackRecord>
>(InitialWorkstationStateAtom, "tracks");

export { CurrentTracksAtom, InitialTracksAtom };
