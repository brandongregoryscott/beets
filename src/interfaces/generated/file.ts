interface File {
    createdon?: string;
    createdbyid?: string;
    deletedon?: string;
    deletedbyid?: string;
    updatedon?: string;
    updatedbyid?: string;
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
