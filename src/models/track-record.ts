import { Track } from "interfaces/track";
import * as uuid from "uuid";
import { Record } from "immutable";
import { BaseRecord } from "models/base-record";
import { makeDefaultValues } from "utils/core-utils";

const defaultValues = makeDefaultValues<Track>({
    get id() {
        return uuid.v4();
    },
    name: "New Track",
    mute: false,
    solo: false,
    pan: 0,
    volume: 0,
});

class TrackRecord extends BaseRecord(Record(defaultValues)) implements Track {
    constructor(values?: Partial<Track>) {
        super(values ?? defaultValues);
    }
}

export { TrackRecord };
