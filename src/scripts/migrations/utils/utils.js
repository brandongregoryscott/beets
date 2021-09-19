/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 * @param {import("node-pg-migrate").TableDescriptor} tableName
 */
const authenticatedCreatePolicy = (pgm, tableName) =>
    pgm.createPolicy(tableName, q("Authenticated users can create records."), {
        check: `auth.role() = 'authenticated'`,
        command: "INSERT",
    });

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 * @param {import("node-pg-migrate").TableDescriptor} tableName
 */
const readAnyRecordPolicy = (pgm, tableName) =>
    pgm.createPolicy(tableName, q("Users can read any record."), {
        using: "true",
        command: "SELECT",
    });

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 * @param {import("node-pg-migrate").TableDescriptor} tableName
 */
const readOwnRecordPolicy = (pgm, tableName) =>
    pgm.createPolicy(tableName, q("Users can read their own records."), {
        using: "auth.uid() = createdbyid",
        command: "SELECT",
    });

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 * @param {import("node-pg-migrate").TableDescriptor} tableName
 */
const rowLevelSecurity = (pgm, tableName) =>
    pgm.alterTable(tableName, {
        levelSecurity: "ENABLE",
    });

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 * @param {import("node-pg-migrate").TableDescriptor} tableName
 */
const updateOwnRecordPolicy = (pgm, tableName) =>
    pgm.createPolicy(tableName, q("Users can update their own records."), {
        using: "auth.uid() = createdbyid",
        command: "UPDATE",
    });

/**
 *
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 * @param {import("node-pg-migrate").TableDescriptor} tableName
 * @param {string} column
 * @param {boolean} dropConstraint Drop a foreign key constraint as well. Defaults to `true`
 */
const uniqueNonDeletedIndex = (
    pgm,
    tableName,
    column,
    dropConstraint = true
) => {
    if (dropConstraint) {
        pgm.dropConstraint(tableName, `${tableName}_${column}_fkey`);
    }

    pgm.addIndex(tableName, [column, "deletedon"], {
        unique: true,
        where: "deletedon is null",
    });
};

/**
 * @param {string} value
 */
const q = (value) => `"${value}"`;

module.exports = {
    authenticatedCreatePolicy,
    q,
    readAnyRecordPolicy,
    readOwnRecordPolicy,
    rowLevelSecurity,
    updateOwnRecordPolicy,
    uniqueNonDeletedIndex,
};
