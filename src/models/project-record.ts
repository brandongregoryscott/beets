import { Record as ImmutableRecord } from "immutable";
import { isNilOrEmpty, makeDefaultValues } from "utils/core-utils";
import { Project } from "generated/interfaces/project";
import { AuditableRecord } from "models/auditable-record";
import { AuditableDefaultValues } from "constants/auditable-default-values";
import { RecordParams } from "types/record-params";
import { generateId } from "utils/id-utils";

const defaultValues = makeDefaultValues<Project>({
    ...AuditableDefaultValues,
    bpm: 80,
    name: "",
    swing: 0,
    volume: 0,
});

class ProjectRecord
    extends AuditableRecord(ImmutableRecord(defaultValues))
    implements Project
{
    constructor(values?: RecordParams<ProjectRecord>) {
        values = values ?? defaultValues;

        if (values instanceof ProjectRecord) {
            values = values.toPOJO();
        }

        if (isNilOrEmpty(values?.id)) {
            values = { ...values, id: generateId() };
        }

        super(values);
    }
}

export { ProjectRecord };
