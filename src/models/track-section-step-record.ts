import { AuditableDefaultValues } from "constants/auditable-default-values";
import { TrackSectionStep } from "generated/interfaces/track-section-step";
import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { RecordParams } from "types/record-params";
import { isNilOrEmpty } from "utils/collection-utils";
import { makeDefaultValues } from "utils/core-utils";
import { AuditableRecord } from "models/auditable-record";
import { generateId } from "utils/id-utils";

const defaultValues = makeDefaultValues<TrackSectionStep>({
    ...AuditableDefaultValues,
    file_id: undefined,
    index: 0,
    track_section_id: undefined,
});

class TrackSectionStepRecord
    extends AuditableRecord(BaseRecord(Record(defaultValues)))
    implements TrackSectionStep
{
    constructor(values?: RecordParams<TrackSectionStepRecord>) {
        values = values ?? defaultValues;

        if (values instanceof TrackSectionStepRecord) {
            values = values.toPOJO();
        }

        if (isNilOrEmpty(values.id)) {
            values = { ...values, id: generateId() };
        }

        super(values);
    }

    public hasTrackSectionId(): boolean {
        return !isNilOrEmpty(this.track_section_id);
    }
}

export { TrackSectionStepRecord };
