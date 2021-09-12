import { SupabaseUserRecord } from "models/supabase-user-record";
import { UserRecord } from "models/user-record";

interface GlobalState {
    supabaseUser?: SupabaseUserRecord;
    user?: UserRecord;
}

export type { GlobalState };
