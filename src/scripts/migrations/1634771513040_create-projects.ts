import { MigrationBuilder } from "node-pg-migrate";
import { configure } from "./utils/migration-builder-utils";
import { makeAuditableColumns } from "./utils/auditable-columns";
import { Tables } from "./enums/tables";
import { makeIdColumn } from "./utils/id-column";

const tableName = Tables.Projects;

const up = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });

    pgm.createTable(tableName, {
        ...makeAuditableColumns(pgm),
        ...makeIdColumn(pgm),
        bpm: {
            type: "integer",
            notNull: true,
        },
        name: {
            type: "text",
            notNull: true,
        },
        swing: {
            type: "integer",
            notNull: true,
            default: 0,
        },
        volume: {
            type: "integer",
            notNull: true,
            default: 0,
        },
    });

    config.uniqueNonDeletedIndex("id").up();

    config.rowLevelSecurity().up();
    config.softDeleteTrigger().up();
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
