import { MigrationBuilder } from "node-pg-migrate";
import { configure } from "./utils/migration-builder-utils";
import { AuditableColumns } from "./enums/auditable-columns";
import { Tables } from "./enums/tables";

const tableName = Tables.Files;

const up = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });
};

const down = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });
};

export { up, down };
