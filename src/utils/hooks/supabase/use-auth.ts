import { SupabaseClient } from "generated/supabase-client";

const useAuth = () => {
    const { auth } = SupabaseClient;

    return auth;
};

export { useAuth };
