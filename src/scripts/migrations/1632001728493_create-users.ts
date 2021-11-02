import { MigrationBuilder } from "node-pg-migrate";
import { makeAuditableColumns } from "./utils/auditable-columns";
import { configure } from "./utils/migration-builder-utils";
import { tables } from "./utils/tables";

const up = (pgm: MigrationBuilder) => {
    const {
        authenticatedCreatePolicy,
        readAnyRecordPolicy,
        updateOwnRecordPolicy,
        softDeleteRule,
        uniqueNonDeletedIndex,
        rowLevelSecurity,
    } = configure({ pgm, tableName: tables.users });

    pgm.createTable(tables.users, {
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

    uniqueNonDeletedIndex("id", { dropFkConstraint: true });

    rowLevelSecurity();
    softDeleteRule();

    authenticatedCreatePolicy();
    updateOwnRecordPolicy();
    readAnyRecordPolicy();
};

const down = (pgm: MigrationBuilder) => {
    pgm.dropTable(tables.users);
};

export { down, up };
