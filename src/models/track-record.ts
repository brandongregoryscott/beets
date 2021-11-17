import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import {
    getTemporaryId,
    isNilOrEmpty,
    isTemporaryId,
    makeDefaultValues,
} from "utils/core-utils";
import { AuditableDefaultValues } from "constants/auditable-default-values";
import { Track } from "generated/interfaces/track";

const defaultValues = makeDefaultValues<Track>({
    ...AuditableDefaultValues,
    mute: false,
    name: "New Track",
    pan: 0,
    solo: false,
    project_id: undefined,
    volume: 0,
});

class TrackRecord extends BaseRecord(Record(defaultValues)) implements Track {
    private temporaryId: string | undefined;

    constructor(values?: Partial<Track | TrackRecord>) {
        values = values ?? defaultValues;

        if (values instanceof TrackRecord) {
            values = values.toPOJO();
        }

        if (isNilOrEmpty(values.id)) {
            const id = getTemporaryId();
            values = { ...values, id };
        }

        super(values);

        if (isTemporaryId(this.id)) {
            this.temporaryId = this.id;
        }
    }

    public getTemporaryId(): string | undefined {
        return this.temporaryId;
    }

    public setTemporaryId(temporaryId: string | undefined): TrackRecord {
        this.temporaryId = temporaryId;
        return this;
    }
}

export { TrackRecord };
