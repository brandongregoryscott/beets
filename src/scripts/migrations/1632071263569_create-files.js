const {
    uniqueNonDeletedIndex,
    rowLevelSecurity,
    authenticatedCreatePolicy,
    updateOwnRecordPolicy,
    readOwnRecordPolicy,
} = require("./utils/utils");
const { auditableColumns } = require("./utils/auditable-columns");

const files = "files";

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
const up = (pgm) => {
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

    uniqueNonDeletedIndex(pgm, files, "id");

    rowLevelSecurity(pgm, files);

    authenticatedCreatePolicy(pgm, files);

    updateOwnRecordPolicy(pgm, files);

    readOwnRecordPolicy(pgm, files);
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
