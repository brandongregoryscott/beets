import { MigrationBuilder } from "node-pg-migrate";
import { Tables } from "./enums/tables";

const up = (pgm: MigrationBuilder) => {
    Object.values(Tables).forEach((table) => {
        pgm.sql(`DROP RULE IF EXISTS "SOFT DELETE" ON "${table}"`);
    });
};

const down = (pgm: MigrationBuilder) => {};

export { up, down };
