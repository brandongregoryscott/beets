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

    signedURL?: string | null;
    // Navigation Properties
    updated_at: string;
}

export type { StorageProviderFile };
