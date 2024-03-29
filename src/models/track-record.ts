import { Record } from "immutable";
import { makeDefaultValues } from "utils/core-utils";
import { AuditableDefaultValues } from "constants/auditable-default-values";
import type { Track } from "generated/interfaces/track";
import type { RecordParams } from "types/record-params";
import { isNilOrEmpty } from "utils/collection-utils";
import { AuditableRecord } from "models/auditable-record";
import { generateId } from "utils/id-utils";

const defaultValues = makeDefaultValues<Track>({
    ...AuditableDefaultValues,
    index: 0,
    instrument_id: undefined,
    mute: false,
    name: "New Track",
    pan: 0,
    solo: false,
    project_id: undefined,
    volume: 0,
});

class TrackRecord
    extends AuditableRecord(Record(defaultValues))
    implements Track
{
    constructor(values?: RecordParams<TrackRecord>) {
        values = values ?? defaultValues;

        if (values instanceof TrackRecord) {
            values = values.toPOJO();
        }

        if (isNilOrEmpty(values?.id)) {
            values = { ...values, id: generateId() };
        }

        super(values);
    }

    public isInstrument(): boolean {
        return !isNilOrEmpty(this.instrument_id);
    }

    public isSequencer(): boolean {
        return !this.isInstrument();
    }
}

export { TrackRecord };
