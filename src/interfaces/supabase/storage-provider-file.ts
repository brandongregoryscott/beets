interface StorageProviderFile {
    created_at: string;
    id: string;
    last_accessed_at: string;
    metadata: {
        cacheControl: string;
        mimetype: string;
        size: number;
    };
    name: string;
    updated_at: string;

    // Navigation Properties
    signedURL?: string | null;
}

export type { StorageProviderFile };
