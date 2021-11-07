import * as uuid from "uuid";
import { List, Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { initializeList, makeDefaultValues } from "utils/core-utils";
import { FileRecord } from "models/file-record";
import { Track } from "generated/interfaces/track";
import { AuditableDefaultValues } from "constants/auditable-default-values";

const defaultValues = makeDefaultValues<Track>({
    ...AuditableDefaultValues,
    id: undefined,
    mute: false,
    name: "New Track",
    pan: 0,
    solo: false,
    volume: 0,
});

class TrackRecordV2 extends BaseRecord(Record(defaultValues)) implements Track {
    constructor(values?: Partial<Track>) {
        values = values ?? defaultValues;

        super(values);
    }
}

export { TrackRecordV2 };
