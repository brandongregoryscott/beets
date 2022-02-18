import { MidiNote } from "types/midi-note";

const defaultNote: MidiNote = "C4";

const MidiNoteUtils = {
    defaultNote,
    isSharp(note: MidiNote): boolean {
        return note.includes("#");
    },
};

export { MidiNoteUtils };
