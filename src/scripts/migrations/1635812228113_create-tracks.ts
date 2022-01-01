import { MigrationBuilder } from "node-pg-migrate";
import { configure } from "./utils/migration-builder-utils";
import { makeAuditableColumns } from "./utils/auditable-columns";
import { makeIdColumn } from "./utils/id-column";
import { Tables } from "./enums/tables";

const tableName = Tables.Tracks;

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
            references: Tables.Projects,
        },
        volume: {
            type: "integer",
            notNull: true,
            default: 0,
        },
    });

    config.uniqueNonDeletedIndex("id").up();

    config.rowLevelSecurity().up();
    config.softDeleteRule().up();
    config.updateTrigger().up();

    config.authenticatedCreatePolicy().up();
    config.deleteOwnRecordPolicy().up();
    config.updateOwnRecordPolicy().up();
    config.readOwnRecordPolicy().up();
};

const down = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });
    config.updateTrigger().down();

    pgm.dropTable(tableName);
};

export { up, down };
