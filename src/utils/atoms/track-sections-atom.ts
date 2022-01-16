import { List } from "immutable";
import { TrackSectionRecord } from "models/track-section-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { derivedAtomFactory } from "utils/atoms/derived-atom-factory";
import {
    CurrentWorkstationStateAtom,
    InitialWorkstationStateAtom,
} from "utils/atoms/workstation-atom";

const CurrentTrackSectionsAtom = derivedAtomFactory<
    WorkstationStateRecord,
    List<TrackSectionRecord>
>(CurrentWorkstationStateAtom, "trackSections");

const InitialTrackSectionsAtom = derivedAtomFactory<
    WorkstationStateRecord,
    List<TrackSectionRecord>
>(InitialWorkstationStateAtom, "trackSections");

export { CurrentTrackSectionsAtom, InitialTrackSectionsAtom };
