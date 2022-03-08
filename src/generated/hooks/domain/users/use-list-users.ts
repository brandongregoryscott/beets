import { UserRecord } from "models/user-record";
import { User } from "generated/interfaces/user";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

interface UseListUsersOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<User>
    ) => PostgrestFilterBuilder<User>;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: UserRecord[]) => void;
}

const defaultFilter = (query: PostgrestFilterBuilder<User>) => query;

const useListUsers = (
    options?: UseListUsersOptions
): UseQueryResult<UserRecord[], Error> => {
    const { fromUsers } = SupabaseClient;
    const {
        enabled,
        filter = defaultFilter,
        key = [],
        onError,
        onSuccess,
    } = options ?? {};

    const list = async () => {
        const query = fromUsers().select("*");
        const { data, error } = await filter(query);
        if (error != null) {
            throw error;
        }

        return data?.map((user) => new UserRecord(user)) ?? [];
    };

    const result = useQuery<UserRecord[], Error>({
        enabled,
        key: [Tables.Users, ...key],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListUsers };
