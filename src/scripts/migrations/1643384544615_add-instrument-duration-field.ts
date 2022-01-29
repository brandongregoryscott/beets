import { MigrationBuilder } from "node-pg-migrate";
import { Tables } from "./enums/tables";

const tableName = Tables.Instruments;

const up = (pgm: MigrationBuilder) => {
    pgm.addColumn(
        tableName,
        {
            duration: {
                default: null,
                notNull: false,
                type: "double",
            },
        },
        { ifNotExists: true }
    );
};

const down = (pgm: MigrationBuilder) => {
    pgm.dropColumn(tableName, "duration");
};

export { up, down };
