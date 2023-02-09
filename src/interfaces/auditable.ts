import type { Entity } from "interfaces/entity";

interface Auditable extends Entity {
    created_by_id: string | null;
    created_on: string | null;
    deleted_by_id: string | null;
    deleted_on: string | null;
    updated_by_id: string | null;
    updated_on: string | null;
}

export type { Auditable };
