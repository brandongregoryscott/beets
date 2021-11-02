import { MigrationBuilder } from "node-pg-migrate";
import { auditableColumns } from "./utils/auditable-columns";
import { tables } from "./utils/tables";

const up = (pgm: MigrationBuilder) => {
    Object.keys(tables).forEach((table) => {
        pgm.renameColumn(
            table,
            auditableColumns.created_on.replace(/_/g, ""),
            auditableColumns.created_on
        );
        pgm.renameColumn(
            table,
            auditableColumns.deleted_on.replace(/_/g, ""),
            auditableColumns.deleted_on
        );
        pgm.renameColumn(
            table,
            auditableColumns.updated_on.replace(/_/g, ""),
            auditableColumns.updated_on
        );
        pgm.renameColumn(
            table,
            auditableColumns.created_by_id.replace(/_/g, ""),
            auditableColumns.created_by_id
        );
        pgm.renameColumn(
            table,
            auditableColumns.deleted_by_id.replace(/_/g, ""),
            auditableColumns.deleted_by_id
        );
        pgm.renameColumn(
            table,
            auditableColumns.updated_by_id.replace(/_/g, ""),
            auditableColumns.updated_by_id
        );
    });
};

const down = (_pgm: MigrationBuilder) => {};

export { up, down };
