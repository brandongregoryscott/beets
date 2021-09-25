import { Track } from "interfaces/track";
import * as uuid from "uuid";
import { List, Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { initializeList, makeDefaultValues } from "utils/core-utils";
import { FileRecord } from "models/file-record";

const defaultValues = makeDefaultValues<Track>({
    files: List<FileRecord>(),
    get id() {
        return uuid.v4();
    },
    mute: false,
    name: "New Track",
    pan: 0,
    solo: false,
    steps: initializeList(16, null),
    volume: 0,
});

class TrackRecord extends BaseRecord(Record(defaultValues)) implements Track {
    constructor(values?: Partial<Track>) {
        values = values ?? defaultValues;

        if (values.files != null) {
            values.files = List(values.files);
        }

        super(values);
    }

    public addFile(file: FileRecord): TrackRecord {
        if (this.files.includes(file)) {
            return this;
        }

        return this.merge({ files: this.files.push(file) });
    }

    public removeFile(file: FileRecord): TrackRecord {
        if (!this.files.includes(file)) {
            return this;
        }

        return this.merge({
            files: this.files.remove(this.files.indexOf(file)),
        });
    }
}

export { TrackRecord };
