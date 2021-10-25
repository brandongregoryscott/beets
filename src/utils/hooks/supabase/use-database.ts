import { definitions } from "generated/supabase";
import { useCallback } from "react";
import { useSupabase } from "utils/hooks/supabase/use-supabase";

const useDatabase = () => {
    const { supabase } = useSupabase();
    const from = useCallback(
        <TTableName extends keyof definitions>(tableName: TTableName) =>
            supabase.from<definitions[typeof tableName]>(tableName),
        [supabase]
    );

    return { from };
};

export { useDatabase };
