/// <reference types="node-pg-migrate" />
const { q } = require("./quote");

const notDeleted = "deletedon is null";

const authenticatedCreatePolicy =
    /** @param {import("node-pg-migrate").MigrationBuilder} pgm */


        (pgm) =>
        /** @param {import("node-pg-migrate").Name} tableName */
        (tableName) =>
        () =>
            pgm.createPolicy(
                tableName,
                q("Authenticated users can create records."),
                {
                    check: `auth.role() = 'authenticated'`,
                    command: "INSERT",
                }
            );

const readAnyRecordPolicy =
    /** @param {import("node-pg-migrate").MigrationBuilder} pgm */


        (pgm) =>
        /** @param {import("node-pg-migrate").Name} tableName */
        (tableName) =>
        () =>
            pgm.createPolicy(tableName, q("Users can read any record."), {
                using: notDeleted,
                command: "SELECT",
            });

const readOwnRecordPolicy =
    /** @param {import("node-pg-migrate").MigrationBuilder} pgm */


        (pgm) =>
        /** @param {import("node-pg-migrate").Name} tableName */
        (tableName) =>
        () =>
            pgm.createPolicy(
                tableName,
                q("Users can read their own records."),
                {
                    using: `auth.uid() = createdbyid AND ${notDeleted}`,
                    command: "SELECT",
                }
            );

const rowLevelSecurity =
    /** @param {import("node-pg-migrate").MigrationBuilder} pgm */


        (pgm) =>
        /** @param {import("node-pg-migrate").Name} tableName */
        (tableName) =>
        () =>
            pgm.alterTable(tableName, {
                levelSecurity: "ENABLE",
            });

const updateOwnRecordPolicy =
    /** @param {import("node-pg-migrate").MigrationBuilder} pgm */


        (pgm) =>
        /** @param {import("node-pg-migrate").Name} tableName */
        (tableName) =>
        () =>
            pgm.createPolicy(
                tableName,
                q("Users can update their own records."),
                {
                    using: "auth.uid() = createdbyid",
                    command: "UPDATE",
                }
            );

const uniqueNonDeletedIndex =
    /** @param {import("node-pg-migrate").MigrationBuilder} pgm */


        (pgm) =>
        /** @param {import("node-pg-migrate").Name} tableName */
        (tableName) =>
        /**
         * @param {string} column
         * @param {boolean} dropConstraint Drop a foreign key constraint as well. Defaults to `true`
         */
        (column, dropConstraint = true) => {
            if (dropConstraint) {
                pgm.dropConstraint(tableName, `${tableName}_${column}_fkey`);
            }

            pgm.addIndex(tableName, [column, "deletedon"], {
                unique: true,
                where: notDeleted,
            });
        };

/**
 * @typedef {object} PgmUtilsOptions
 * @property {import("node-pg-migrate").MigrationBuilder} pgm
 * @property {import("node-pg-migrate").Name} tableName
 */

/**
 * @param {PgmUtilsOptions} options
 */
const configure = (options) => {
    const { pgm, tableName } = options;
    if (pgm == null) {
        throw new Error("'pgm' parameter must be set to use pgmUtilsWith!");
    }

    if (tableName == null) {
        throw new Error(
            "'tableName' parameter must be set to use pgmUtilsWith!"
        );
    }

    return {
        authenticatedCreatePolicy: authenticatedCreatePolicy(pgm)(tableName),
        readAnyRecordPolicy: readAnyRecordPolicy(pgm)(tableName),
        readOwnRecordPolicy: readOwnRecordPolicy(pgm)(tableName),
        rowLevelSecurity: rowLevelSecurity(pgm)(tableName),
        updateOwnRecordPolicy: updateOwnRecordPolicy(pgm)(tableName),
        uniqueNonDeletedIndex: uniqueNonDeletedIndex(pgm)(tableName),
    };
};

module.exports = {
    authenticatedCreatePolicy,
    configure,
    notDeleted,
    readAnyRecordPolicy,
    readOwnRecordPolicy,
    rowLevelSecurity,
    updateOwnRecordPolicy,
    uniqueNonDeletedIndex,
};
