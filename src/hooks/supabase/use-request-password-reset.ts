import { Sitemap } from "sitemap";
import { trackPasswordResetRequested } from "utils/analytics-utils";
import { useAuth } from "hooks/supabase/use-auth";
import type { UseMutationResult } from "hooks/use-mutation";
import { useMutation } from "hooks/use-mutation";
import { joinPaths } from "utils/route-utils";

interface UseRequestPasswordResetResult
    extends UseMutationResult<void, Error, string> {}

const useRequestPasswordReset = (): UseRequestPasswordResetResult => {
    const auth = useAuth();

    const result = useMutation<void, Error, string>({
        fn: async (email: string) => {
            trackPasswordResetRequested(email);

            const { error } = await auth.resetPasswordForEmail(email, {
                redirectTo: joinPaths(
                    window.location.origin,
                    Sitemap.resetPassword
                ),
            });

            if (error != null) {
                throw error;
            }
        },
    });

    return result;
};

export { useRequestPasswordReset };
