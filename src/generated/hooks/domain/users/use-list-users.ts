import { UserRecord } from "models/user-record";
import type { User } from "generated/interfaces/user";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "hooks/use-query";
import { useQuery } from "hooks/use-query";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import type { SortOptions } from "interfaces/sort-options";
import type { PublicSchema } from "generated/database";

interface UseListUsersOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<
            PublicSchema,
            Record<string, unknown>,
            User
        >
    ) => PostgrestFilterBuilder<PublicSchema, Record<string, unknown>, User>;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: UserRecord[]) => void;
    sortBy?: SortOptions<User>;
}

const defaultFilter = (
    query: PostgrestFilterBuilder<PublicSchema, Record<string, unknown>, User>
) => query;

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
        sortBy,
    } = options ?? {};

    const list = async () => {
        let query = fromUsers().select("*");
        if (sortBy != null) {
            query = query.order(sortBy.column, {
                ascending: sortBy.order === "asc",
            });
        }

        const { data, error } = await filter(query);
        if (error != null) {
            throw error;
        }

        return data?.map((user) => new UserRecord(user)) ?? [];
    };

    const result = useQuery<UserRecord[], Error>({
        enabled,
        key: [Tables.Users, sortBy, ...key],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListUsers };
