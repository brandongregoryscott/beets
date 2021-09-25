import { Record } from "immutable";
import { File } from "types/file";
import { makeDefaultValues } from "utils/core-utils";
import { env } from "utils/env";
import { BaseRecord } from "models/base-record";
import { SelectMenuItem } from "components/select-menu";

const defaultValues = makeDefaultValues<File>({
    bucketid: "",
    createdbyid: undefined,
    createdon: undefined,
    deletedbyid: undefined,
    deletedon: undefined,
    description: "",
    id: "",
    name: "",
    path: "",
    size: undefined,
    type: "",
    updatedbyid: undefined,
    updatedon: undefined,
});

class FileRecord extends BaseRecord(Record(defaultValues)) implements File {
    public static toSelectMenuItems(
        files?: Array<FileRecord>
    ): Array<SelectMenuItem<FileRecord>> {
        return (
            files?.map((file) => ({
                label: file.name,
                id: file.id,
                value: file,
            })) ?? []
        );
    }

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
}

export { FileRecord };
