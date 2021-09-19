/**
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 */
module.exports.auditableColumns = (pgm) => ({
    createdon: {
        type: "timestamptz",
        default: pgm.func("current_timestamp"),
    },
    createdbyid: {
        type: "uuid",
        default: pgm.func("auth.uid()"),
    },
    deletedon: {
        type: "timestamptz",
        default: null,
    },
    deletedbyid: {
        type: "uuid",
        default: null,
    },
    updatedon: {
        type: "timestamptz",
        default: null,
    },
    updatedbyid: {
        type: "uuid",
        default: null,
    },
});
