import { AuditableDefaultValues } from "constants/auditable-default-values";
import { TrackSection } from "generated/interfaces/track-section";
import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { RecordParams } from "types/record-params";
import {
    getTemporaryId,
    isNilOrEmpty,
    isTemporaryId,
    makeDefaultValues,
} from "utils/core-utils";

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
    private temporaryId: string | undefined;

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

    public getTemporaryId(): string | undefined {
        return this.temporaryId;
    }

    public hasTrackId(): boolean {
        return !isNilOrEmpty(this.track_id) && !isTemporaryId(this.track_id);
    }

    public setTemporaryId(temporaryId: string | undefined): TrackSectionRecord {
        this.temporaryId = temporaryId;
        return this;
    }
}

export { TrackSectionRecord };
