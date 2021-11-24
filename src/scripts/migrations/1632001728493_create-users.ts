import { MigrationBuilder } from "node-pg-migrate";
import { makeAuditableColumns } from "./utils/auditable-columns";
import { configure } from "./utils/migration-builder-utils";
import { tables } from "./utils/tables";

const tableName = tables.users;

const up = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });

    pgm.createTable(tableName, {
        ...makeAuditableColumns(pgm),
        id: {
            type: "uuid",
            notNull: true,
            primaryKey: true,
            references: "auth.users",
        },
        email: {
            type: "text",
            notNull: true,
        },
    });

    config.uniqueNonDeletedIndex("id", { dropFkConstraint: true }).up();

    config.rowLevelSecurity().up();
    config.softDeleteRule().up();
    config.updateTrigger().up();

    config.authenticatedCreatePolicy().up();
    config.updateOwnRecordPolicy().up();
    config.readAnyRecordPolicy().up();
};

const down = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });
    config.updateTrigger().down();

    pgm.dropTable(tableName);
};

export { down, up };
