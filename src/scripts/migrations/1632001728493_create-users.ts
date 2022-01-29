import { MigrationBuilder } from "node-pg-migrate";
import { makeAuditableColumns } from "./utils/auditable-columns";
import { configure } from "./utils/migration-builder-utils";
import { Tables } from "./enums/tables";
import { quote } from "./utils/quote";

const tableName = Tables.Users;

const up = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });

    pgm.createTable(tableName, {
        ...makeAuditableColumns(pgm),
        id: {
            type: "uuid",
            notNull: true,
            primaryKey: true,
            references: {
                name: "users",
                schema: "auth",
            },
        },
        email: {
            type: "text",
            notNull: true,
        },
    });

    config.uniqueNonDeletedIndex("id", { dropFkConstraint: true }).up();

    config.rowLevelSecurity().up();
    config.softDeleteTrigger().up();
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
