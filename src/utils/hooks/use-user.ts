import { UserRecord } from "models/user-record";
import { useDatabase } from "utils/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

const useUser = (
    id?: string
): UseQueryResult<UserRecord | undefined, Error> => {
    const { from } = useDatabase();
    const userTable = from("users");

    const result = useQuery<UserRecord | undefined, Error>({
        enabled: id != null,
        fn: async () => {
            const { data, error } = await userTable
                .select("*")
                .eq("id", id)
                .limit(1)
                .single();

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

export { useUser };
