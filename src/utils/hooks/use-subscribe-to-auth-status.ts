import { AuthChangeEvent, Session } from "@supabase/gotrue-js";
import { GlobalStateRecord } from "models/global-state-record";
import { SupabaseUserRecord } from "models/supabase-user-record";
import { useCallback, useEffect } from "react";
import { useAuth } from "utils/hooks/use-auth";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useUser } from "utils/hooks/use-user";

const useSubscribeToAuthStatus = () => {
    const auth = useAuth();
    const { globalState, setGlobalState } = useGlobalState();
    const { resultObject: user } = useUser(globalState.supabaseUser?.id);

    const handleAuthStateChange = useCallback(
        (event: AuthChangeEvent, session: Session | null) => {
            if (event !== "SIGNED_IN" && event !== "SIGNED_OUT") {
                return;
            }

            if (event === "SIGNED_OUT") {
                setGlobalState((prev) =>
                    prev.with({ supabaseUser: undefined, user: undefined })
                );
            }

            if (session?.user != null) {
                const { user } = session;
                setGlobalState((prev: GlobalStateRecord) =>
                    prev.with({
                        supabaseUser: new SupabaseUserRecord(user),
                    })
                );
            }
        },
        [setGlobalState]
    );

    useEffect(() => {
        const authStateChange = auth.onAuthStateChange(handleAuthStateChange);
        console.log("authStateChange", authStateChange);
        return authStateChange.data?.unsubscribe;
    }, [auth, handleAuthStateChange, setGlobalState]);

    useEffect(() => {
        setGlobalState((prev: GlobalStateRecord) => prev.with({ user }));
    }, [user, setGlobalState]);
};

export { useSubscribeToAuthStatus };
