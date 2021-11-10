import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { getTemporaryId, makeDefaultValues } from "utils/core-utils";
import { AuditableDefaultValues } from "constants/auditable-default-values";
import { Track } from "generated/interfaces/track";

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
    constructor(values?: Partial<Track>) {
        values = values ?? defaultValues;

        super(values);
    }
}

export { TrackRecord };
