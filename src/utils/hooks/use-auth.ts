import { useSupabase } from "utils/hooks/use-supabase";

const useAuth = () => {
    const { supabase } = useSupabase();
    const { auth } = supabase;

    return auth;
};

export { useAuth };
