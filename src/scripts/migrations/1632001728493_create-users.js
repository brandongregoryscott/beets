const {
    authenticatedCreatePolicy,
    readAnyRecordPolicy,
    uniqueNonDeletedIndex,
    rowLevelSecurity,
} = require("./utils/utils");
const { auditableColumns } = require("./utils/auditable-columns");

const users = "users";

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
module.exports.up = (pgm) => {
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

    uniqueNonDeletedIndex(pgm, users, "id");

    rowLevelSecurity(pgm, users);

    authenticatedCreatePolicy(pgm, users);
    readAnyRecordPolicy(pgm, users);
};

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
module.exports.down = (pgm) => {
    pgm.dropTable(users);
};
