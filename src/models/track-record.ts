import { Track } from "interfaces/track";
import * as uuid from "uuid";
import { Record } from "immutable";

const defaultValues: Track = {
    get id() {
        return uuid.v4();
    },
    name: "New Track",
    mute: false,
    solo: false,
    pan: 0,
    volume: 0,
};

class TrackRecord extends Record(defaultValues) implements Track {
    constructor(values?: Partial<Track>) {
        values = values ?? { ...defaultValues };

        super(values);
    }

    public toPOJO(): Track {
        return this.toJS() as Track;
    }

    public with(values: Partial<Track>): TrackRecord {
        return new TrackRecord(Object.assign(this.toJS(), values));
    }
}

export { TrackRecord };
