import { MigrationBuilder } from "@brandongregoryscott/node-pg-migrate";
import { Tables } from "./enums/tables";
import { TrackType } from "./enums/track-type";

const tableName = Tables.Tracks;
const typeName = "TrackType";
const up = (pgm: MigrationBuilder) => {
    pgm.addType(typeName, Object.values(TrackType));
    pgm.addColumn(tableName, {
        type: {
            type: typeName,
            notNull: true,
            default: TrackType.Sequencer,
        },
    });
};

const down = (pgm: MigrationBuilder) => {
    pgm.dropType(typeName);
    pgm.dropColumn(tableName, "type");
};

export { up, down };
