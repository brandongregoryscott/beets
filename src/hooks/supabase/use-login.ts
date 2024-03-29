import type { UserCredentials } from "interfaces/user-credentials";
import { useAuth } from "hooks/supabase/use-auth";
import { useMutation } from "hooks/use-mutation";
import { ErrorMessages } from "constants/error-messages";
import type { SupabaseUser } from "types/supabase-user";
import { identifyUser, trackLoginFailed } from "utils/analytics-utils";

interface UseLoginOptions {
    onError?: (error: Error) => void;
    onSuccess?: (user: SupabaseUser) => void;
}

const useLogin = (options?: UseLoginOptions) => {
    const { onError, onSuccess } = options ?? {};
    const auth = useAuth();

    const result = useMutation<SupabaseUser, Error, UserCredentials>({
        fn: async (credentials: UserCredentials) => {
            const { email, password } = credentials;
            const { error, data } = await auth.signInWithPassword({
                email,
                password,
            });

            const { user } = data;
            if (error != null) {
                trackLoginFailed(email, error);
            }

            const emailIsNotConfirmed =
                error?.message === ErrorMessages.EMAIL_NOT_CONFIRMED;

            if (emailIsNotConfirmed) {
                throw new Error(ErrorMessages.EMAIL_NOT_CONFIRMED_CHECK_EMAIL);
            }

            if (error != null) {
                throw error;
            }

            identifyUser(user!);
            return user!;
        },
        onError,
        onSuccess,
    });

    return result;
};

export { useLogin };
