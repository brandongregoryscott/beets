import type { List } from "immutable";
import type { TrackSectionStepRecord } from "models/track-section-step-record";
import type { WorkstationStateRecord } from "models/workstation-state-record";
import { derivedAtomFactory } from "atoms/derived-atom-factory";
import {
    CurrentWorkstationStateAtom,
    InitialWorkstationStateAtom,
} from "atoms/workstation-atom";

const CurrentTrackSectionStepsAtom = derivedAtomFactory<
    WorkstationStateRecord,
    List<TrackSectionStepRecord>
>(CurrentWorkstationStateAtom, "trackSectionSteps");

const InitialTrackSectionStepsAtom = derivedAtomFactory<
    WorkstationStateRecord,
    List<TrackSectionStepRecord>
>(InitialWorkstationStateAtom, "trackSectionSteps");

export { CurrentTrackSectionStepsAtom, InitialTrackSectionStepsAtom };
