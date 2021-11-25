import { Record } from "immutable";
import { GlobalState } from "interfaces/global-state";
import { BaseRecord } from "models/base-record";
import { makeDefaultValues } from "utils/core-utils";

const defaultValues = makeDefaultValues<GlobalState>({
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
}

export { GlobalStateRecord };
