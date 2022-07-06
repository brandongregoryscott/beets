import type { Auditable } from "interfaces/auditable";
import type { RequiredOr } from "types/required-or";

const AuditableDefaultValues: RequiredOr<Auditable, undefined> = {
    id: undefined,
    created_on: undefined,
    created_by_id: undefined,
    deleted_on: undefined,
    deleted_by_id: undefined,
    updated_on: undefined,
    updated_by_id: undefined,
};

export { AuditableDefaultValues };
