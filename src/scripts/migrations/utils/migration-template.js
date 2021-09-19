const { q } = require("./utils/quote");
const { configure } = require("./utils/pgm-utils");
const { auditableColumns } = require("./utils/auditable-columns");

const tableName = "";

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
    } = configure({ pgm, tableName });
};

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
const down = (pgm) => {};

module.exports = {
    up,
    down,
};
