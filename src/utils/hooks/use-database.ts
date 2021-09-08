import { useCallback } from "react";
import { useSupabase } from "utils/hooks/use-supabase";
import { definitions } from "types/supabase";

const useDatabase = () => {
    const { supabase } = useSupabase();
    const from = useCallback(
        <T extends keyof definitions>(tableName: T) =>
            supabase.from<T>(tableName),
        [supabase]
    );

    return { from };
};

export { useDatabase };
