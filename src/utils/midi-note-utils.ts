import { MidiNote } from "@brandongregoryscott/reactronica";

const defaultNote: MidiNote = "C5";

const MidiNoteUtils = {
    defaultNote,
    isSharp(note: MidiNote): boolean {
        return note.includes("#");
    },
};

export { MidiNoteUtils };
