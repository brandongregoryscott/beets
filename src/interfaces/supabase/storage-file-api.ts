import { PagingOptions } from "interfaces/paging-options";
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
    upload(
        path: string,
        fileBody: FileBody,
        fileOptions?: FileOptions
    ): Promise<StorageProviderResult<{ Key: string }>>;

    update(
        path: string,
        fileBody: FileBody,
        fileOptions?: FileOptions
    ): Promise<StorageProviderResult<{ Key: string }>>;

    move(
        fromPath: string,
        toPath: string
    ): Promise<StorageProviderResult<{ message: string }>>;

    createSignedUrl(
        path: string,
        expiresIn: number
    ): Promise<StorageProviderResult<{ signedURL: string }>>;

    download(path: string): Promise<StorageProviderResult<Blob>>;

    getPublicUrl(path: string): StorageProviderResult<{ publicURL: string }>;

    remove(
        paths: string[]
    ): Promise<StorageProviderResult<StorageProviderFile[]>>;

    list(
        path?: string,
        options?: SearchOptions<StorageProviderFile>,
        parameters?: FetchParameters
    ): Promise<StorageProviderResult<StorageProviderFile[]>>;
}

export type { StorageFileApi };
