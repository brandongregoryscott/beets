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
    private sections: List<TrackSectionRecord>;

    constructor(values?: Partial<Track | TrackRecord>) {
        values = values ?? defaultValues;

        if (values instanceof TrackRecord) {
            values = values.toPOJO();
        }

        super(values);

        this.sections = List([new TrackSectionRecord()]);
    }

    public addSection(section?: TrackSectionRecord): TrackRecord {
        const sections = this.sections.push(
            section ?? new TrackSectionRecord()
        );
        return new TrackRecord(this).setSections(sections);
    }

    public getSection(id: string): TrackSectionRecord | undefined {
        return this.sections.find((section) => section.id === id);
    }

    public getSections(): List<TrackSectionRecord> {
        return this.sections;
    }

    public removeSection(section: TrackSectionRecord): TrackRecord {
        const sections = this.sections.filterNot(
            (existingSection) => existingSection.id === section.id
        );

        return new TrackRecord(this).setSections(sections);
    }

    public setSections(
        sections: List<TrackSectionRecord> | TrackSectionRecord[]
    ): TrackRecord {
        this.sections = (
            List.isList(sections) ? sections : List(sections)
        ).filter(
            (section) =>
                isNilOrEmpty(section.track_id) || section.track_id === this.id
        );
        return this;
    }
}

export { TrackRecord };
