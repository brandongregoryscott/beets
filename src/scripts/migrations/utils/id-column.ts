import { MigrationBuilder } from "node-pg-migrate";

const id = "id";

const makeIdColumn = (pgm: MigrationBuilder) => ({
    [id]: {
        default: pgm.func("gen_random_uuid()"),
        notNull: true,
        primaryKey: true,
        type: "uuid",
    },
});

export { id, makeIdColumn };
