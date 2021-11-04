import { User } from "generated/interfaces/user";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

const useListUsers = (): UseQueryResult<User[], Error> => {
    const { fromUsers } = useDatabase();
    const listQuery = useQuery<User[], Error>({
        key: Tables.Users,
        fn: async () => {
            const result = await fromUsers().select("*");
            const { data, error } = result;
            if (error != null) {
                throw error;
            }

            return data ?? [];
        },
    });

    return listQuery;
};

export { useListUsers };
