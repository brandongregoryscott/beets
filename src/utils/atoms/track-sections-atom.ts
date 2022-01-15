import { List } from "immutable";
import { atom, SetStateAction, WritableAtom } from "jotai";
import { isFunction } from "lodash";
import { TrackSectionRecord } from "models/track-section-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import {
    CurrentWorkstationStateAtom,
    InitialWorkstationStateAtom,
} from "utils/atoms/workstation-state-atom";

const getTrackSectionsAtom = (
    workstationStateAtom: WritableAtom<
        WorkstationStateRecord,
        SetStateAction<WorkstationStateRecord>
    >
) =>
    atom<List<TrackSectionRecord>, SetStateAction<List<TrackSectionRecord>>>(
        (get) => get(workstationStateAtom).trackSections,
        (get, set, updated) => {
            const prev = get(workstationStateAtom).trackSections;
            const trackSections = isFunction(updated) ? updated(prev) : updated;

            set(workstationStateAtom, (workstationState) =>
                workstationState.merge({ trackSections })
            );
        }
    );

const CurrentTrackSectionsAtom = getTrackSectionsAtom(
    CurrentWorkstationStateAtom
);

const InitialTrackSectionsAtom = getTrackSectionsAtom(
    InitialWorkstationStateAtom
);

export { CurrentTrackSectionsAtom, InitialTrackSectionsAtom };
