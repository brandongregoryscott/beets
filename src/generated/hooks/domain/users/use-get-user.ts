import { UserRecord } from "models/user-record";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "hooks/use-query";
import { useQuery } from "hooks/use-query";

interface UseGetUserOptions {
    enabled?: boolean;
    id: string;
    key?: any[];
}

const useGetUser = (
    options: UseGetUserOptions
): UseQueryResult<UserRecord | undefined, Error> => {
    const { fromUsers } = SupabaseClient;
    const { id, enabled, key = [] } = options;

    const get = async () => {
        const query = fromUsers().select("*").eq("id", id).limit(1).single();
        const { data, error } = await query;
        if (error != null) {
            throw error;
        }

        if (data == null) {
            return undefined;
        }

        return new UserRecord(data);
    };

    const result = useQuery<UserRecord | undefined, Error>({
        enabled,
        key: [Tables.Users, id, ...key],
        fn: get,
    });

    return result;
};

export { useGetUser };
