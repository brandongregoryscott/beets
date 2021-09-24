import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { User } from "types/user";
import { makeDefaultValues } from "utils/core-utils";

const defaultValues = makeDefaultValues<User>({
    id: "",
    createdon: undefined,
    createdbyid: undefined,
    deletedon: undefined,
    deletedbyid: undefined,
    email: "",
    updatedon: undefined,
    updatedbyid: undefined,
});

class UserRecord extends BaseRecord(Record(defaultValues)) implements User {
    constructor(values?: Partial<User>) {
        super(values ?? defaultValues);
    }
}

export { UserRecord };
