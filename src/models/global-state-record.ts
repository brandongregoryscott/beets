import { Record } from "immutable";
import type { GlobalState } from "interfaces/global-state";
import { BaseRecord } from "models/base-record";
import { SupabaseUserRecord } from "models/supabase-user-record";
import { UserRecord } from "models/user-record";
import type { SupabaseUser } from "types/supabase-user";
import { makeDefaultValues } from "utils/core-utils";

const defaultValues = makeDefaultValues<GlobalState>({
    enableHolidayMode: true,
    supabaseUser: undefined,
    user: undefined,
});

class GlobalStateRecord
    extends BaseRecord(Record(defaultValues))
    implements GlobalState
{
    public isAuthenticated(): boolean {
        return this.supabaseUser != null && this.user != null;
    }

    public userId(): string | undefined {
        return this.supabaseUser?.id ?? this.user?.id;
    }

    public setUser(supabaseUser?: SupabaseUser): GlobalStateRecord {
        if (supabaseUser == null) {
            return this.merge({ user: undefined, supabaseUser: undefined });
        }

        return this.merge({
            user: UserRecord.fromSupabaseUser(supabaseUser),
            supabaseUser: new SupabaseUserRecord(supabaseUser),
        });
    }

    public toggleHolidayMode(): GlobalStateRecord {
        return this.merge({ enableHolidayMode: !this.enableHolidayMode });
    }
}

export { GlobalStateRecord };
