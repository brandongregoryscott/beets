import { Sitemap } from "sitemap";
import { useAuth } from "utils/hooks/supabase/use-auth";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";
import { joinPaths } from "utils/route-utils";

interface UseResetPasswordResult
    extends UseMutationResult<void, Error, string> {}

const useResetPassword = (): UseResetPasswordResult => {
    const auth = useAuth();

    const result = useMutation<void, Error, string>({
        fn: async (email: string) => {
            const resetResult = await auth.api.resetPasswordForEmail(email, {
                redirectTo: joinPaths(
                    window.location.origin,
                    Sitemap.resetPassword
                ),
            });

            const { error } = resetResult;
            if (error != null) {
                throw error;
            }
        },
    });

    return result;
};

export { useResetPassword };
