import { MigrationBuilder } from "node-pg-migrate";
import { configure } from "./utils/migration-builder-utils";
import { makeAuditableColumns } from "./utils/auditable-columns";
import { tables } from "./utils/tables";
import { makeIdColumn } from "./utils/id-column";

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
        ...makeIdColumn(pgm),
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
