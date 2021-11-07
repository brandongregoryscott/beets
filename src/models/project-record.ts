import { Record as ImmutableRecord } from "immutable";
import { isNilOrEmpty, makeDefaultValues } from "utils/core-utils";
import { BaseRecord } from "models/base-record";
import { Project } from "generated/interfaces/project";
import { AuditableRecord } from "models/auditable-record";

const defaultValues = makeDefaultValues<Project>({
    created_by_id: undefined,
    created_on: undefined,
    deleted_by_id: undefined,
    deleted_on: undefined,
    id: undefined,
    name: "",
    updated_by_id: undefined,
    updated_on: undefined,
});

class ProjectRecord
    extends AuditableRecord(BaseRecord(ImmutableRecord(defaultValues)))
    implements Project
{
    public isPersisted(): boolean {
        return !isNilOrEmpty(this.id);
    }
}

export { ProjectRecord };
