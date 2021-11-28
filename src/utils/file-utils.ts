import { SelectMenuItem } from "components/select-menu";
import { List, Map } from "immutable";
import { FileRecord } from "models/file-record";
import { StorageProviderFileRecord } from "models/storage-provider-file-record";
import { MidiNote } from "reactronica";
import { isNilOrEmpty } from "utils/core-utils";

type AnyFile = FileRecord | StorageProviderFileRecord;

const FileUtils = {
    findHat<T extends AnyFile>(files?: List<T>): T | undefined {
        const closedHat = files
            ?.filter((file) => !FileUtils.isOpenHat(file))
            .find(this.isHat);

        return closedHat;
    },
    findKick<T extends AnyFile>(files?: List<T>): T | undefined {
        return files?.find(this.isKick);
    },
    findOpenHat<T extends AnyFile>(files?: List<T>): T | undefined {
        return files?.find(this.isOpenHat);
    },
    findSnare<T extends AnyFile>(files?: List<T>): T | undefined {
        return files?.find(this.isSnare);
    },
    isHat(file: AnyFile): boolean {
        const pattern = /[hH][aA][tT]/;
        return pattern.test(getFileName(file));
    },
    isOpenHat(file: AnyFile): boolean {
        const pattern = /[oO][pP][eE][nN]/;
        return pattern.test(getFileName(file));
    },
    isKick(file: AnyFile): boolean {
        const pattern = /[kK][iI][cC][kK]/;
        return pattern.test(getFileName(file));
    },
    isSnare(file: AnyFile): boolean {
        const pattern = /[sS][nN][aA][rR][eE]/;
        return pattern.test(getFileName(file));
    },
    toMidiNoteMap(files?: List<FileRecord>): Record<MidiNote, string> {
        if (isNilOrEmpty(files)) {
            return {} as Record<MidiNote, string>;
        }

        return Map(
            files.map((file) => [file.getMidiNote(), file.getPublicUrl()])
        ).toObject() as Record<MidiNote, string>;
    },
    toSelectMenuItems(
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
    },
};

const getFileName = (file: AnyFile): string =>
    file instanceof FileRecord ? file.path : file.name;

export { FileUtils };
