import { MigrationBuilder } from "node-pg-migrate";
import { Tables } from "./enums/tables";
import { configure } from "./utils/migration-builder-utils";

const columnName = "instrument_id";
const tableName = Tables.Tracks;

const up = (pgm: MigrationBuilder) => {
    pgm.addColumn(tableName, {
        [columnName]: {
            references: Tables.Instruments,
            type: "uuid",
        },
    });
};

const down = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });
    config.dropColumnIfExists(columnName);
};

export { up, down };
