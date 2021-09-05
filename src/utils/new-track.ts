import { Track } from "interfaces/track";
import * as uuid from "uuid";

const newTrack = (): Track => ({
    id: uuid.v4(),
    name: "New Track",
    mute: false,
    solo: false,
    pan: 0,
    volume: 0,
});

export { newTrack };
