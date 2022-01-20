import { MidiNote } from "@brandongregoryscott/reactronica";

const MidiNoteUtils = {
    isSharp(note: MidiNote): boolean {
        return note.includes("#");
    },
};

export { MidiNoteUtils };
