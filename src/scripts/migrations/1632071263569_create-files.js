const { configure } = require("./utils/pgm-utils");
const { makeAuditableColumns } = require("./utils/auditable-columns");
const { tables } = require("./utils/tables");

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
const up = (pgm) => {
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

    uniqueNonDeletedIndex("id");

    rowLevelSecurity();
    softDeleteRule();

    authenticatedCreatePolicy();
    deleteOwnRecordPolicy();
    updateOwnRecordPolicy();
    readOwnRecordPolicy();
};

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
const down = (pgm) => {
    pgm.dropTable(tables.files);
};

module.exports = {
    up,
    down,
};
