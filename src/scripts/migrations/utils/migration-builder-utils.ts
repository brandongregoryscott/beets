import { MigrationBuilder, Name } from "node-pg-migrate";
import { auditableColumns } from "./auditable-columns";
import { q } from "./quote";

interface MigrationBuilderUtilsOptions {
    pgm: MigrationBuilder;
    tableName: Name;
}

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
            using: `auth.uid() = ${auditableColumns.created_by_id}`,
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
            using: `auth.uid() = ${auditableColumns.created_by_id} AND ${notDeleted}`,
            command: "SELECT",
        });

const rowLevelSecurity = (pgm: MigrationBuilder) => (tableName: Name) => () =>
    pgm.alterTable(tableName, {
        levelSecurity: "ENABLE",
    });

const softDeleteRule = (pgm: MigrationBuilder) => (tableName: Name) => () =>
    pgm.sql(
        `CREATE RULE "SOFT DELETE" AS ON DELETE TO ${tableName} DO INSTEAD UPDATE ${tableName} SET ${auditableColumns.deleted_on} = current_timestamp, ${auditableColumns.deleted_by_id} = auth.uid() WHERE ${tableName}.id = old.id RETURNING *`
    );

const updateOwnRecordPolicy =
    (pgm: MigrationBuilder) => (tableName: Name) => () =>
        pgm.createPolicy(tableName, q("Users can update their own records."), {
            using: `auth.uid() = ${auditableColumns.created_by_id}`,
            command: "UPDATE",
        });

const uniqueNonDeletedIndex =
    (pgm: MigrationBuilder) =>
    (tableName: Name) =>
    /**
     * @param {string} column
     * @param {{ dropFkConstraint: boolean }} [options] dropFkConstraint: Drop a foreign key constraint as well.
     */
    (column: string, options?: { dropFkConstraint: boolean }) => {
        if (options?.dropFkConstraint === true) {
            pgm.dropConstraint(tableName, `${tableName}_${column}_fkey`);
        }

        pgm.addIndex(tableName, [column, auditableColumns.deleted_on], {
            unique: true,
            where: notDeleted,
        });
    };

const configure = (options: MigrationBuilderUtilsOptions) => {
    const { pgm, tableName } = options;

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
