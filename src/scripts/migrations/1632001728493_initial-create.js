/// <reference types="node-pg-migrate" />
const { q } = require("./utils/quote");
const { auditableColumns } = require("./utils/auditable-columns");

const users = "users2";

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

    pgm.addIndex(users, ["id", "deletedon"], {
        unique: true,
        where: "deletedon is null",
    });

    pgm.alterTable(users, {
        levelSecurity: "ENABLE",
    });

    pgm.createPolicy(
        users,
        q("Authenticated users can create their own record."),
        {
            check: `auth.role() = 'authenticated'`,
            command: "INSERT",
        }
    );

    pgm.createPolicy(users, q("Users can read any record."), {
        using: "true",
        command: "SELECT",
    });
};

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
module.exports.down = (pgm) => {
    pgm.dropTable(users);
};
