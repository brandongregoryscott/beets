import { List, Record } from "immutable";
import { WorkstationState } from "interfaces/workstation-state";
import _ from "lodash";
import { BaseRecord } from "models/base-record";
import { ProjectRecord } from "models/project-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { isTemporaryId, makeDefaultValues } from "utils/core-utils";

interface WorkstationStateDiff {
    createdOrUpdatedProject?: ProjectRecord;
    createdOrUpdatedTracks?: List<TrackRecord>;
    deletedTracks?: List<TrackRecord>;
}

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

    public diff(right: WorkstationStateRecord): WorkstationStateDiff {
        let diff: WorkstationStateDiff = {};

        if (!this.project.equals(right.project)) {
            diff.createdOrUpdatedProject = right.project;
        }

        if (!this.tracks.equals(right.tracks)) {
            const deletedTracks = _.differenceWith(
                // Ordering here matters (comparing left/initial side to right/updated)
                this.tracks.toArray(),
                right.tracks.toArray(),
                (a, b) => a.id === b.id
                // No need to delete tracks that were never persisted
            ).filter((track) => !isTemporaryId(track.id));

            const updatedTracks = _.differenceWith(
                // Ordering here matters (comparing right/updated side to left/initial)
                right.tracks.toArray(),
                this.tracks.toArray(),
                (a, b) => a.equals(b)
            );

            diff.createdOrUpdatedTracks = List(updatedTracks);
            diff.deletedTracks = List(deletedTracks);
        }

        return diff;
    }
}

export { WorkstationStateRecord };
