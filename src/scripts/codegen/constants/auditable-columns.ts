import { keyMirror } from "../utils";

const AuditableColumns = keyMirror({
    created_on: null,
    created_by_id: null,
    deleted_on: null,
    deleted_by_id: null,
    updated_on: null,
    updated_by_id: null,
    id: null,
});

export { AuditableColumns };
