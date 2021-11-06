import { Pgmigration } from "generated/interfaces/pgmigration";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

interface UseGetPgmigrationOptions {
    id: string;
}

const useGetPgmigration = (
    options: UseGetPgmigrationOptions
): UseQueryResult<Pgmigration | undefined, Error> => {
    const { fromPgmigrations } = useDatabase();
    const { id } = options;

    const result = useQuery<Pgmigration | undefined, Error>({
        key: Tables.Pgmigrations,
        fn: async () => {
            const query = fromPgmigrations()
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

            return data;
        },
    });

    return result;
};

export { useGetPgmigration };
