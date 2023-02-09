import type { Auditable } from "interfaces/auditable";

interface File extends Auditable {
    bucket_id: string;
    description: string | null;
    name: string;
    path: string;
    size: number | null;
    type: string;
}

export type { File };
