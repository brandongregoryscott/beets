import { MigrationBuilder } from "@brandongregoryscott/node-pg-migrate";
import { Tables } from "./enums/tables";
import { configure } from "./utils/migration-builder-utils";

const tableName = Tables.TrackSectionSteps;
const columnName = "note";

const up = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });

    pgm.addColumn(tableName, {
        [columnName]: {
            type: "string",
            notNull: false,
            default: null,
        },
    });
    pgm.alterColumn(tableName, "file_id", { notNull: false });

    // Rules need to be recreated after columns are changed
    config.softDeleteRule().up();
};

const down = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });

    // Rule must be dropped before dropping column since it depends on it
    config.softDeleteRule().down();

    config.dropColumnIfExists(columnName);
    pgm.alterColumn(tableName, "file_id", {
        notNull: true,
    });
};

export { up, down };
