import { MigrationBuilder, Name } from "node-pg-migrate";
import { AuditableColumns } from "../enums/auditable-columns";
import { q } from "./quote";

interface MigrationBuilderUtilsOptions {
    pgm: MigrationBuilder;
    tableName: Name;
}

interface Migration {
    down: () => void;
    policyOrRuleName?: string;
    up: (...args: any[]) => void;
}

const notDeleted = `${AuditableColumns.DeletedOn} is null`;
const updateTriggerSql = `

    BEGIN

    NEW.${AuditableColumns.UpdatedOn} := current_timestamp;
    NEW.${AuditableColumns.UpdatedById} := auth.uid();

    RETURN NEW;

    END;

`;

const authenticatedCreatePolicy =
    (pgm: MigrationBuilder, tableName: Name) => (): Migration => {
        const policyName = q("Authenticated users can create records.");

        return {
            down: () => pgm.dropPolicy(tableName, policyName),
            policyOrRuleName: policyName,
            up: () =>
                pgm.createPolicy(tableName, policyName, {
                    check: `auth.role() = 'authenticated'`,
                    command: "INSERT",
                }),
        };
    };

const deleteOwnRecordPolicy =
    (pgm: MigrationBuilder, tableName: Name) => (): Migration => {
        const policyName = q("Users can delete their own records.");

        return {
            down: () => pgm.dropPolicy(tableName, policyName),
            policyOrRuleName: policyName,
            up: () =>
                pgm.createPolicy(tableName, policyName, {
                    using: `auth.uid() = ${AuditableColumns.CreatedById}`,
                    command: "DELETE",
                }),
        };
    };

const dropColumnIfExists =
    (pgm: MigrationBuilder, tableName: Name) => (columnName: string) =>
        pgm.sql(`ALTER TABLE ${tableName} DROP COLUMN IF EXISTS ${columnName}`);

const readAnyRecordPolicy =
    (pgm: MigrationBuilder, tableName: Name) => (): Migration => {
        const policyName = q("Users can read any record.");
        return {
            down: () => pgm.dropPolicy(tableName, policyName),
            policyOrRuleName: policyName,
            up: () =>
                pgm.createPolicy(tableName, policyName, {
                    using: notDeleted,
                    command: "SELECT",
                }),
        };
    };

const readOwnRecordPolicy =
    (pgm: MigrationBuilder, tableName: Name) => (): Migration => {
        const policyName = q("Users can read their own records.");
        return {
            down: () => pgm.dropPolicy(tableName, policyName),
            policyOrRuleName: policyName,
            up: () =>
                pgm.createPolicy(tableName, policyName, {
                    using: `auth.uid() = ${AuditableColumns.CreatedById} AND ${notDeleted}`,
                    command: "SELECT",
                }),
        };
    };

const rowLevelSecurity =
    (pgm: MigrationBuilder, tableName: Name) => (): Migration => {
        return {
            down: () => pgm.alterTable(tableName, { levelSecurity: "DISABLE" }),
            up: () =>
                pgm.alterTable(tableName, {
                    levelSecurity: "ENABLE",
                }),
        };
    };

const softDeleteRule =
    (pgm: MigrationBuilder, tableName: Name) => (): Migration => {
        const ruleName = q("SOFT DELETE");
        return {
            down: () =>
                pgm.sql(`DROP RULE IF EXISTS ${ruleName} ON ${tableName}`),
            policyOrRuleName: ruleName,
            up: () =>
                pgm.sql(
                    `CREATE OR REPLACE RULE ${ruleName} AS ON DELETE TO ${tableName} DO INSTEAD UPDATE ${tableName} SET ${AuditableColumns.DeletedOn} = current_timestamp, ${AuditableColumns.DeletedById} = auth.uid() WHERE ${tableName}.id = old.id RETURNING *`
                ),
        };
    };

const updateTrigger =
    (pgm: MigrationBuilder, tableName: Name) => (): Migration => {
        const triggerName = `update_${tableName}_auditable_fields`;
        return {
            down: () => {
                pgm.dropTrigger(tableName, triggerName);
                pgm.dropFunction(triggerName, []);
            },
            policyOrRuleName: triggerName,
            up: () =>
                pgm.createTrigger(
                    tableName,
                    triggerName,
                    {
                        when: "BEFORE",
                        operation: "UPDATE",
                        level: "ROW",
                        language: "plpgsql",
                        replace: true,
                    },
                    updateTriggerSql
                ),
        };
    };

const updateOwnRecordPolicy =
    (pgm: MigrationBuilder, tableName: Name) => (): Migration => {
        const policyName = q("Users can update their own records.");
        return {
            down: () => pgm.dropPolicy(tableName, policyName),
            policyOrRuleName: policyName,
            up: () =>
                pgm.createPolicy(tableName, policyName, {
                    using: `auth.uid() = ${AuditableColumns.CreatedById}`,
                    command: "UPDATE",
                }),
        };
    };

const uniqueNonDeletedIndex =
    (pgm: MigrationBuilder, tableName: Name) =>
    /**
     * @param {string} column
     * @param {{ dropFkConstraint: boolean }} [options] dropFkConstraint: Drop a foreign key constraint as well.
     */
    (column: string, options?: { dropFkConstraint: boolean }): Migration => {
        const dropFkConstraint = options?.dropFkConstraint ?? false;
        const constraint = `${tableName}_${column}_fkey`;

        return {
            down: () => {
                if (dropFkConstraint) {
                    pgm.addConstraint(tableName, constraint, {
                        ifExists: true,
                    });
                }
                pgm.dropIndex(tableName, [column, AuditableColumns.DeletedOn]);
            },
            up: () => {
                if (dropFkConstraint) {
                    pgm.dropConstraint(tableName, constraint);
                }

                pgm.addIndex(tableName, [column, AuditableColumns.DeletedOn], {
                    unique: true,
                    where: notDeleted,
                });
            },
        };
    };

const configure = (options: MigrationBuilderUtilsOptions) => {
    const { pgm, tableName } = options;

    return {
        authenticatedCreatePolicy: authenticatedCreatePolicy(pgm, tableName),
        deleteOwnRecordPolicy: deleteOwnRecordPolicy(pgm, tableName),
        dropColumnIfExists: dropColumnIfExists(pgm, tableName),
        readAnyRecordPolicy: readAnyRecordPolicy(pgm, tableName),
        readOwnRecordPolicy: readOwnRecordPolicy(pgm, tableName),
        rowLevelSecurity: rowLevelSecurity(pgm, tableName),
        softDeleteRule: softDeleteRule(pgm, tableName),
        updateOwnRecordPolicy: updateOwnRecordPolicy(pgm, tableName),
        updateTrigger: updateTrigger(pgm, tableName),
        uniqueNonDeletedIndex: uniqueNonDeletedIndex(pgm, tableName),
    };
};

export { configure, notDeleted };
