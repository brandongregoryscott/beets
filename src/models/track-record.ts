import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import {
    getTemporaryId,
    isTemporaryId,
    makeDefaultValues,
} from "utils/core-utils";
import { AuditableDefaultValues } from "constants/auditable-default-values";
import { Track } from "generated/interfaces/track";
import { RecordParams } from "types/record-params";
import { isNilOrEmpty } from "utils/collection-utils";
import { AuditableRecord } from "models/auditable-record";

const defaultValues = makeDefaultValues<Track>({
    ...AuditableDefaultValues,
    index: 0,
    mute: false,
    name: "New Track",
    pan: 0,
    solo: false,
    project_id: undefined,
    volume: 0,
});

class TrackRecord
    extends AuditableRecord(BaseRecord(Record(defaultValues)))
    implements Track
{
    constructor(values?: RecordParams<TrackRecord>) {
        values = values ?? defaultValues;

        if (values instanceof TrackRecord) {
            values = values.toPOJO();
        }

        if (isNilOrEmpty(values?.id)) {
            const id = getTemporaryId();
            values = { ...values, id };
        }

        super(values);

        if (isTemporaryId(this.id)) {
            this.temporaryId = this.id;
        }
    }
}

export { TrackRecord };
