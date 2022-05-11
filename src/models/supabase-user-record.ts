import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { SupabaseUser } from "types/supabase-user";
import { makeDefaultValues } from "utils/core-utils";

const defaultValues = makeDefaultValues<SupabaseUser>({
    action_link: undefined,
    app_metadata: {
        provider: undefined,
    },
    aud: "",
    confirmation_sent_at: undefined,
    confirmed_at: undefined,
    created_at: "",
    email: undefined,
    email_change_sent_at: undefined,
    email_confirmed_at: undefined,
    id: "",
    identities: undefined,
    invited_at: undefined,
    last_sign_in_at: undefined,
    new_email: undefined,
    phone: undefined,
    phone_confirmed_at: undefined,
    recovery_sent_at: undefined,
    role: undefined,
    updated_at: undefined,
    user_metadata: {},
});

class SupabaseUserRecord
    extends BaseRecord(Record(defaultValues))
    implements SupabaseUser {}

export { SupabaseUserRecord };
