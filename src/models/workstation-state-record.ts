import { List, Record } from "immutable";
import { WorkstationState } from "interfaces/workstation-state";
import { BaseRecord } from "models/base-record";
import { ProjectRecord } from "models/project-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { RecordParams } from "types/record-params";
import {
    diffDeletedEntities,
    diffUpdatedEntities,
} from "utils/collection-utils";
import { makeDefaultValues } from "utils/core-utils";

interface WorkstationStateDiff {
    createdOrUpdatedProject?: ProjectRecord;
    createdOrUpdatedTracks?: List<TrackRecord>;
    createdOrUpdatedTrackSections?: List<TrackSectionRecord>;
    createdOrUpdatedTrackSectionSteps?: List<TrackSectionStepRecord>;
    deletedTracks?: List<TrackRecord>;
    deletedTrackSections?: List<TrackSectionRecord>;
    deletedTrackSectionSteps?: List<TrackSectionStepRecord>;
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
    constructor(values?: RecordParams<WorkstationStateRecord>) {
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

        if (values.trackSectionSteps != null) {
            values.trackSectionSteps = List(
                values.trackSectionSteps.map(
                    (trackSectionStep) =>
                        new TrackSectionStepRecord(trackSectionStep)
                )
            );
        }

        super(values as WorkstationState);
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

        diff.createdOrUpdatedTrackSectionSteps = diffUpdatedEntities(
            right.trackSectionSteps,
            this.trackSectionSteps
        );

        diff.deletedTrackSectionSteps = diffDeletedEntities(
            this.trackSectionSteps,
            right.trackSectionSteps
        );

        return diff;
    }
}

export { WorkstationStateRecord };
