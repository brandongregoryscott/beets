import { MigrationBuilder } from "@brandongregoryscott/node-pg-migrate";

const auditableColumns = {
    created_on: "created_on",
    created_by_id: "created_by_id",
    deleted_on: "deleted_on",
    deleted_by_id: "deleted_by_id",
    updated_on: "updated_on",
    updated_by_id: "updated_by_id",
};

const makeAuditableColumns = (pgm: MigrationBuilder) => ({
    [auditableColumns.created_on]: {
        type: "timestamptz",
        default: pgm.func("current_timestamp"),
    },
    [auditableColumns.created_by_id]: {
        type: "uuid",
        default: pgm.func("auth.uid()"),
    },
    [auditableColumns.deleted_on]: {
        type: "timestamptz",
        default: null,
    },
    [auditableColumns.deleted_by_id]: {
        type: "uuid",
        default: null,
    },
    [auditableColumns.updated_on]: {
        type: "timestamptz",
        default: null,
    },
    [auditableColumns.updated_by_id]: {
        type: "uuid",
        default: null,
    },
});

export { auditableColumns, makeAuditableColumns };
