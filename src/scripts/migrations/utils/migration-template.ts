import { MigrationBuilder } from "node-pg-migrate";
import { configure } from "./utils/migration-builder-utils";
import { auditableColumns } from "./utils/auditable-columns";

const tableName = "";

const up = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });
};

const down = (pgm: MigrationBuilder) => {};

export { up, down };
