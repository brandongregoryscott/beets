import { List, Map } from "immutable";
import { FileRecord } from "models/file-record";

const FileUtils = {
    mapToMidiNotes(files: List<FileRecord>): Map<string, FileRecord> {
        return Map<string, FileRecord>(
            files.map((file) => [file.getMidiNote(), file])
        );
    },
};

export { FileUtils };
