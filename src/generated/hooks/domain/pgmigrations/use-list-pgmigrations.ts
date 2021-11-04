import { Pgmigration } from "generated/interfaces/pgmigration";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

const useListPgmigrations = (): UseQueryResult<Pgmigration[], Error> => {
    const { fromPgmigrations } = useDatabase();
    const listQuery = useQuery<Pgmigration[], Error>({
        key: Tables.Pgmigrations,
        fn: async () => {
            const result = await fromPgmigrations().select("*");
            const { data, error } = result;
            if (error != null) {
                throw error;
            }

            return data ?? [];
        },
    });

    return listQuery;
};

export { useListPgmigrations };
