interface File {
    created_on?: string;
    created_by_id?: string;
    deleted_on?: string;
    deleted_by_id?: string;
    updated_on?: string;
    updated_by_id?: string;
    id: string;
    /**
     * Note:
     * This is a Foreign Key to `buckets.id`.<fk table='buckets' column='id'/>
     */
    bucketid: string;
    description?: string;
    name: string;
    path: string;
    size?: number;
    type: string;
}

export type { File };
