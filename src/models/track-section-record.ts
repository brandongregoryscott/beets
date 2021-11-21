import { AuditableDefaultValues } from "constants/auditable-default-values";
import { TrackSection } from "generated/interfaces/track-section";
import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { RecordParams } from "types/record-params";
import { isNilOrEmpty } from "utils/collection-utils";
import {
    getTemporaryId,
    isTemporaryId,
    makeDefaultValues,
} from "utils/core-utils";
import { AuditableRecord } from "models/auditable-record";

const defaultValues = makeDefaultValues<TrackSection>({
    ...AuditableDefaultValues,
    index: 0,
    step_count: 16,
    track_id: undefined,
});

class TrackSectionRecord
    extends AuditableRecord(BaseRecord(Record(defaultValues)))
    implements TrackSection
{
    constructor(values?: RecordParams<TrackSectionRecord>) {
        values = values ?? defaultValues;

        if (values instanceof TrackSectionRecord) {
            values = values.toPOJO();
        }

        if (isNilOrEmpty(values?.id)) {
            values = { ...values, id: getTemporaryId() };
        }

        super(values);

        if (isTemporaryId(this.id)) {
            this.temporaryId = this.id;
        }
    }

    public hasTrackId(): boolean {
        return !isNilOrEmpty(this.track_id) && !isTemporaryId(this.track_id);
    }
}

export { TrackSectionRecord };
