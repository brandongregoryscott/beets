import { Record } from "immutable";
import { User } from "types/user";

const defaultValues: User = {
    id: "",
    createdon: undefined,
    createdbyid: undefined,
    deletedon: undefined,
    deletedbyid: undefined,
    email: "",
    updatedon: undefined,
    updatedbyid: undefined,
};

class UserRecord extends Record(defaultValues) implements User {}

export { UserRecord };
