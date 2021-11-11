import { Auditable } from "interfaces/auditable";

interface File extends Auditable {
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
