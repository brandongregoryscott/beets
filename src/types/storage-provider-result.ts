import { StorageProviderData } from "interfaces/supabase/storage-provider-data";
import { StorageProviderError } from "interfaces/supabase/storage-provider-error";

type StorageProviderResult<T> = StorageProviderData<T> | StorageProviderError;

export type { StorageProviderResult };
