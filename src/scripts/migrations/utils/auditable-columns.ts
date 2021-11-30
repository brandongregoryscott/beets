import { MigrationBuilder } from "@brandongregoryscott/node-pg-migrate";
import { AuditableColumns } from "../enums/auditable-columns";

const makeAuditableColumns = (pgm: MigrationBuilder) => ({
    [AuditableColumns.CreatedOn]: {
        type: "timestamptz",
        default: pgm.func("current_timestamp"),
    },
    [AuditableColumns.CreatedById]: {
        type: "uuid",
        default: pgm.func("auth.uid()"),
    },
    [AuditableColumns.DeletedOn]: {
        type: "timestamptz",
        default: null,
    },
    [AuditableColumns.DeletedById]: {
        type: "uuid",
        default: null,
    },
    [AuditableColumns.UpdatedOn]: {
        type: "timestamptz",
        default: null,
    },
    [AuditableColumns.UpdatedById]: {
        type: "uuid",
        default: null,
    },
});

export { makeAuditableColumns };
