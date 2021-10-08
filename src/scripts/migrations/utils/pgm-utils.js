/// <reference types="node-pg-migrate" />
const { auditableColumns } = require("./auditable-columns");
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

const deleteOwnRecordPolicy =
    /** @param {import("node-pg-migrate").MigrationBuilder} pgm */


        (pgm) =>
        /** @param {import("node-pg-migrate").Name} tableName */
        (tableName) =>
        () =>
            pgm.createPolicy(
                tableName,
                q("Users can delete their own records."),
                {
                    using: `auth.uid() = ${auditableColumns.createdbyid}`,
                    command: "DELETE",
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
                    using: `auth.uid() = ${auditableColumns.createdbyid} AND ${notDeleted}`,
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

const softDeleteRule =
    /** @param {import("node-pg-migrate").MigrationBuilder} pgm */


        (pgm) =>
        /** @param {import("node-pg-migrate").Name} tableName */
        (tableName) =>
        () =>
            pgm.sql(
                `CREATE RULE "SOFT DELETE" AS ON DELETE TO ${tableName} DO INSTEAD UPDATE ${tableName} SET ${auditableColumns.deletedon} = current_timestamp, ${auditableColumns.deletedbyid} = auth.uid() WHERE ${tableName}.id = old.id RETURNING *`
            );

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
                    using: `auth.uid() = ${auditableColumns.createdbyid}`,
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

            pgm.addIndex(tableName, [column, auditableColumns.deletedon], {
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
        throw new Error("'pgm' parameter must be set to use configure()!");
    }

    if (tableName == null) {
        throw new Error(
            "'tableName' parameter must be set to use configure()!"
        );
    }

    return {
        authenticatedCreatePolicy: authenticatedCreatePolicy(pgm)(tableName),
        deleteOwnRecordPolicy: deleteOwnRecordPolicy(pgm)(tableName),
        readAnyRecordPolicy: readAnyRecordPolicy(pgm)(tableName),
        readOwnRecordPolicy: readOwnRecordPolicy(pgm)(tableName),
        rowLevelSecurity: rowLevelSecurity(pgm)(tableName),
        softDeleteRule: softDeleteRule(pgm)(tableName),
        updateOwnRecordPolicy: updateOwnRecordPolicy(pgm)(tableName),
        uniqueNonDeletedIndex: uniqueNonDeletedIndex(pgm)(tableName),
    };
};

module.exports = {
    configure,
    notDeleted,
};
