import { List, Set, Record as ImmutableRecord, Map } from "immutable";
import { File } from "generated/interfaces/file";
import { initializeList, makeDefaultValues } from "utils/core-utils";
import { env } from "utils/env";
import { BaseRecord } from "models/base-record";
import { SelectMenuItem } from "components/select-menu";
import { MidiNote, StepType } from "reactronica";
import { MidiNotes } from "constants/midi-notes";
import { valueByHash } from "utils/hash-utils";

const defaultValues = makeDefaultValues<File>({
    bucketid: "",
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
    extends BaseRecord(ImmutableRecord(defaultValues))
    implements File
{
    public static toMidiNoteMap(
        files: List<FileRecord>
    ): Record<MidiNote, string> {
        const fileMap = mapFilesToNotes(files);

        const midiNoteMap: Record<string, string> = {};
        Object.entries(fileMap).forEach(([note, file]) => {
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

    public static toStepTypes(files: List<List<FileRecord>>): Array<StepType> {
        const fileMap = Map(
            mapFilesToNotes(Set(files.flatMap((list) => list)).toList())
        );

        let steps = initializeList<StepType>(files.count(), []);
        files.forEach((fileList, index) => {
            if (fileList.isEmpty()) {
                return;
            }

            const stepNotes = fileList
                .map((file) => ({
                    name: fileMap.keyOf(file)!,
                }))
                .toArray() as StepType;

            steps = steps.set(index, stepNotes);
        });

        return steps.toArray();
    }

    public getMidiNote(): MidiNote {
        return valueByHash(this.id, MidiNotes);
    }

    public getPath(): string {
        return `${this.created_by_id}/${this.path}`;
    }

    public getPublicUrl(): string {
        const { REACT_APP_SUPABASE_STORAGE_PUBLIC_URL: publicUrl } = env;
        return `${publicUrl}/${this.bucketid}/${this.getPath()}`;
    }
}

const mapFilesToNotes = (files: List<FileRecord>): Record<string, FileRecord> =>
    Map<string, FileRecord>(
        files.map((file) => [file.getMidiNote(), file])
    ).toJSON();

export { FileRecord };
