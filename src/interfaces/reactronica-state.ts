import { StepNoteType } from "lib/reactronica";

interface ReactronicaState {
    index?: number;
    isMuted: boolean;
    isPlaying: boolean;
    notes: StepNoteType[];
}

export type { ReactronicaState };
