import { MigrationBuilder } from "node-pg-migrate";
import { configure } from "./utils/migration-builder-utils";
import { Tables } from "./enums/tables";
import { makeAuditableColumns } from "./utils/auditable-columns";
import { makeIdColumn } from "./utils/id-column";
import { quote } from "./utils/quote";

enum InstrumentCurve {
    Exponential = "exponential",
    Linear = "linear",
}

const tableName = Tables.Instruments;
const typeName = "InstrumentCurve";

const up = (pgm: MigrationBuilder) => {
    const config = configure({ pgm, tableName });

    pgm.dropType(typeName, { ifExists: true });
    pgm.addType(typeName, Object.values(InstrumentCurve));

    pgm.createTable(tableName, {
        ...makeAuditableColumns(pgm),
        ...makeIdColumn(pgm),
        curve: {
            default: InstrumentCurve.Exponential,
            notNull: true,
            onDelete: "NO ACTION",
            type: quote(typeName),
        },
        file_id: {
            notNull: true,
            references: Tables.Files,
            type: "uuid",
        },
        name: {
            notNull: true,
            type: "string",
        },
        release: {
            default: 0.1,
            type: "int",
        },
        root_note: {
            type: "string",
        },
    });

    config.uniqueNonDeletedIndex("id").up();

    config.rowLevelSecurity().up();
    config.softDeleteRule().up();
    config.updateTrigger().up();

    config.authenticatedCreatePolicy().up();
    config.deleteOwnRecordPolicy().up();
    config.updateOwnRecordPolicy().up();
    config.readOwnRecordPolicy().up();
};

const down = (pgm: MigrationBuilder) => {
    pgm.dropTable(tableName);
    pgm.dropType(typeName, { ifExists: true });
};

export { up, down };
