const { configure } = require("./utils/pgm-utils");
const { makeAuditableColumns } = require("./utils/auditable-columns");
const { tables } = require("./utils/tables");

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
module.exports.up = (pgm) => {
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

    uniqueNonDeletedIndex("id");

    rowLevelSecurity();
    softDeleteRule();

    authenticatedCreatePolicy();
    updateOwnRecordPolicy();
    readAnyRecordPolicy();
};

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
module.exports.down = (pgm) => {
    pgm.dropTable(tables.users);
};
