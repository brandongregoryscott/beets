import { CreateUserDto } from "interfaces/create-user-dto";
import { useAuth } from "utils/hooks/use-auth";
import { useMutation } from "utils/hooks/use-mutation";
import { Session, User } from "@supabase/supabase-js";
import { useDatabase } from "utils/hooks/use-database";
import { SupabaseUserRecord } from "models/supabase-user-record";

interface SignupResult {
    error: Error | null;
    session: Session | null;
    user: User | null;
}

const useSignup = () => {
    const auth = useAuth();
    const { from } = useDatabase();
    const userTable = from("users");

    const result = useMutation<SupabaseUserRecord, Error, CreateUserDto>({
        fn: async (newUser: CreateUserDto) => {
            const { email, password, redirectTo } = newUser;
            const signUpResult: SignupResult = await auth.signUp(
                { email, password },
                { redirectTo }
            );

            const { error: signUpError, user: supabaseUser } = signUpResult;
            if (signUpError != null) {
                throw signUpError;
            }

            return new SupabaseUserRecord(supabaseUser!);

            // const { error: signInError } = await auth.signIn({
            //     email,
            //     password,
            // });

            // if (signInError != null) {
            //     throw signInError;
            // }

            // const createUserResult = await userTable.insert({
            //     id: supabaseUser?.id,
            //     email: supabaseUser?.email,
            // });

            // const { error: createUserError, data } = createUserResult;
            // if (createUserError != null) {
            //     throw createUserError;
            // }

            // const user = new UserRecord(data?.[0]);
            // return user;
        },
    });

    return result;
};

export { useSignup };
