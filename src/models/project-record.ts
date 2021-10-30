import { Record as ImmutableRecord } from "immutable";
import { makeDefaultValues } from "utils/core-utils";
import { BaseRecord } from "models/base-record";
import { Project } from "generated/interfaces/project";
import { AuditableRecord } from "models/auditable-record";

const defaultValues = makeDefaultValues<Project>({
    createdbyid: undefined,
    createdon: undefined,
    deletedbyid: undefined,
    deletedon: undefined,
    id: undefined,
    name: "",
    updatedbyid: undefined,
    updatedon: undefined,
});

class ProjectRecord
    extends AuditableRecord(BaseRecord(ImmutableRecord(defaultValues)))
    implements Project {}

export { ProjectRecord };
