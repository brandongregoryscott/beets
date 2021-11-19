import { Bucket } from "interfaces/supabase/bucket";

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
    signedURL?: string | null;
}

export type { StorageProviderFile };
