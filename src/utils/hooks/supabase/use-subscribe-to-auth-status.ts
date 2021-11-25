import { AuthChangeEvent, Session } from "@supabase/gotrue-js";
import { GlobalStateRecord } from "models/global-state-record";
import { SupabaseUserRecord } from "models/supabase-user-record";
import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Sitemap } from "sitemap";
import { SupabaseUser } from "types/supabase-user";
import { useAuth } from "utils/hooks/supabase/use-auth";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useLocalstorage } from "utils/hooks/use-local-storage";
import { useCreateOrUpdateUser } from "generated/hooks/domain/users/use-create-or-update-user";
import { UserRecord } from "models/user-record";
import { toaster } from "evergreen-ui";

interface LocalStorageSession {
    currentSession: {
        access_token: string;
        expires_at: number;
        expires_in: number;
        refresh_token: string;
        token_type: string;
        user: SupabaseUser;
    };
    expiresAt: number;
}

const useSubscribeToAuthStatus = () => {
    const auth = useAuth();
    const { globalState, setGlobalState } = useGlobalState();
    const [localStorageSession] = useLocalstorage<LocalStorageSession>(
        "supabase.auth.token"
    );

    const { mutate: createOrUpdateUser } = useCreateOrUpdateUser();
    const history = useHistory();

    const setUserFromSession = useCallback(
        (session: Session | null) => {
            if (session == null || session.user == null) {
                setGlobalState((prev) =>
                    prev.merge({ supabaseUser: undefined, user: undefined })
                );

                return;
            }

            const { user } = session;
            setGlobalState((prev: GlobalStateRecord) =>
                prev.merge({
                    user: UserRecord.fromSupabaseUser(user),
                    supabaseUser: new SupabaseUserRecord(user),
                })
            );
        },
        [setGlobalState]
    );

    const handleAuthStateChange = useCallback(
        (event: AuthChangeEvent, session: Session | null) => {
            if (event !== "SIGNED_IN" && event !== "SIGNED_OUT") {
                return;
            }

            if (event === "SIGNED_OUT") {
                toaster.notify("You were signed out.");
                setUserFromSession(null);
                history.push(Sitemap.login);
                return;
            }

            if (session?.user == null) {
                return;
            }

            const { user: supabaseUser } = session;

            // Ensure user is persisted on our side
            const user = UserRecord.fromSupabaseUser(supabaseUser);
            createOrUpdateUser(user);
            setUserFromSession(session);
            history.push(Sitemap.home);
        },
        [createOrUpdateUser, history, setUserFromSession]
    );

    useEffect(() => {
        const { data: authStateListener } = auth.onAuthStateChange(
            handleAuthStateChange
        );
        return authStateListener?.unsubscribe;
    }, [auth, handleAuthStateChange, setGlobalState]);

    if (!globalState.isAuthenticated() && localStorageSession != null) {
        setUserFromSession(localStorageSession.currentSession);
    }
};

export { useSubscribeToAuthStatus };
