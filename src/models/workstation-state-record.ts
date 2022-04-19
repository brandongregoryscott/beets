import { defaultNote } from "constants/midi-notes";
import { DemoInstrument } from "enums/demo-instrument";
import { List, Record } from "immutable";
import { WorkstationState } from "interfaces/workstation-state";
import _, { sumBy } from "lodash";
import { BaseRecord } from "models/base-record";
import { FileRecord } from "models/file-record";
import { ProjectRecord } from "models/project-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { Constructor } from "types/constructor";
import { RecordParams } from "types/record-params";
import { buildDemoInstruments } from "utils/build-demo-instruments";
import {
    diffDeletedEntities,
    diffUpdatedEntities,
    rebaseIndexes,
    sortBy,
} from "utils/collection-utils";
import { makeDefaultValues } from "utils/core-utils";
import { findKick, findHat, findOpenHat, findSnare } from "utils/file-utils";
import { getByTrack } from "utils/track-section-utils";

interface WorkstationStateDiff {
    createdOrUpdatedProject?: ProjectRecord;
    createdOrUpdatedTrackSectionSteps?: List<TrackSectionStepRecord>;
    createdOrUpdatedTrackSections?: List<TrackSectionRecord>;
    createdOrUpdatedTracks?: List<TrackRecord>;
    deletedTrackSectionSteps?: List<TrackSectionStepRecord>;
    deletedTrackSections?: List<TrackSectionRecord>;
    deletedTracks?: List<TrackRecord>;
}

const defaultValues = makeDefaultValues<WorkstationState>({
    project: undefined,
    tracks: List(),
    trackSections: List(),
    trackSectionSteps: List(),
});

const demoId = "demo";

class WorkstationStateRecord
    extends BaseRecord(Record(defaultValues))
    implements WorkstationState
{
    public static demoId: string = demoId;

    public static demo(files?: List<FileRecord>): WorkstationStateRecord {
        const instruments = buildDemoInstruments(files);
        const wavyPad = instruments.find(
            (instrument) => instrument.name === DemoInstrument.WavyPad
        );
        const kick = findKick(files);
        const closedHat = findHat(files);
        const openHat = findOpenHat(files);
        const snare = findSnare(files);

        const project = new ProjectRecord().merge({
            id: getDemoId(ProjectRecord),
            name: "Demo Project",
            swing: 30,
        });

        const drumTrack = new TrackRecord().merge({
            id: getDemoId(TrackRecord, undefined, 0),
            name: "Drums",
            project_id: project.id,
        });

        const padTrack = new TrackRecord().merge({
            id: getDemoId(TrackRecord, undefined, 1),
            name: DemoInstrument.WavyPad,
            project_id: project.id,
            instrument_id: wavyPad?.id,
        });

        const drumTrackSection = new TrackSectionRecord().merge({
            id: getDemoId(TrackSectionRecord, undefined, 0),
            track_id: drumTrack.id,
        });

        const padTrackSection = new TrackSectionRecord().merge({
            id: getDemoId(TrackSectionRecord, undefined, 1),
            track_id: padTrack.id,
        });

        const wavyPadStep = new TrackSectionStepRecord({
            id: getDemoId(TrackSectionStepRecord, undefined, 0),
            index: 0,
            file_id: wavyPad?.id,
            track_section_id: padTrackSection.id,
            note: defaultNote,
        });

        const kickSteps = [
            new TrackSectionStepRecord({
                id: getDemoId(TrackSectionStepRecord, "kick", 0),
                index: 0,
                file_id: kick?.id,
                track_section_id: drumTrackSection.id,
            }),
            new TrackSectionStepRecord({
                id: getDemoId(TrackSectionStepRecord, "kick", 5),
                index: 5,
                file_id: kick?.id,
                track_section_id: drumTrackSection.id,
            }),
        ];
        const closedHatSteps = _.range(0, 6).map(
            (index: number) =>
                new TrackSectionStepRecord({
                    id: getDemoId(TrackSectionStepRecord, "closed-hat", index),
                    index,
                    file_id: closedHat?.id,
                    track_section_id: drumTrackSection.id,
                })
        );
        const openHatStep = new TrackSectionStepRecord({
            id: getDemoId(TrackSectionStepRecord, "open-hat", 7),
            index: 7,
            file_id: openHat?.id,
            track_section_id: drumTrackSection.id,
        });

        const snareSteps = [
            new TrackSectionStepRecord({
                id: getDemoId(TrackSectionStepRecord, "snare", 3),
                index: 2,
                file_id: snare?.id,
                track_section_id: drumTrackSection.id,
            }),
            new TrackSectionStepRecord({
                id: getDemoId(TrackSectionStepRecord, "snare", 7),
                index: 6,
                file_id: snare?.id,
                track_section_id: drumTrackSection.id,
            }),
        ];

        return new WorkstationStateRecord({
            project,
            tracks: rebaseIndexes(List.of(drumTrack, padTrack)),
            trackSections: List.of(drumTrackSection, padTrackSection),
            trackSectionSteps: List.of(
                ...kickSteps,
                ...closedHatSteps,
                openHatStep,
                ...snareSteps,
                wavyPadStep
            ),
        });
    }

    constructor(values?: RecordParams<WorkstationStateRecord>) {
        const defaultProject = new ProjectRecord();
        const defaultTrack = new TrackRecord().merge({
            project_id: defaultProject.id,
        });
        const defaultTrackSection = new TrackSectionRecord().merge({
            track_id: defaultTrack.id,
        });
        values = values ?? {
            ...defaultValues,
            project: defaultProject,
            tracks: List.of(defaultTrack),
            trackSections: List.of(defaultTrackSection),
        };

        if (values.project != null) {
            values.project = new ProjectRecord(values.project);
        }

        if (values.tracks != null) {
            values.tracks = sortBy(
                values.tracks.map((track) => new TrackRecord(track)),
                (track) => track.index
            );
        }

        if (values.trackSections != null) {
            values.trackSections = sortBy(
                values.trackSections.map(
                    (trackSection) => new TrackSectionRecord(trackSection)
                ),
                ["track_id", "index"]
            );
        }

        if (values.trackSectionSteps != null) {
            values.trackSectionSteps = sortBy(
                values.trackSectionSteps.map(
                    (trackSectionStep) =>
                        new TrackSectionStepRecord(trackSectionStep)
                ),
                ["track_section_id", "index"]
            );
        }

        super(values as WorkstationState);
    }

    public diff(right: WorkstationStateRecord): WorkstationStateDiff {
        let diff: WorkstationStateDiff = {};

        if (
            !this.project.equals(right.project) ||
            !right.project.isPersisted()
        ) {
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

    public getLengthInMs(): number {
        const stepCount = this.getStepCount();
        const { bpm } = this.project;
        // Increment the step count to account for tail audio
        return 1000 * ((60 / bpm) * ((stepCount + 1) / 2));
    }

    public getStepCount(): number {
        // Calculate sum of steps by track
        const stepSums = this.tracks.map((track) => {
            const trackSections = getByTrack(track, this.trackSections);
            return sumBy(
                trackSections.toArray(),
                (trackSection) => trackSection.step_count
            );
        });

        return stepSums.max()!;
    }

    public isDemo(): boolean {
        return this.project.isDemo();
    }
}

const getDemoId = (
    entity: Constructor,
    postfix?: string,
    index?: number
): string => [demoId, entity.name, postfix, index].join("-");

export { WorkstationStateRecord };
