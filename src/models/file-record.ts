import { Record } from "immutable";
import { File } from "types/file";
import { env } from "utils/env";

const defaultValues: File = {
    bucketid: "",
    createdbyid: undefined,
    createdon: undefined,
    deletedbyid: undefined,
    deletedon: undefined,
    id: "",
    name: "",
    path: "",
    size: undefined,
    type: "",
    updatedbyid: undefined,
    updatedon: undefined,
};

class FileRecord extends Record(defaultValues) implements File {
    public getPath(): string {
        return `${this.createdbyid}/${this.path}`;
    }

    public getPublicUrl(): string | undefined {
        const { REACT_APP_SUPABASE_STORAGE_PUBLIC_URL: publicUrl } = env;
        if (publicUrl == null) {
            return undefined;
        }

        return `${publicUrl}/${this.bucketid}/${this.getPath()}`;
    }

    public toPOJO(): File {
        return this.toJS() as File;
    }
}

export { FileRecord };
