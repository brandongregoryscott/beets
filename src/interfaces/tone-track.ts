import Tone from "tone";

interface ToneTrack {
    channel: Tone.Channel;
    sampler: Tone.Sampler;
    sequence: Tone.Sequence;
}

export type { ToneTrack };
