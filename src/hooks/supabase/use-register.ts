import type { UserCredentials } from "interfaces/user-credentials";
import { useAuth } from "hooks/supabase/use-auth";
import { useMutation } from "hooks/use-mutation";
import type { AuthResponse } from "@supabase/supabase-js";
import {
    identifyUser,
    trackUserCreated,
    trackUserCreationAttempted,
} from "utils/analytics-utils";

const useRegister = () => {
    const auth = useAuth();

    const result = useMutation<void, Error, UserCredentials>({
        fn: async (credentials: UserCredentials) => {
            const { email, password, redirectTo } = credentials;
            trackUserCreationAttempted(email);

            const signUpResult: AuthResponse = await auth.signUp({
                email,
                password,
                options: { emailRedirectTo: redirectTo },
            });

            const { error, data } = signUpResult;
            const { user } = data;
            if (error != null) {
                throw error;
            }

            identifyUser(user!);
            trackUserCreated(user!);
        },
    });

    return result;
};

export { useRegister };
