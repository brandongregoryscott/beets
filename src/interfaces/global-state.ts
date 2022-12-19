import type { SupabaseUserRecord } from "models/supabase-user-record";
import type { UserRecord } from "models/user-record";

interface GlobalState {
    enableHolidayMode: boolean;
    supabaseUser?: SupabaseUserRecord;
    user?: UserRecord;
}

export type { GlobalState };
