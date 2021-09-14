import { Record } from "immutable";
import { GlobalState } from "interfaces/global-state";

const defaultValues: GlobalState = {
    supabaseUser: undefined,
    user: undefined,
};

class GlobalStateRecord extends Record(defaultValues) implements GlobalState {
    public isAuthenticated(): boolean {
        return this.supabaseUser != null && this.user != null;
    }

    public with(values: Partial<GlobalState>): GlobalStateRecord {
        return new GlobalStateRecord(Object.assign(this.toJS(), values));
    }
}

export { GlobalStateRecord };
