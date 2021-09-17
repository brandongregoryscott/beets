import { Record } from "immutable";
import { StorageProviderFile } from "interfaces/supabase/storage-provider-file";

const defaultValues: StorageProviderFile = {
    bucket_id: "",
    buckets: undefined,
    created_at: "",
    id: "",
    last_accessed_at: "",
    metadata: {},
    name: "",
    owner: "",
    updated_at: "",
    signedURL: undefined,
};

class StorageProviderFileRecord
    extends Record(defaultValues)
    implements StorageProviderFile {}

export { StorageProviderFileRecord };
