import { SelectMenuItem } from "components/select-menu/select-menu";
import { List, Map } from "immutable";
import { FileRecord } from "models/file-record";
import { StorageProviderFileRecord } from "models/storage-provider-file-record";
import { MidiNote } from "types/midi-note";
import { isNilOrEmpty } from "utils/core-utils";

type AnyFile = FileRecord | StorageProviderFileRecord;

const findFileByName = <T extends AnyFile>(
    nameOrPattern: RegExp | string,
    files?: List<T>
): T | undefined =>
    files?.find((file) => getFileName(file).match(nameOrPattern) != null);

const findHat = <T extends AnyFile>(files?: List<T>): T | undefined =>
    files?.filter((file) => !isOpenHat(file)).find(isHat);

const findKick = <T extends AnyFile>(files?: List<T>): T | undefined =>
    files?.find(isKick);

const findOpenHat = <T extends AnyFile>(files?: List<T>): T | undefined =>
    files?.find(isOpenHat);

const findSnare = <T extends AnyFile>(files?: List<T>): T | undefined =>
    files?.find(isSnare);

const getFileById = (
    fileId?: string,
    files?: FileRecord[] | List<FileRecord>
): FileRecord | undefined => files?.find((file) => file.id === fileId);

const getFileName = (file: AnyFile): string =>
    file instanceof FileRecord ? file.path : file.name;

const isHat = (file: AnyFile): boolean => {
    const pattern = /[hH][aA][tT]/;
    return pattern.test(getFileName(file));
};

const isOpenHat = (file: AnyFile): boolean => {
    const pattern = /[oO][pP][eE][nN]/;
    return pattern.test(getFileName(file));
};

const isKick = (file: AnyFile): boolean => {
    const pattern = /[kK][iI][cC][kK]/;
    return pattern.test(getFileName(file));
};

const isSnare = (file: AnyFile): boolean => {
    const pattern = /[sS][nN][aA][rR][eE]/;
    return pattern.test(getFileName(file));
};

/**
 * Returns a map of public file url to a note for use with the PianoRoll component. For now,
 * it only sets the root note at C4 and lets Tone pitch the sound up/down
 */
const toInstrumentMap = (file?: FileRecord): Record<MidiNote, string> => {
    if (file == null) {
        return {} as Record<MidiNote, string>;
    }

    return {
        C4: file.getPublicUrl(),
    } as Record<MidiNote, string>;
};

const toSelectMenuItems = (
    files?: Array<FileRecord> | List<FileRecord>
): Array<SelectMenuItem<FileRecord>> => {
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
};

/**
 * Returns a mapping of public file urls to midi notes for use with the Sequencer component
 */
const toSequencerMap = (files?: List<FileRecord>): Record<MidiNote, string> => {
    if (isNilOrEmpty(files)) {
        return {} as Record<MidiNote, string>;
    }

    return Map(
        files.map((file) => [file.getMidiNote(), file.getPublicUrl()])
    ).toObject() as Record<MidiNote, string>;
};

export {
    findFileByName,
    findHat,
    findKick,
    findOpenHat,
    findSnare,
    getFileById,
    toInstrumentMap,
    toSelectMenuItems,
    toSequencerMap,
};
