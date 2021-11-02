import { MigrationBuilder } from "node-pg-migrate";
import { tables } from "./utils/tables";

const tableName = tables.projects;

const up = (pgm: MigrationBuilder) => {
    pgm.alterColumn(tableName, "id", {
        default: pgm.func("gen_random_uuid()"),
    });
};

const down = (pgm: MigrationBuilder) => {
    pgm.alterColumn(tableName, "id", { default: undefined });
};

export { up, down };
