import { UserRecord } from "models/user-record";
import { User } from "generated/interfaces/user";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseCreateOrUpdateUserOptions {
    onConflict?: keyof User;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: (resultObject: UserRecord) => void;
}

const useCreateOrUpdateUser = (
    options?: UseCreateOrUpdateUserOptions
): UseMutationResult<UserRecord, Error, User> => {
    const { fromUsers } = SupabaseClient;
    const { onConflict, onError, onSettled, onSuccess } = options ?? {};
    const queryClient = useQueryClient();

    const createOrUpdate = async (user: User) => {
        const { data, error } = await fromUsers()
            .upsert(user instanceof UserRecord ? user.toPOJO() : user, {
                onConflict,
            })
            .limit(1)
            .single();

        if (error != null) {
            throw error;
        }

        return new UserRecord(data!);
    };

    const result = useMutation<UserRecord, Error, User>({
        fn: createOrUpdate,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(Tables.Users);
            onSettled?.();
        },
    });

    return result;
};

export { useCreateOrUpdateUser };
