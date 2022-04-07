import { useAuth } from "utils/hooks/supabase/use-auth";
import { useMutation, UseMutationResult } from "utils/hooks/use-mutation";

interface UseResetPasswordResult
    extends UseMutationResult<void, Error, string> {}

const useResetPassword = (): UseResetPasswordResult => {
    const auth = useAuth();

    const result = useMutation<void, Error, string>({
        fn: async (email: string) => {
            const resetResult = await auth.api.resetPasswordForEmail(email);

            const { error } = resetResult;
            if (error != null) {
                throw error;
            }
        },
    });

    return result;
};

export { useResetPassword };
