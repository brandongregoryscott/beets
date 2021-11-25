import { Record } from "immutable";
import { StorageProviderFile } from "interfaces/supabase/storage-provider-file";
import { BaseRecord } from "models/base-record";
import { makeDefaultValues } from "utils/core-utils";

const defaultValues = makeDefaultValues<StorageProviderFile>({
    created_at: "",
    id: "",
    last_accessed_at: "",
    metadata: {
        cacheControl: "",
        mimetype: "",
        size: 0,
    },
    name: "",
    updated_at: "",
    signedURL: undefined,
});

class StorageProviderFileRecord
    extends BaseRecord(Record(defaultValues))
    implements StorageProviderFile {}

export { StorageProviderFileRecord };
