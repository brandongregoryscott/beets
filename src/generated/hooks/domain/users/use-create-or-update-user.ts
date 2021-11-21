import { UserRecord } from "models/user-record";
import { User } from "generated/interfaces/user";
import { Tables } from "generated/enums/tables";
import { useQueryClient } from "react-query";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";
import { isTemporaryId } from "utils/core-utils";
import { isNilOrEmpty } from "utils/collection-utils";
import { useCreateUser } from "generated/hooks/domain/users/use-create-user";
import { useUpdateUser } from "generated/hooks/domain/users/use-update-user";

interface UseCreateOrUpdateUserOptions {
    onError?: (error: Error) => void;
    onSuccess?: (resultObject: UserRecord) => void;
}

const useCreateOrUpdateUser = (
    options?: UseCreateOrUpdateUserOptions
): UseMutationResult<UserRecord, Error, User> => {
    const { onError, onSuccess } = options ?? {};
    const queryClient = useQueryClient();
    const { mutateAsync: createUser } = useCreateUser();
    const { mutateAsync: updateUser } = useUpdateUser();

    const createOrUpdate = async (user: User) =>
        isNilOrEmpty(user.id) || isTemporaryId(user.id)
            ? createUser(user)
            : updateUser(user);

    const result = useMutation<UserRecord, Error, User>({
        fn: createOrUpdate,
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries(["List", Tables.Users]);
        },
    });

    return result;
};

export { useCreateOrUpdateUser };
