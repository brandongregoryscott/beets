import { MigrationBuilder } from "@brandongregoryscott/node-pg-migrate";
import { Tables } from "./enums/tables";
import { configure } from "./utils/migration-builder-utils";

enum TrackType {
    Sequencer = "sequencer",
    Instrument = "instrument",
}

const columnName = "type";
const tableName = Tables.Tracks;
const typeName = "TrackType";

const up = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });

    pgm.dropType(typeName, { ifExists: true });
    pgm.addType(typeName, Object.values(TrackType));
    pgm.addColumn(tableName, {
        [columnName]: {
            default: TrackType.Sequencer,
            notNull: true,
            onDelete: "NO ACTION",
            type: typeName,
        },
    });

    // Rules need to be recreated after columns are changed
    config.softDeleteRule().up();
};

const down = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });

    // Rule must be dropped before dropping column since it depends on it
    config.softDeleteRule().down();

    config.dropColumnIfExists(columnName);
    pgm.dropType(typeName, { ifExists: true });
};

export { up, down };
