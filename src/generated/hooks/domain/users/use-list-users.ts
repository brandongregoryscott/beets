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
): UseQueryResult<User[], Error> => {
    const { fromUsers } = useDatabase();
    const { filter = defaultFilter } = options ?? {};

    const result = useQuery<User[], Error>({
        key: Tables.Users,
        fn: async () => {
            let query = fromUsers().select("*");
            if (filter != null) {
                query = filter(query);
            }

            const { data, error } = await query;
            if (error != null) {
                throw error;
            }

            return data ?? [];
        },
    });

    return result;
};

export { useListUsers };
