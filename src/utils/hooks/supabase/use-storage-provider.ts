import type { BucketName } from "enums/bucket-name";
import type { StorageFileApi } from "interfaces/supabase/storage-file-api";
import { useCallback } from "react";
import { useSupabase } from "utils/hooks/supabase/use-supabase";

const useStorageProvider = () => {
    const { supabase } = useSupabase();
    const { storage } = supabase;

    const from = useCallback(
        (bucketName: BucketName) =>
            storage.from(bucketName) as any as StorageFileApi,
        [storage]
    );

    return { from, storage };
};

export { useStorageProvider };
