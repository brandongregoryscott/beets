import { UserRecord } from "models/user-record";
import { User } from "generated/interfaces/user";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseUpdateUserOptions {
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: UserRecord) => void;
}

const useUpdateUser = (
    options?: UseUpdateUserOptions
): UseMutationResult<UserRecord, Error, User> => {
    const { fromUsers } = useDatabase();
    const { onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const update = async (user: User) => {
        const { data, error } = await fromUsers()
            .update(user instanceof UserRecord ? user.toPOJO() : user)
            .eq("id", user.id)
            .single();

        if (error != null) {
            throw error;
        }

        return new UserRecord(data!);
    };

    const result = useMutation<UserRecord, Error, User>({
        fn: update,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(Tables.Users);
            onSettled?.();
        },
    });

    return result;
};

export { useUpdateUser };
