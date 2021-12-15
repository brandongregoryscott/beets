import { MigrationBuilder } from "node-pg-migrate";
import { makeAuditableColumns } from "./utils/auditable-columns";
import { configure } from "./utils/migration-builder-utils";
import { Tables } from "./enums/tables";

const tableName = Tables.Files;

const up = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });

    pgm.createTable(tableName, {
        ...makeAuditableColumns(pgm),
        id: {
            type: "uuid",
            references: {
                name: "objects",
                schema: "storage",
            },
            notNull: true,
            primaryKey: true,
        },
        bucket_id: {
            type: "text",
            references: {
                name: "buckets",
                schema: "storage",
            },
            notNull: true,
        },
        description: {
            type: "text",
        },
        name: {
            type: "text",
            notNull: true,
        },
        path: {
            type: "text",
            notNull: true,
        },
        size: {
            type: "bigint",
        },
        type: {
            type: "text",
            notNull: true,
        },
    });

    config.uniqueNonDeletedIndex("id", { dropFkConstraint: true }).up();

    config.rowLevelSecurity().up();
    config.softDeleteRule().up();
    config.updateTrigger().up();

    config.authenticatedCreatePolicy().up();
    config.deleteOwnRecordPolicy().up();
    config.updateOwnRecordPolicy().up();
    config.readOwnRecordPolicy().up();
};

const down = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });
    config.updateTrigger().down();

    pgm.dropTable(tableName);
};

export { up, down };
