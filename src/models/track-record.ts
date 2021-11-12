import { List, Record } from "immutable";
import { BaseRecord } from "models/base-record";
import {
    getTemporaryId,
    isNilOrEmpty,
    makeDefaultValues,
} from "utils/core-utils";
import { AuditableDefaultValues } from "constants/auditable-default-values";
import { Track } from "generated/interfaces/track";
import { TrackSectionRecord } from "models/track-section-record";
import { SetStateAction } from "react";
import _ from "lodash";

const defaultValues = makeDefaultValues<Track>({
    ...AuditableDefaultValues,
    get id() {
        return getTemporaryId();
    },
    mute: false,
    name: "New Track",
    pan: 0,
    solo: false,
    project_id: undefined,
    volume: 0,
});

class TrackRecord extends BaseRecord(Record(defaultValues)) implements Track {
    private trackSections: List<TrackSectionRecord>;

    constructor(values?: Partial<Track | TrackRecord>) {
        values = values ?? defaultValues;

        if (values instanceof TrackRecord) {
            values = values.toPOJO();
        }

        super(values);

        this.trackSections = List([new TrackSectionRecord()]);
    }

    public addTrackSection(trackSection?: TrackSectionRecord): TrackRecord {
        const trackSections = this.trackSections.push(
            trackSection ?? new TrackSectionRecord()
        );
        return new TrackRecord(this).setTrackSection(trackSections);
    }

    public getTrackSection(id: string): TrackSectionRecord | undefined {
        return this.trackSections.find(
            (trackSection) => trackSection.id === id
        );
    }

    public getTrackSections(): List<TrackSectionRecord> {
        return this.trackSections;
    }

    public removeTrackSection(section: TrackSectionRecord): TrackRecord {
        const trackSections = this.trackSections.filterNot(
            (existingSection) => existingSection.id === section.id
        );

        return new TrackRecord(this).setTrackSection(trackSections);
    }

    public setTrackSection(
        trackSections: List<TrackSectionRecord> | TrackSectionRecord[]
    ): TrackRecord {
        this.trackSections = (
            List.isList(trackSections) ? trackSections : List(trackSections)
        ).filter(
            (trackSection) =>
                isNilOrEmpty(trackSection.track_id) ||
                trackSection.track_id === this.id
        );
        return this;
    }

    public updateTrackSection(
        id: string,
        update: SetStateAction<TrackSectionRecord>
    ): TrackRecord {
        const existing = this.getTrackSection(id);
        if (existing == null) {
            return this;
        }

        const index = this.trackSections.indexOf(existing);
        if (index < 0) {
            return this;
        }

        const updatedValue = _.isFunction(update) ? update(existing) : update;

        const trackSections = this.trackSections.set(
            index,
            existing.merge(updatedValue.toPOJO())
        );
        return new TrackRecord(this).setTrackSection(trackSections);
    }
}

export { TrackRecord };
