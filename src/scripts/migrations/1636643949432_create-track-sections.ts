import { MigrationBuilder } from "node-pg-migrate";
import { configure } from "./utils/migration-builder-utils";
import { makeAuditableColumns } from "./utils/auditable-columns";
import { tables } from "./utils/tables";
import { makeIdColumn } from "./utils/id-column";

const tableName = tables.track_sections;

const up = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });

    pgm.createTable(tableName, {
        ...makeAuditableColumns(pgm),
        ...makeIdColumn(pgm),
        index: {
            type: "integer",
            notNull: true,
            default: 0,
        },
        step_count: {
            type: "integer",
            notNull: true,
            default: 0,
        },
        track_id: {
            type: "uuid",
            notNull: true,
            references: tables.tracks,
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
