import { AuthChangeEvent, Session } from "@supabase/gotrue-js";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sitemap } from "sitemap";
import { useAuth } from "utils/hooks/supabase/use-auth";
import { useGlobalState } from "utils/hooks/use-global-state";
import { toaster } from "evergreen-ui";
import { identifyUser } from "utils/analytics-utils";

const useSubscribeToAuthStatus = () => {
    const auth = useAuth();
    const { setGlobalState } = useGlobalState();

    const navigate = useNavigate();

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
        return authStateListener?.unsubscribe;
    }, [auth, handleAuthStateChange, setGlobalState]);
};

export { useSubscribeToAuthStatus };
