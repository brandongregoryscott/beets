import { Auditable } from "interfaces/auditable";

const AuditableDefaultValues: Auditable = {
    id: undefined as any,
    created_on: undefined,
    created_by_id: undefined,
    deleted_on: undefined,
    deleted_by_id: undefined,
    updated_on: undefined,
    updated_by_id: undefined,
};

export { AuditableDefaultValues };
