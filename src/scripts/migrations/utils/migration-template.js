const { q } = require("./utils/quote");
const { auditableColumns } = require("./utils/auditable-columns");

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
const up = (pgm) => {};

/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
const down = (pgm) => {};

module.exports = {
    up,
    down,
};
