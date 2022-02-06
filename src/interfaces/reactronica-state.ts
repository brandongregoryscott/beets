import { StepNoteType } from "lib/reactronica";

interface ReactronicaState {
    /** Step index to stop playing the track at */
    endIndex?: number;
    /** Current index being played */
    index?: number;
    isMuted: boolean;
    isPlaying: boolean;
    /** Current notes being played */
    notes: StepNoteType[];
    /** Step index to start playing the track at */
    startIndex?: number;
}

export type { ReactronicaState };
