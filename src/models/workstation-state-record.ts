import { List, Record } from "immutable";
import { WorkstationState } from "interfaces/workstation-state";
import _ from "lodash";
import { BaseRecord } from "models/base-record";
import { FileRecord } from "models/file-record";
import { ProjectRecord } from "models/project-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { Constructor } from "types/constructor";
import { RecordParams } from "types/record-params";
import {
    diffDeletedEntities,
    diffUpdatedEntities,
} from "utils/collection-utils";
import { makeDefaultValues } from "utils/core-utils";
import { FileUtils } from "utils/file-utils";

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

const demoId = "demo";

class WorkstationStateRecord
    extends BaseRecord(Record(defaultValues))
    implements WorkstationState
{
    public static demo(files?: List<FileRecord>): WorkstationStateRecord {
        const kick = FileUtils.findKick(files);
        const closedHat = FileUtils.findHat(files);
        const openHat = FileUtils.findOpenHat(files);
        const snare = FileUtils.findSnare(files);

        const project = new ProjectRecord().merge({
            id: getDemoId(ProjectRecord),
            name: "Demo Project",
            swing: 30,
        });

        const track = new TrackRecord().merge({
            id: getDemoId(TrackRecord),
            name: "Drums",
            project_id: project.id,
        });

        const trackSection = new TrackSectionRecord().merge({
            id: demoId,
            track_id: track.id,
        });

        const kickSteps = [
            new TrackSectionStepRecord({
                id: getDemoId(TrackSectionStepRecord, "kick", 0),
                index: 0,
                file_id: kick?.id,
                track_section_id: trackSection.id,
            }),
            new TrackSectionStepRecord({
                id: getDemoId(TrackSectionStepRecord, "kick", 5),
                index: 5,
                file_id: kick?.id,
                track_section_id: trackSection.id,
            }),
        ];
        const closedHatSteps = _.range(0, 6).map(
            (index: number) =>
                new TrackSectionStepRecord({
                    id: getDemoId(TrackSectionStepRecord, "closed-hat", index),
                    index,
                    file_id: closedHat?.id,
                    track_section_id: trackSection.id,
                })
        );
        const openHatStep = new TrackSectionStepRecord({
            id: getDemoId(TrackSectionStepRecord, "open-hat", 7),
            index: 7,
            file_id: openHat?.id,
            track_section_id: trackSection.id,
        });

        const snareSteps = [
            new TrackSectionStepRecord({
                id: getDemoId(TrackSectionStepRecord, "snare", 3),
                index: 2,
                file_id: snare?.id,
                track_section_id: trackSection.id,
            }),
            new TrackSectionStepRecord({
                id: getDemoId(TrackSectionStepRecord, "snare", 7),
                index: 6,
                file_id: snare?.id,
                track_section_id: trackSection.id,
            }),
        ];

        return new WorkstationStateRecord({
            project,
            tracks: List.of(track),
            trackSections: List.of(trackSection),
            trackSectionSteps: List.of(
                ...kickSteps,
                ...closedHatSteps,
                openHatStep,
                ...snareSteps
            ),
        });
    }

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

        if (!this.project.equals(right.project)) {
            diff.createdOrUpdatedProject = right.project;
        }

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

    public isDemo(): boolean {
        return this.project.id.includes(demoId);
    }
}

const getDemoId = (
    entity: Constructor,
    postfix?: string,
    index?: number
): string => [demoId, entity.name, postfix, index].join("-");

export { WorkstationStateRecord };
