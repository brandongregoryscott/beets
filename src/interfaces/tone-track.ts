import Tone from "tone";
import { MidiNote } from "types/midi-note";

interface ToneTrack {
    channel: Tone.Channel;
    sampleMap: Record<MidiNote, string>;
    sampler: Tone.Sampler;
    sequence: Tone.Sequence;
}

export type { ToneTrack };
