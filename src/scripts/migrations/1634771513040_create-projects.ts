import { MigrationBuilder } from "node-pg-migrate";
import { configure } from "./utils/migration-builder-utils";
import { makeAuditableColumns } from "./utils/auditable-columns";
import { tables } from "./utils/tables";

const tableName = tables.projects;

const up = (pgm: MigrationBuilder) => {
    const {
        uniqueNonDeletedIndex,
        rowLevelSecurity,
        authenticatedCreatePolicy,
        updateOwnRecordPolicy,
        readOwnRecordPolicy,
        softDeleteRule,
        deleteOwnRecordPolicy,
    } = configure({ pgm, tableName });

    pgm.createTable(tableName, {
        ...makeAuditableColumns(pgm),
        id: {
            type: "uuid",
            primaryKey: true,
            notNull: true,
        },
        name: {
            type: "text",
            notNull: true,
        },
    });

    uniqueNonDeletedIndex("id");

    rowLevelSecurity();
    softDeleteRule();

    authenticatedCreatePolicy();
    deleteOwnRecordPolicy();
    updateOwnRecordPolicy();
    readOwnRecordPolicy();
};

const down = (pgm: MigrationBuilder) => {
    pgm.dropTable(tableName);
};

export { up, down };
