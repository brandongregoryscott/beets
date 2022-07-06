import type { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { SupabaseClient } from "generated/supabase-client";

const useAuth = (): SupabaseAuthClient => {
    const { auth } = SupabaseClient;

    return auth;
};

export { useAuth };
