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
import { useGetUser } from "utils/hooks/domain/users/use-get-user";

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
    const [session] = useLocalstorage<LocalStorageSession>(
        "supabase.auth.token"
    );
    const { resultObject: user } = useGetUser(globalState.supabaseUser?.id);
    const history = useHistory();

    const handleAuthStateChange = useCallback(
        (event: AuthChangeEvent, session: Session | null) => {
            if (event !== "SIGNED_IN" && event !== "SIGNED_OUT") {
                return;
            }

            if (event === "SIGNED_OUT") {
                setGlobalState((prev) =>
                    prev.merge({ supabaseUser: undefined, user: undefined })
                );
                history.push(Sitemap.home);
                return;
            }

            if (session?.user == null) {
                return;
            }

            const { user } = session;
            setGlobalState((prev: GlobalStateRecord) =>
                prev.merge({
                    supabaseUser: new SupabaseUserRecord(user),
                })
            );

            history.push(Sitemap.home);
        },
        [history, setGlobalState]
    );

    useEffect(() => {
        const { data: authStateListener } = auth.onAuthStateChange(
            handleAuthStateChange
        );
        return authStateListener?.unsubscribe;
    }, [auth, handleAuthStateChange, setGlobalState]);

    useEffect(() => {
        setGlobalState((prev: GlobalStateRecord) => {
            let updated = prev;
            if (prev.user != null && user == null) {
                updated = updated.merge({ user: undefined });
            }

            if (prev.user == null && user != null) {
                updated = updated.merge({ user });
            }

            return updated;
        });
    }, [user, setGlobalState]);

    useEffect(() => {
        if (session == null) {
            setGlobalState((prev: GlobalStateRecord) =>
                prev.merge({ supabaseUser: undefined, user: undefined })
            );
            return;
        }

        setGlobalState((prev: GlobalStateRecord) => {
            let updated = prev;

            const { currentSession } = session;
            if (currentSession?.user == null) {
                return prev;
            }

            const { user: supabaseUser } = currentSession;

            if (prev.supabaseUser != null && supabaseUser == null) {
                updated = updated.merge({ supabaseUser: undefined });
            }

            if (prev.supabaseUser == null && supabaseUser != null) {
                updated = updated.merge({
                    supabaseUser: new SupabaseUserRecord(supabaseUser),
                });
            }

            return updated;
        });
    }, [session, setGlobalState]);
};

export { useSubscribeToAuthStatus };
