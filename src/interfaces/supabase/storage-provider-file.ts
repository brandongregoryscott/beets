import { Bucket } from "interfaces/supabase/bucket";
import { nil } from "types/nil";

interface StorageProviderFile {
    bucket_id: string;
    buckets?: Bucket;
    created_at: string;
    id: string;
    last_accessed_at: string;
    metadata: {};
    name: string;
    owner: string;
    updated_at: string;

    // Navigation Properties
    signedURL?: nil<string>;
}

export type { StorageProviderFile };
