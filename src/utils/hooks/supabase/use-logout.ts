import { useAuth } from "utils/hooks/supabase/use-auth";
import { useMutation } from "utils/hooks/use-mutation";

const useLogout = () => {
    const auth = useAuth();

    const result = useMutation<void, Error>({
        fn: async () => {
            const logoutResult = await auth.signOut();
            const { error } = logoutResult;
            if (error != null) {
                throw error;
            }
        },
    });

    return result;
};

export { useLogout };
