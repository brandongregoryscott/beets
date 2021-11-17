import { List, Record } from "immutable";
import { WorkstationState } from "interfaces/workstation-state";
import { BaseRecord } from "models/base-record";
import { ProjectRecord } from "models/project-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import {
    diffDeletedEntities,
    diffUpdatedEntities,
    makeDefaultValues,
} from "utils/core-utils";

interface WorkstationStateDiff {
    createdOrUpdatedProject?: ProjectRecord;
    createdOrUpdatedTracks?: List<TrackRecord>;
    createdOrUpdatedTrackSections?: List<TrackSectionRecord>;
    deletedTracks?: List<TrackRecord>;
    deletedTrackSections?: List<TrackSectionRecord>;
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

        diff.createdOrUpdatedProject = right.project;
        diff.createdOrUpdatedTracks = diffUpdatedEntities(
            right.tracks,
            this.tracks
        );

        diff.deletedTracks = diffDeletedEntities(this.tracks, right.tracks);

        diff.createdOrUpdatedTrackSections = diffUpdatedEntities(
            right.trackSections,
            this.trackSections
        );

        diff.deletedTrackSections = diffDeletedEntities(
            this.trackSections,
            right.trackSections
        );

        return diff;
    }
}

export { WorkstationStateRecord };
