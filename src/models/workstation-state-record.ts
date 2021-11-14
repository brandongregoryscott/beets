import { List, Record } from "immutable";
import { WorkstationState } from "interfaces/workstation-state";
import { BaseRecord } from "models/base-record";
import { ProjectRecord } from "models/project-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { makeDefaultValues } from "utils/core-utils";

const defaultValues = makeDefaultValues<WorkstationState>({
    project: new ProjectRecord(),
    tracks: List.of(new TrackRecord()),
    trackSections: List(),
    trackSectionSteps: List(),
});

class WorkstationStateRecord
    extends BaseRecord(Record(defaultValues))
    implements WorkstationState
{
    constructor(values?: Partial<WorkstationState>) {
        values = values ?? defaultValues;

        if (values.project != null) {
            values.project = new ProjectRecord(values.project);
        }

        if (values.tracks != null) {
            values.tracks = List(
                values.tracks.map((track) => new TrackRecord(track))
            );
        }

        if (values.trackSections != null) {
            values.trackSections = List(
                values.trackSections.map(
                    (trackSection) => new TrackSectionRecord(trackSection)
                )
            );
        }

        super(values);
    }
}

export { WorkstationStateRecord };
