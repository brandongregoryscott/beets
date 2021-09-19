const { configure } = require("./utils/pgm-utils");
const { auditableColumns } = require("./utils/auditable-columns");

const users = "users";

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
module.exports.up = (pgm) => {
    const {
        authenticatedCreatePolicy,
        readAnyRecordPolicy,
        uniqueNonDeletedIndex,
        rowLevelSecurity,
    } = configure({ pgm, tableName: users });

    pgm.createTable(users, {
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
        ...auditableColumns(pgm),
    });

    uniqueNonDeletedIndex("id");

    rowLevelSecurity();

    authenticatedCreatePolicy();
    readAnyRecordPolicy();
};

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
module.exports.down = (pgm) => {
    pgm.dropTable(users);
};
