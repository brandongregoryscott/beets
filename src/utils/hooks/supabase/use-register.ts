import { UserCredentials } from "interfaces/user-credentials";
import { useAuth } from "utils/hooks/supabase/use-auth";
import { useMutation } from "utils/hooks/use-mutation";
import { ApiError, Session, User } from "@supabase/supabase-js";

interface SignupResult {
    error: ApiError | null;
    session: Session | null;
    user: User | null;
}

const useRegister = () => {
    const auth = useAuth();

    const result = useMutation<void, Error, UserCredentials>({
        fn: async (credentials: UserCredentials) => {
            const { email, password, redirectTo } = credentials;
            const signUpResult: SignupResult = await auth.signUp(
                { email, password },
                { redirectTo }
            );

            const { error } = signUpResult;
            if (error != null) {
                throw error;
            }
        },
    });

    return result;
};

export { useRegister };
