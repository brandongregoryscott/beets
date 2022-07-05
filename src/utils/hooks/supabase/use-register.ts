import { UserCredentials } from "interfaces/user-credentials";
import { useAuth } from "utils/hooks/supabase/use-auth";
import { useMutation } from "utils/hooks/use-mutation";
import { ApiError, Session, User } from "@supabase/supabase-js";
import {
    identifyUser,
    trackUserCreated,
    trackUserCreationAttempted,
} from "utils/analytics-utils";

interface SignupResult {
    error: ApiError | null;
    session: Session | null;
    user: User | null;
}

const useRegister = () => {
    const auth = useAuth();

    const result = useMutation<void, ApiError, UserCredentials>({
        fn: async (credentials: UserCredentials) => {
            const { email, password, redirectTo } = credentials;
            trackUserCreationAttempted(email);

            const signUpResult: SignupResult = await auth.signUp(
                { email, password },
                { redirectTo }
            );

            const { error, user } = signUpResult;
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
