import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { makeDefaultValues } from "utils/core-utils";
import { Track } from "generated/interfaces/track";
import { AuditableDefaultValues } from "constants/auditable-default-values";

const defaultValues = makeDefaultValues<Track>({
    ...AuditableDefaultValues,
    mute: false,
    name: "New Track",
    pan: 0,
    solo: false,
    project_id: undefined,
    volume: 0,
});

class TrackRecordV2 extends BaseRecord(Record(defaultValues)) implements Track {
    constructor(values?: Partial<Track>) {
        values = values ?? defaultValues;

        super(values);
    }
}

export { TrackRecordV2 };
