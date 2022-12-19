import type { Auditable } from "interfaces/auditable";

interface File extends Auditable {
    bucket_id: string;
    description?: string;
    name: string;
    path: string;
    size?: number;
    type: string;
}

export type { File };
