import { MidiNote } from "reactronica";

const MidiNoteUtils = {
    isSharp(note: MidiNote): boolean {
        return note.includes("#");
    },
};

export { MidiNoteUtils };
