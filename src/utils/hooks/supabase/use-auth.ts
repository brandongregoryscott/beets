import { useSupabase } from "utils/hooks/supabase/use-supabase";

const useAuth = () => {
    const { supabase } = useSupabase();
    const { auth } = supabase;

    return auth;
};

export { useAuth };
