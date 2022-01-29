import { MigrationBuilder, Name } from "node-pg-migrate";
import { AuditableColumns } from "../enums/auditable-columns";

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

const deleteTriggerSql = `
    DECLARE
        command text := ' SET ${AuditableColumns.DeletedOn} = current_timestamp, ${AuditableColumns.DeletedById} = auth.uid() WHERE id = $1';
    BEGIN
        EXECUTE 'UPDATE ' || TG_TABLE_NAME || command USING OLD.id;
        RETURN NULL;
    END;
`;

const updateTriggerSql = `

    BEGIN

    NEW.${AuditableColumns.UpdatedOn} := current_timestamp;
    NEW.${AuditableColumns.UpdatedById} := auth.uid();

    RETURN NEW;

    END;

`;

const authenticatedCreatePolicy =
    (pgm: MigrationBuilder, tableName: Name) => (): Migration => {
        const policyName = "Authenticated users can create records.";

        return {
            down: () =>
                pgm.dropPolicy(tableName, policyName, { ifExists: true }),
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
        const policyName = "Users can delete their own records.";

        return {
            down: () =>
                pgm.dropPolicy(tableName, policyName, { ifExists: true }),
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
        const policyName = "Users can read any record.";
        return {
            down: () =>
                pgm.dropPolicy(tableName, policyName, { ifExists: true }),
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
        const policyName = "Users can read their own records.";
        return {
            down: () =>
                pgm.dropPolicy(tableName, policyName, { ifExists: true }),
            policyOrRuleName: policyName,
            up: () =>
                pgm.createPolicy(tableName, policyName, {
                    using: `auth.uid() = ${AuditableColumns.CreatedById} AND (${notDeleted} OR ${AuditableColumns.DeletedOn} = transaction_timestamp())`,
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

const softDeleteTrigger =
    (pgm: MigrationBuilder, tableName: Name) => (): Migration => {
        const triggerName = `soft_delete_${tableName}`;
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
                        operation: "DELETE",
                        level: "ROW",
                        language: "plpgsql",
                        replace: true,
                    },
                    deleteTriggerSql
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
        const policyName = "Users can update their own records.";
        return {
            down: () =>
                pgm.dropPolicy(tableName, policyName, { ifExists: true }),
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
        softDeleteTrigger: softDeleteTrigger(pgm, tableName),
        updateOwnRecordPolicy: updateOwnRecordPolicy(pgm, tableName),
        updateTrigger: updateTrigger(pgm, tableName),
        uniqueNonDeletedIndex: uniqueNonDeletedIndex(pgm, tableName),
    };
};

export { configure, notDeleted };
