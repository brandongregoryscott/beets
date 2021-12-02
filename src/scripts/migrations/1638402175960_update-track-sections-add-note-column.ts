import { MigrationBuilder } from "@brandongregoryscott/node-pg-migrate";
import { Tables } from "./enums/tables";

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
    pgm.alterColumn(tableName, "file_id", {
        notNull: false,
    });
};

const down = (pgm: MigrationBuilder) => {
    pgm.dropColumn(tableName, columnName);
    pgm.alterColumn(tableName, "file_id", {
        notNull: true,
    });
};

export { up, down };
