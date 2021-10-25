import { Tables } from "generated/enums/tables";
import { definitions } from "generated/supabase";
import { useCallback } from "react";
import { useSupabase } from "utils/hooks/supabase/use-supabase";

const useDatabase = () => {
    const { supabase } = useSupabase();
    const from = useCallback(
        (tableName: Tables) =>
            supabase.from<definitions[typeof tableName]>(tableName),
        [supabase]
    );

    return { from };
};

export { useDatabase };
