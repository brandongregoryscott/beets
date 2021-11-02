import { User } from "generated/interfaces/user";
import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { makeDefaultValues } from "utils/core-utils";

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

class UserRecord extends BaseRecord(Record(defaultValues)) implements User {
    constructor(values?: Partial<User>) {
        super(values ?? defaultValues);
    }
}

export { UserRecord };
