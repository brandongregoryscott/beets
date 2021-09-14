import { Record } from "immutable";
import { File } from "types/file";

const defaultValues: File = {
    bucketid: "",
    createdbyid: undefined,
    createdon: undefined,
    deletedbyid: undefined,
    deletedon: undefined,
    id: "",
    name: "",
    path: "",
    type: "",
    updatedbyid: undefined,
    updatedon: undefined,
};

class FileRecord extends Record(defaultValues) implements File {}

export { FileRecord };
