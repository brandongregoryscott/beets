import type { UserAttributes } from "@supabase/supabase-js";
import { useAuth } from "utils/hooks/supabase/use-auth";
import type { UseMutationResult } from "utils/hooks/use-mutation";
import { useMutation } from "utils/hooks/use-mutation";
import type { ResetPasswordQueryParams } from "utils/hooks/use-reset-password-route";

interface ChangePasswordOptions
    extends Pick<ResetPasswordQueryParams, "access_token">,
        Pick<UserAttributes, "password"> {}

interface UseChangePasswordOptions {
    onSuccess?: () => void;
}

interface UseChangePasswordResult
    extends UseMutationResult<void, Error, ChangePasswordOptions> {}

const useChangePassword = (
    options?: UseChangePasswordOptions
): UseChangePasswordResult => {
    const { onSuccess } = options ?? {};
    const auth = useAuth();

    const result = useMutation<void, Error, ChangePasswordOptions>({
        fn: async (options: ChangePasswordOptions) => {
            const { access_token, password } = options;
            const updateResult = await auth.api.updateUser(access_token!, {
                password,
            });

            const { error } = updateResult;
            if (error != null) {
                throw error;
            }
        },
        onSuccess,
    });

    return result;
};

export { useChangePassword };
export type { ChangePasswordOptions, UseChangePasswordResult };
