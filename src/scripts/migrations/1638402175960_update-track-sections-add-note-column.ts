import { MigrationBuilder } from "node-pg-migrate";
import { Tables } from "./enums/tables";
import { configure } from "./utils/migration-builder-utils";

const tableName = Tables.TrackSectionSteps;
const columnName = "note";

const up = (pgm: MigrationBuilder) => {
    pgm.addColumn(tableName, {
        [columnName]: {
            type: "string",
            notNull: false,
            default: null,
        },
    });

    pgm.alterColumn(tableName, "file_id", { notNull: false });
};

const down = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });

    config.dropColumnIfExists(columnName);
    pgm.alterColumn(tableName, "file_id", {
        notNull: true,
    });
};

export { up, down };
