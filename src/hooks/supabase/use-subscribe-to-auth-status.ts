import type { AuthChangeEvent, Session } from "@supabase/gotrue-js";
import { useCallback, useEffect } from "react";
import { Sitemap } from "sitemap";
import { useAuth } from "hooks/supabase/use-auth";
import { useGlobalState } from "hooks/use-global-state";
import { toaster } from "evergreen-ui";
import { identifyUser } from "utils/analytics-utils";
import { useRouter } from "hooks/use-router";

const useSubscribeToAuthStatus = () => {
    const auth = useAuth();
    const { setGlobalState } = useGlobalState();

    const { navigate } = useRouter();

    const handleAuthStateChange = useCallback(
        (event: AuthChangeEvent, session: Session | null) => {
            if (
                (event === "TOKEN_REFRESHED" || event === "SIGNED_IN") &&
                session?.user != null
            ) {
                identifyUser(session.user);
                return;
            }

            if (event !== "SIGNED_OUT") {
                return;
            }

            toaster.notify("You were signed out.");
            setGlobalState((prev) => prev.setUser(undefined));
            navigate(Sitemap.login);
            return;
        },
        [navigate, setGlobalState]
    );

    useEffect(() => {
        const { data: authStateListener } = auth.onAuthStateChange(
            handleAuthStateChange
        );
        return authStateListener?.subscription.unsubscribe;
    }, [auth, handleAuthStateChange, setGlobalState]);
};

export { useSubscribeToAuthStatus };
