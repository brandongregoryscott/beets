import { MigrationBuilder } from "node-pg-migrate";
import { configure } from "./utils/migration-builder-utils";
import { makeAuditableColumns } from "./utils/auditable-columns";
import { makeIdColumn } from "./utils/id-column";
import { tables } from "./utils/tables";

const tableName = tables.tracks;

const up = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });

    pgm.createTable(tableName, {
        ...makeAuditableColumns(pgm),
        ...makeIdColumn(pgm),
        name: {
            type: "text",
            notNull: true,
        },
        mute: {
            type: "boolean",
            notNull: true,
            default: false,
        },
        solo: {
            type: "boolean",
            notNull: true,
            default: false,
        },
        pan: {
            type: "integer",
            notNull: true,
            default: 0,
        },
        project_id: {
            type: "uuid",
            notNull: true,
            references: tables.projects,
        },
        volume: {
            type: "integer",
            notNull: true,
            default: 0,
        },
    });

    config.uniqueNonDeletedIndex("id");

    config.rowLevelSecurity();
    config.softDeleteRule();

    config.authenticatedCreatePolicy();
    config.deleteOwnRecordPolicy();
    config.updateOwnRecordPolicy();
    config.readOwnRecordPolicy();
};

const down = (pgm: MigrationBuilder) => {
    pgm.dropTable(tableName);
};

export { up, down };
