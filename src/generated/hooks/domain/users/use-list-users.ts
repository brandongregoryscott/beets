import { UserRecord } from "models/user-record";
import { User } from "generated/interfaces/user";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

interface UseListUsersOptions {
    filter?: (
        query: PostgrestFilterBuilder<User>
    ) => PostgrestFilterBuilder<User>;
}

const defaultFilter = (query: PostgrestFilterBuilder<User>) => query;

const useListUsers = (
    options?: UseListUsersOptions
): UseQueryResult<UserRecord[], Error> => {
    const { fromUsers } = useDatabase();
    const { filter = defaultFilter } = options ?? {};

    const result = useQuery<UserRecord[], Error>({
        key: Tables.Users,
        fn: async () => {
            const query = fromUsers().select("*");
            const { data, error } = await filter(query);
            if (error != null) {
                throw error;
            }

            return data?.map((user) => new UserRecord(user)) ?? [];
        },
    });

    return result;
};

export { useListUsers };
