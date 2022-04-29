import { SearchOptions } from "interfaces/search-options";
import { StorageProviderFile } from "interfaces/supabase/storage-provider-file";
import { StorageProviderResult } from "types/storage-provider-result";

interface FetchParameters {
    signal?: AbortSignal;
}

interface FileOptions {
    cacheControl?: string;
    contentType?: string;
    upsert?: boolean;
}

type FileBody =
    | ArrayBuffer
    | ArrayBufferView
    | Blob
    | Buffer
    | File
    | FormData
    | NodeJS.ReadableStream
    | ReadableStream<Uint8Array>
    | URLSearchParams
    | string;

interface StorageFileApi {
    createSignedUrl(
        path: string,
        expiresIn: number
    ): Promise<StorageProviderResult<{ signedURL: string }>>;
    download(path: string): Promise<StorageProviderResult<Blob>>;
    getPublicUrl(path: string): StorageProviderResult<{ publicURL: string }>;
    list(
        path?: string,
        options?: SearchOptions<StorageProviderFile>,
        parameters?: FetchParameters
    ): Promise<StorageProviderResult<StorageProviderFile[]>>;
    move(
        fromPath: string,
        toPath: string
    ): Promise<StorageProviderResult<{ message: string }>>;
    remove(
        paths: string[]
    ): Promise<StorageProviderResult<StorageProviderFile[]>>;
    update(
        path: string,
        fileBody: FileBody,
        fileOptions?: FileOptions
    ): Promise<StorageProviderResult<{ Key: string }>>;
    upload(
        path: string,
        fileBody: FileBody,
        fileOptions?: FileOptions
    ): Promise<StorageProviderResult<{ Key: string }>>;
}

export type { StorageFileApi };
