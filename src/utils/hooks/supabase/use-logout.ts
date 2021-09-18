import { useAuth } from "utils/hooks/supabase/use-auth";
import { useMutation } from "utils/hooks/use-mutation";

const useLogout = () => {
    const auth = useAuth();

    const result = useMutation<boolean, Error>({
        fn: async () => {
            const logoutResult = await auth.signOut();
            const { error } = logoutResult;
            if (error != null) {
                throw error;
            }

            return true;
        },
    });

    return result;
};

export { useLogout };
