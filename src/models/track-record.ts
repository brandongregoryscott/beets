import { Record } from "immutable";
import { makeDefaultValues } from "utils/core-utils";
import { AuditableDefaultValues } from "constants/auditable-default-values";
import { Track } from "generated/interfaces/track";
import { RecordParams } from "types/record-params";
import { isNilOrEmpty } from "utils/collection-utils";
import { AuditableRecord } from "models/auditable-record";
import { generateId } from "utils/id-utils";
import { TrackType } from "generated/enums/track-type";

const defaultValues = makeDefaultValues<Track>({
    ...AuditableDefaultValues,
    index: 0,
    mute: false,
    name: "New Track",
    pan: 0,
    solo: false,
    project_id: undefined,
    type: TrackType.Sequencer,
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

    public isSequencer(): boolean {
        return this.type === TrackType.Sequencer;
    }
}

export { TrackRecord };
