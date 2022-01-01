import { AuditableDefaultValues } from "constants/auditable-default-values";
import { TrackSection } from "generated/interfaces/track-section";
import { Record } from "immutable";
import { RecordParams } from "types/record-params";
import { isNilOrEmpty } from "utils/collection-utils";
import { makeDefaultValues } from "utils/core-utils";
import { AuditableRecord } from "models/auditable-record";
import { generateId } from "utils/id-utils";

const defaultValues = makeDefaultValues<TrackSection>({
    ...AuditableDefaultValues,
    index: 0,
    step_count: 8,
    track_id: undefined,
});

class TrackSectionRecord
    extends AuditableRecord(Record(defaultValues))
    implements TrackSection
{
    public static defaultValues: TrackSection = defaultValues;
    public static maxStepCount: number = 16;

    constructor(values?: RecordParams<TrackSectionRecord>) {
        values = values ?? defaultValues;

        if (values instanceof TrackSectionRecord) {
            values = values.toPOJO();
        }

        if (isNilOrEmpty(values?.id)) {
            values = { ...values, id: generateId() };
        }

        super(values);
    }
}

export { TrackSectionRecord };
