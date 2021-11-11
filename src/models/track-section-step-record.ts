import { AuditableDefaultValues } from "constants/auditable-default-values";
import { TrackSectionStep } from "generated/interfaces/track-section-step";
import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { makeDefaultValues } from "utils/core-utils";

const defaultValues = makeDefaultValues<TrackSectionStep>({
    ...AuditableDefaultValues,
    file_id: undefined,
    index: 0,
    track_section_id: undefined,
});

class TrackSectionStepRecord
    extends BaseRecord(Record(defaultValues))
    implements TrackSectionStep
{
    constructor(values?: Partial<TrackSectionStep | TrackSectionStepRecord>) {
        values = values ?? defaultValues;

        if (values instanceof TrackSectionStepRecord) {
            values = values.toPOJO();
        }

        super(values);
    }
}

export { TrackSectionStepRecord };
