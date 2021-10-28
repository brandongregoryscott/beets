import { MigrationBuilder } from "node-pg-migrate";

const auditableColumns = {
    createdon: "createdon",
    createdbyid: "createdbyid",
    deletedon: "deletedon",
    deletedbyid: "deletedbyid",
    updatedon: "updatedon",
    updatedbyid: "updatedbyid",
};

const makeAuditableColumns = (pgm: MigrationBuilder) => ({
    [auditableColumns.createdon]: {
        type: "timestamptz",
        default: pgm.func("current_timestamp"),
    },
    [auditableColumns.createdbyid]: {
        type: "uuid",
        default: pgm.func("auth.uid()"),
    },
    [auditableColumns.deletedon]: {
        type: "timestamptz",
        default: null,
    },
    [auditableColumns.deletedbyid]: {
        type: "uuid",
        default: null,
    },
    [auditableColumns.updatedon]: {
        type: "timestamptz",
        default: null,
    },
    [auditableColumns.updatedbyid]: {
        type: "uuid",
        default: null,
    },
});

export { auditableColumns, makeAuditableColumns };
