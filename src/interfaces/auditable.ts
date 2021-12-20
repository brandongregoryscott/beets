import { Entity } from "interfaces/entity";

interface Auditable extends Entity {
    created_by_id?: string;
    created_on?: string;
    deleted_by_id?: string;
    deleted_on?: string;
    updated_by_id?: string;
    updated_on?: string;
}

export type { Auditable };
