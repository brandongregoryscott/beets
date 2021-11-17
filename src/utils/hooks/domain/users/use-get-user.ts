import { SupabaseClient } from "generated/supabase-client";
import { UserRecord } from "models/user-record";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

const useGetUser = (
    id?: string
): UseQueryResult<UserRecord | undefined, Error> => {
    const { fromUsers } = SupabaseClient;

    const result = useQuery<UserRecord | undefined, Error>({
        enabled: id != null,
        fn: async () => {
            const { data, error } = await fromUsers()
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

export { useGetUser };
