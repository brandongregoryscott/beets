import { User } from "generated/interfaces/user";
import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { RecordParams } from "types/record-params";
import { makeDefaultValues } from "utils/core-utils";
import { AuditableRecord } from "models/auditable-record";

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
    extends AuditableRecord(BaseRecord(Record(defaultValues)))
    implements User
{
    constructor(values?: RecordParams<UserRecord>) {
        super(values ?? defaultValues);
    }
}

export { UserRecord };
