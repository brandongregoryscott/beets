interface Auditable {
    created_on?: string;
    created_by_id?: string;
    deletedn?: string;
    deleted_by_id?: string;
    updated_on?: string;
    updated_by_id?: string;
}

export type { Auditable };
