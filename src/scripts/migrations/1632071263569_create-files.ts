import { MigrationBuilder } from "node-pg-migrate";
import { makeAuditableColumns } from "./utils/auditable-columns";
import { configure } from "./utils/migration-builder-utils";
import { tables } from "./utils/tables";

const up = (pgm: MigrationBuilder) => {
    const {
        deleteOwnRecordPolicy,
        softDeleteRule,
        uniqueNonDeletedIndex,
        rowLevelSecurity,
        authenticatedCreatePolicy,
        updateOwnRecordPolicy,
        readOwnRecordPolicy,
    } = configure({ pgm, tableName: tables.files });

    pgm.createTable(tables.files, {
        ...makeAuditableColumns(pgm),
        id: {
            type: "uuid",
            references: "storage.objects",
            notNull: true,
        },
        bucketid: {
            type: "text",
            references: "storage.buckets",
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

    uniqueNonDeletedIndex("id", { dropFkConstraint: true });

    rowLevelSecurity();
    softDeleteRule();

    authenticatedCreatePolicy();
    deleteOwnRecordPolicy();
    updateOwnRecordPolicy();
    readOwnRecordPolicy();
};

const down = (pgm: MigrationBuilder) => {
    pgm.dropTable(tables.files);
};

export { up, down };
