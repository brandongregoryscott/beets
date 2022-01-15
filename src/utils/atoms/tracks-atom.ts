import { List } from "immutable";
import { atom, SetStateAction, WritableAtom } from "jotai";
import { isFunction } from "lodash";
import { TrackRecord } from "models/track-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import {
    CurrentWorkstationStateAtom,
    InitialWorkstationStateAtom,
} from "utils/atoms/workstation-state-atom";

const getTracksAtom = (
    workstationStateAtom: WritableAtom<
        WorkstationStateRecord,
        SetStateAction<WorkstationStateRecord>
    >
) =>
    atom<List<TrackRecord>, SetStateAction<List<TrackRecord>>>(
        (get) => get(workstationStateAtom).tracks,
        (get, set, updated) => {
            const prev = get(workstationStateAtom).tracks;
            const tracks = isFunction(updated) ? updated(prev) : updated;

            set(workstationStateAtom, (workstationState) =>
                workstationState.merge({ tracks })
            );
        }
    );

const CurrentTracksAtom = getTracksAtom(CurrentWorkstationStateAtom);

const InitialTracksAtom = getTracksAtom(InitialWorkstationStateAtom);

export { CurrentTracksAtom, InitialTracksAtom };
