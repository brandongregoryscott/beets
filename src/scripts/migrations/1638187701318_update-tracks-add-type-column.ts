import { MigrationBuilder } from "@brandongregoryscott/node-pg-migrate";
import { tables } from "./utils/tables";
// import { TrackType } from "./utils/track-type";
import { TrackType } from "../../../src/enums/track-type";

const tableName = tables.files;

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
