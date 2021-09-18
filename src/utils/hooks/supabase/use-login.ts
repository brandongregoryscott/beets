import { UserCredentials } from "interfaces/user-credentials";
import { useAuth } from "utils/hooks/supabase/use-auth";
import { useMutation } from "utils/hooks/use-mutation";
import { useDatabase } from "utils/hooks/supabase/use-database";
import { UserRecord } from "models/user-record";
import { ErrorMessages } from "constants/error-messages";

const useLogin = () => {
    const auth = useAuth();
    const { from } = useDatabase();

    const result = useMutation<UserRecord, Error, UserCredentials>({
        fn: async (credentials: UserCredentials) => {
            const userTable = from("users");

            const { email, password, redirectTo } = credentials;
            const loginResult = await auth.signIn(
                { email, password },
                { redirectTo }
            );

            const { error: loginError, user: supabaseUser } = loginResult;
            const emailNotConfirmedError =
                loginError != null &&
                loginError.message === ErrorMessages.EMAIL_NOT_CONFIRMED;

            if (emailNotConfirmedError) {
                throw new Error(ErrorMessages.EMAIL_NOT_CONFIRMED_CHECK_EMAIL);
            }

            if (loginError != null) {
                throw loginError;
            }

            console.log("auth.user().id", auth.user()?.id);

            console.log("supabaseUser?.id", supabaseUser?.id);
            const existingUserResult = await userTable
                .select("*")
                .eq("id", supabaseUser?.id)
                .limit(1)
                .single();

            const { data: existingUser } = existingUserResult;

            if (existingUser != null) {
                return new UserRecord(existingUser);
            }

            const createUserResult = await userTable.insert({
                id: supabaseUser?.id,
                email: supabaseUser?.email,
            });

            const { error: createUserError, data } = createUserResult;
            if (createUserError != null) {
                throw createUserError;
            }

            return new UserRecord(data?.[0]);
        },
    });

    return result;
};

export { useLogin };
