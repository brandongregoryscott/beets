import { MigrationBuilder } from "@brandongregoryscott/node-pg-migrate";
import { configure } from "./utils/migration-builder-utils";
import { auditableColumns } from "./utils/auditable-columns";
import { tables } from "./utils/tables";

const tableName = tables.files;

const up = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });
};

const down = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });
};

export { up, down };
