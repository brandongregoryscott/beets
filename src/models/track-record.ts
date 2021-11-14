import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import {
    getTemporaryId,
    isNilOrEmpty,
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
    constructor(values?: Partial<Track | TrackRecord>) {
        values = values ?? defaultValues;

        if (values instanceof TrackRecord) {
            values = values.toPOJO();
        }

        if (isNilOrEmpty(values.id)) {
            values = { ...values, id: getTemporaryId() };
        }

        super(values);
    }
}

export { TrackRecord };
