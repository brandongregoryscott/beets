import { UserCredentials } from "interfaces/user-credentials";
import { useAuth } from "utils/hooks/use-auth";
import { useMutation } from "utils/hooks/use-mutation";
import { Session, User } from "@supabase/supabase-js";
import { SupabaseUserRecord } from "models/supabase-user-record";

interface SignupResult {
    error: Error | null;
    session: Session | null;
    user: User | null;
}

const useRegister = () => {
    const auth = useAuth();

    const result = useMutation<SupabaseUserRecord, Error, UserCredentials>({
        fn: async (credentials: UserCredentials) => {
            const { email, password, redirectTo } = credentials;
            const signUpResult: SignupResult = await auth.signUp(
                { email, password },
                { redirectTo }
            );

            const { error: signUpError, user: supabaseUser } = signUpResult;
            if (signUpError != null) {
                throw signUpError;
            }

            return new SupabaseUserRecord(supabaseUser!);
        },
    });

    return result;
};

export { useRegister };
