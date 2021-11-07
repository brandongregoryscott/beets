import { Entity } from "interfaces/entity";

interface Auditable extends Entity {
    created_on?: string;
    created_by_id?: string;
    deleted_on?: string;
    deleted_by_id?: string;
    updated_on?: string;
    updated_by_id?: string;
}

export type { Auditable };
