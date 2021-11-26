import { List, Map } from "immutable";
import { FileRecord } from "models/file-record";
import { StorageProviderFileRecord } from "models/storage-provider-file-record";

type AnyFile = FileRecord | StorageProviderFileRecord;

const FileUtils = {
    findHat<T extends AnyFile>(files?: List<T>): T | undefined {
        const closedHat = files
            ?.filter((file) => !FileUtils.isOpenHat(file))
            .find(this.isHat);

        console.log("closedHat", closedHat);
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
    mapToMidiNotes(files: List<FileRecord>): Map<string, FileRecord> {
        return Map<string, FileRecord>(
            files.map((file) => [file.getMidiNote(), file])
        );
    },
};

const getFileName = (file: AnyFile): string =>
    file instanceof FileRecord ? file.path : file.name;

export { FileUtils };
