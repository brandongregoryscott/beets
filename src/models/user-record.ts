import type { User } from "generated/interfaces/user";
import { Record } from "immutable";
import type { RecordParams } from "types/record-params";
import { makeDefaultValues } from "utils/core-utils";
import { AuditableRecord } from "models/auditable-record";
import type { SupabaseUser } from "types/supabase-user";

const defaultValues = makeDefaultValues<User>({
    id: "",
    created_on: undefined,
    created_by_id: undefined,
    deleted_on: undefined,
    deleted_by_id: undefined,
    email: "",
    updated_on: undefined,
    updated_by_id: undefined,
});

class UserRecord
    extends AuditableRecord(Record(defaultValues))
    implements User
{
    constructor(values?: RecordParams<UserRecord>) {
        super(values ?? defaultValues);
    }

    public static fromSupabaseUser(supabaseUser: SupabaseUser): UserRecord {
        const { created_at, updated_at, id, email } = supabaseUser;
        return new UserRecord({
            ...defaultValues,
            created_on: created_at,
            created_by_id: id,
            email,
            id,
            updated_on: updated_at,
            updated_by_id: id,
        });
    }
}

export { UserRecord };
