import { MigrationBuilder } from "@brandongregoryscott/node-pg-migrate";
import { configure } from "./utils/migration-builder-utils";
import { makeAuditableColumns } from "./utils/auditable-columns";
import { Tables } from "./enums/tables";
import { makeIdColumn } from "./utils/id-column";

const tableName = Tables.TrackSectionSteps;

const up = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });

    pgm.createTable(tableName, {
        ...makeAuditableColumns(pgm),
        ...makeIdColumn(pgm),
        file_id: {
            type: "uuid",
            notNull: true,
            references: Tables.Files,
        },
        index: {
            type: "integer",
            notNull: true,
            default: 0,
        },
        track_section_id: {
            type: "uuid",
            notNull: true,
            references: Tables.TrackSections,
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
