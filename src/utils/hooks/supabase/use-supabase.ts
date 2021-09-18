import { createClient } from "@supabase/supabase-js";

const env: any = process.env;
const supabase = createClient(
    env.REACT_APP_SUPABASE_URL,
    env.REACT_APP_SUPABASE_ANON_KEY
);

const useSupabase = () => {
    return { supabase };
};

export { useSupabase };
