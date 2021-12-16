import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { makeDefaultValues } from "utils/core-utils";
import { RecordParams } from "types/record-params";
import { Instrument } from "generated/interfaces/instrument";
import { AuditableDefaultValues } from "constants/auditable-default-values";
import { InstrumentCurve } from "generated/enums/instrument-curve";

const defaultValues = makeDefaultValues<Instrument>({
    ...AuditableDefaultValues,
    curve: InstrumentCurve.Exponential,
    file_id: undefined,
    name: undefined,
    release: 0.1,
    root_note: undefined,
});

class InstrumentRecord
    extends BaseRecord(Record(defaultValues))
    implements Instrument
{
    public static defaultValues: Instrument = defaultValues;

    constructor(values?: RecordParams<InstrumentRecord>) {
        values = values ?? defaultValues;

        if (values instanceof InstrumentRecord) {
            values = values.toPOJO();
        }

        super(values);
    }
}

export { InstrumentRecord };
