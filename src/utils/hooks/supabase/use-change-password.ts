import { UserAttributes } from "@supabase/supabase-js";
import { useAuth } from "utils/hooks/supabase/use-auth";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";
import { ResetPasswordQueryParams } from "utils/hooks/use-reset-password-route";

interface ChangePasswordOptions
    extends Pick<ResetPasswordQueryParams, "access_token">,
        Pick<UserAttributes, "password"> {}

interface UseChangePasswordResult
    extends UseMutationResult<void, Error, ChangePasswordOptions> {}

const useChangePassword = (): UseChangePasswordResult => {
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
    });

    return result;
};

export { useChangePassword };
export type { ChangePasswordOptions, UseChangePasswordResult };
