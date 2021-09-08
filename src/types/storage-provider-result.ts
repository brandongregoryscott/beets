import { StorageProviderData } from "interfaces/storage-provider-data";
import { StorageProviderError } from "interfaces/storage-provider-error";

type StorageProviderResult<T> = StorageProviderData<T> | StorageProviderError;

export type { StorageProviderResult };
