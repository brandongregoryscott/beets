import { List, Record as ImmutableRecord } from "immutable";
import { File } from "generated/interfaces/file";
import { makeDefaultValues } from "utils/core-utils";
import { env } from "utils/env";
import { SelectMenuItem } from "components/select-menu";
import { MidiNote } from "reactronica";
import { MidiNotes } from "constants/midi-notes";
import { valueByHash } from "utils/hash-utils";
import { FileUtils } from "utils/file-utils";
import { AuditableRecord } from "models/auditable-record";

const defaultValues = makeDefaultValues<File>({
    bucket_id: "",
    created_by_id: undefined,
    created_on: undefined,
    deleted_by_id: undefined,
    deleted_on: undefined,
    description: "",
    id: "",
    name: "",
    path: "",
    size: undefined,
    type: "",
    updated_by_id: undefined,
    updated_on: undefined,
});

class FileRecord
    extends AuditableRecord(ImmutableRecord(defaultValues))
    implements File
{
    public static toMidiNoteMap(
        files: List<FileRecord>
    ): Record<MidiNote, string> {
        const fileMap = FileUtils.mapToMidiNotes(files);

        const midiNoteMap: Record<string, string> = {};
        Object.entries(fileMap.toJSON()).forEach(([note, file]) => {
            midiNoteMap[note] = file.getPublicUrl();
        });

        return midiNoteMap;
    }

    public static toSelectMenuItems(
        files?: Array<FileRecord> | List<FileRecord>
    ): Array<SelectMenuItem<FileRecord>> {
        if (List.isList(files)) {
            files = files.toArray();
        }

        return (
            files?.map((file) => ({
                label: file.name,
                id: file.id,
                value: file,
            })) ?? []
        );
    }

    public getMidiNote(): MidiNote {
        return valueByHash(this.id, MidiNotes);
    }

    public getPath(): string {
        return `${this.created_by_id}/${this.path}`;
    }

    public getPublicUrl(): string {
        const { REACT_APP_SUPABASE_STORAGE_PUBLIC_URL: publicUrl } = env;
        return `${publicUrl}/${this.bucket_id}/${this.getPath()}`;
    }
}

export { FileRecord };
