const { configure } = require("./utils/pgm-utils");
const { auditableColumns } = require("./utils/auditable-columns");

const files = "files";

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
const up = (pgm) => {
    const {
        uniqueNonDeletedIndex,
        rowLevelSecurity,
        authenticatedCreatePolicy,
        updateOwnRecordPolicy,
        readOwnRecordPolicy,
    } = configure({ pgm, tableName: files });

    pgm.createTable(files, {
        ...auditableColumns(pgm),
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

    authenticatedCreatePolicy();
    updateOwnRecordPolicy();
    readOwnRecordPolicy();
};

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
const down = (pgm) => {
    pgm.dropTable(files);
};

module.exports = {
    up,
    down,
};
