import { UserRecord } from "models/user-record";
import { User } from "generated/interfaces/user";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateUserOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: UserRecord) => void;
}

const useCreateUser = (
    options?: UseCreateUserOptions
): UseMutationResult<UserRecord, Error, User> => {
    const { fromUsers } = useDatabase();
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const create = async (user: User) => {
        const { data, error } = await fromUsers()
            .insert(user)
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return new UserRecord(data!);
    };

    const result = useMutation<UserRecord, Error, User>({
        fn: create,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(Tables.Users);
        },
    });

    return result;
};

export { useCreateUser };
