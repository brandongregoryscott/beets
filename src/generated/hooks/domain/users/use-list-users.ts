import { UserRecord } from "models/user-record";
import { User } from "generated/interfaces/user";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

interface UseListUsersOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<User>
    ) => PostgrestFilterBuilder<User>;
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: UserRecord[]) => void;
}

const defaultFilter = (query: PostgrestFilterBuilder<User>) => query;

const useListUsers = (
    options?: UseListUsersOptions
): UseQueryResult<UserRecord[], Error> => {
    const { fromUsers } = useDatabase();
    const {
        enabled,
        filter = defaultFilter,
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
        key: ["List", Tables.Users],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListUsers };
