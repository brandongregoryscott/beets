import { UserRecord } from "models/user-record";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

interface UseGetUserOptions {
    id: string;
}

const useGetUser = (
    options: UseGetUserOptions
): UseQueryResult<UserRecord | undefined, Error> => {
    const { fromUsers } = useDatabase();
    const { id } = options;

    const result = useQuery<UserRecord | undefined, Error>({
        key: Tables.Users,
        fn: async () => {
            const query = fromUsers()
                .select("*")
                .eq("id", id)
                .limit(1)
                .single();
            const { data, error } = await query;
            if (error != null) {
                throw error;
            }

            if (data == null) {
                return undefined;
            }

            return new UserRecord(data);
        },
    });

    return result;
};

export { useGetUser };
