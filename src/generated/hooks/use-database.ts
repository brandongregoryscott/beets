import { File } from "generated/interfaces/file";
import { Pgmigration } from "generated/interfaces/pgmigration";
import { Project } from "generated/interfaces/project";
import { User } from "generated/interfaces/user";
import { useCallback } from "react";
import { useSupabase } from "utils/hooks/supabase/use-supabase";

const useDatabase = () => {
        useCallback(
            (tableName: Tables) =>
                supabase.from<definitions[typeof tableName]>(tableName),
            [supabase]
        )
    };

export { useDatabase };
