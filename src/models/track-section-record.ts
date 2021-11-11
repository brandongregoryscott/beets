import { AuditableDefaultValues } from "constants/auditable-default-values";
import { TrackSection } from "generated/interfaces/track-section";
import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { makeDefaultValues } from "utils/core-utils";

const defaultValues = makeDefaultValues<TrackSection>({
    ...AuditableDefaultValues,
    index: 0,
    step_count: 16,
    track_id: undefined,
});

class TrackSectionRecord
    extends BaseRecord(Record(defaultValues))
    implements TrackSection
{
    constructor(values?: Partial<TrackSection | TrackSectionRecord>) {
        values = values ?? defaultValues;

        if (values instanceof TrackSectionRecord) {
            values = values.toPOJO();
        }

        super(values);
    }
}

export { TrackSectionRecord };
