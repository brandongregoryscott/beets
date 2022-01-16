import { List } from "immutable";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { derivedAtomFactory } from "utils/atoms/derived-atom-factory";
import {
    CurrentWorkstationStateAtom,
    InitialWorkstationStateAtom,
} from "utils/atoms/workstation-state-atom";

const CurrentTrackSectionStepsAtom = derivedAtomFactory<
    WorkstationStateRecord,
    List<TrackSectionStepRecord>
>(CurrentWorkstationStateAtom, "trackSectionSteps");

const InitialTrackSectionStepsAtom = derivedAtomFactory<
    WorkstationStateRecord,
    List<TrackSectionStepRecord>
>(InitialWorkstationStateAtom, "trackSectionSteps");

export { CurrentTrackSectionStepsAtom, InitialTrackSectionStepsAtom };
