import { Record } from "immutable";
import { SupabaseUser } from "types/supabase-user";

const defaultValues: SupabaseUser = {
    id: "",
    app_metadata: {
        provider: undefined,
    },
    user_metadata: {},
    aud: "",
    confirmation_sent_at: undefined,
    recovery_sent_at: undefined,
    action_link: undefined,
    email: undefined,
    phone: undefined,
    created_at: "",
    confirmed_at: undefined,
    email_confirmed_at: undefined,
    phone_confirmed_at: undefined,
    last_sign_in_at: undefined,
    role: undefined,
    updated_at: undefined,
};

class SupabaseUserRecord
    extends Record(defaultValues)
    implements SupabaseUser {}

export { SupabaseUserRecord };
