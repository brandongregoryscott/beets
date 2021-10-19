import { MigrationBuilder, Name } from "node-pg-migrate";
import { auditableColumns } from "./auditable-columns";
import { q } from "./quote";

const notDeleted = "deletedon is null";

const authenticatedCreatePolicy =
    (pgm: MigrationBuilder) => (tableName: Name) => () =>
        pgm.createPolicy(
            tableName,
            q("Authenticated users can create records."),
            {
                check: `auth.role() = 'authenticated'`,
                command: "INSERT",
            }
        );

const deleteOwnRecordPolicy =
    (pgm: MigrationBuilder) => (tableName: Name) => () =>
        pgm.createPolicy(tableName, q("Users can delete their own records."), {
            using: `auth.uid() = ${auditableColumns.createdbyid}`,
            command: "DELETE",
        });

const readAnyRecordPolicy =
    (pgm: MigrationBuilder) => (tableName: Name) => () =>
        pgm.createPolicy(tableName, q("Users can read any record."), {
            using: notDeleted,
            command: "SELECT",
        });

const readOwnRecordPolicy =
    (pgm: MigrationBuilder) => (tableName: Name) => () =>
        pgm.createPolicy(tableName, q("Users can read their own records."), {
            using: `auth.uid() = ${auditableColumns.createdbyid} AND ${notDeleted}`,
            command: "SELECT",
        });

const rowLevelSecurity = (pgm: MigrationBuilder) => (tableName: Name) => () =>
    pgm.alterTable(tableName, {
        levelSecurity: "ENABLE",
    });

const softDeleteRule = (pgm: MigrationBuilder) => (tableName: Name) => () =>
    pgm.sql(
        `CREATE RULE "SOFT DELETE" AS ON DELETE TO ${tableName} DO INSTEAD UPDATE ${tableName} SET ${auditableColumns.deletedon} = current_timestamp, ${auditableColumns.deletedbyid} = auth.uid() WHERE ${tableName}.id = old.id RETURNING *`
    );

const updateOwnRecordPolicy =
    (pgm: MigrationBuilder) => (tableName: Name) => () =>
        pgm.createPolicy(tableName, q("Users can update their own records."), {
            using: `auth.uid() = ${auditableColumns.createdbyid}`,
            command: "UPDATE",
        });

const uniqueNonDeletedIndex =
    (pgm: MigrationBuilder) =>
    (tableName: Name) =>
    /**
     * @param {string} column
     * @param {boolean} dropConstraint Drop a foreign key constraint as well. Defaults to `true`
     */
    (column: string, dropConstraint: boolean = true) => {
        if (dropConstraint) {
            pgm.dropConstraint(tableName, `${tableName}_${column}_fkey`);
        }

        pgm.addIndex(tableName, [column, auditableColumns.deletedon], {
            unique: true,
            where: notDeleted,
        });
    };

interface MigrationBuilderUtilsOptions {
    pgm: MigrationBuilder;
    tableName: Name;
}

/**
 * @param {PgmUtilsOptions} options
 */
const configure = (options: MigrationBuilderUtilsOptions) => {
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

export { configure, notDeleted };
