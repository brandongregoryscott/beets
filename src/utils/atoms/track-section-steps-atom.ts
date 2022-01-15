import { List } from "immutable";
import { atom, SetStateAction, WritableAtom } from "jotai";
import { isFunction } from "lodash";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import {
    CurrentWorkstationStateAtom,
    InitialWorkstationStateAtom,
} from "utils/atoms/workstation-state-atom";

const getTrackSectionStepsAtom = (
    workstationStateAtom: WritableAtom<
        WorkstationStateRecord,
        SetStateAction<WorkstationStateRecord>
    >
) =>
    atom<
        List<TrackSectionStepRecord>,
        SetStateAction<List<TrackSectionStepRecord>>
    >(
        (get) => get(workstationStateAtom).trackSectionSteps,
        (get, set, updated) => {
            const prev = get(workstationStateAtom).trackSectionSteps;
            const trackSectionSteps = isFunction(updated)
                ? updated(prev)
                : updated;

            set(workstationStateAtom, (workstationState) =>
                workstationState.merge({ trackSectionSteps })
            );
        }
    );

const CurrentTrackSectionStepsAtom = getTrackSectionStepsAtom(
    CurrentWorkstationStateAtom
);

const InitialTrackSectionStepsAtom = getTrackSectionStepsAtom(
    InitialWorkstationStateAtom
);

export { CurrentTrackSectionStepsAtom, InitialTrackSectionStepsAtom };
