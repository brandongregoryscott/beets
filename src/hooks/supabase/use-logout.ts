import { useAuth } from "hooks/supabase/use-auth";
import { useMutation } from "hooks/use-mutation";

interface UseLogoutOptions {
    onError?: (error: Error) => void;
    onSettled?: () => void;
    onSuccess?: () => void;
}

const useLogout = (options?: UseLogoutOptions) => {
    const { onError, onSettled, onSuccess } = options ?? {};
    const auth = useAuth();

    const result = useMutation<void, Error>({
        fn: async () => {
            const logoutResult = await auth.signOut();
            const { error } = logoutResult;
            if (error != null) {
                throw error;
            }
        },
        onError,
        onSuccess,
        onSettled,
    });

    return result;
};

export { useLogout };
