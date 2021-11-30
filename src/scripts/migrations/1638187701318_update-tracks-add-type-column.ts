import { MigrationBuilder } from "@brandongregoryscott/node-pg-migrate";
import { Tables } from "./enums/tables";
import { TrackType } from "./enums/track-type";

const tableName = Tables.Tracks;

const up = (pgm: MigrationBuilder) => {
    pgm.addColumn(tableName, {
        type: {
            type: "integer",
            notNull: true,
            default: TrackType.Sequencer,
        },
    });
};

const down = (pgm: MigrationBuilder) => {
    pgm.dropColumn(tableName, "type");
};

export { up, down };
