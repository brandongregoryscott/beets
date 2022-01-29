import { MigrationBuilder } from "node-pg-migrate";
import { configure } from "./utils/migration-builder-utils";
import { Tables } from "./enums/tables";

const up = (pgm: MigrationBuilder) => {
    Object.values(Tables).forEach((table) => {
        const config = configure({ pgm, tableName: table });
        config.rowLevelSecurity().down();
        config.authenticatedCreatePolicy().down();
        config.deleteOwnRecordPolicy().down();
        config.updateOwnRecordPolicy().down();
        config.readOwnRecordPolicy().down();

        config.softDeleteTrigger().up();
        config.rowLevelSecurity().up();

        config.authenticatedCreatePolicy().up();
        config.deleteOwnRecordPolicy().up();
        config.updateOwnRecordPolicy().up();
        config.readOwnRecordPolicy().up();
    });
};

const down = (pgm: MigrationBuilder) => {
    Object.values(Tables).forEach((table) => {
        const config = configure({ pgm, tableName: table });
        config.softDeleteTrigger().down();
    });
};

export { up, down };
