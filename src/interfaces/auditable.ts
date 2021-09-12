interface Auditable {
    createdOn?: string;
    createdById?: string;
    deletedOn?: string;
    deletedById?: string;
    updatedOn?: string;
    updatedById?: string;
}

export type { Auditable };
