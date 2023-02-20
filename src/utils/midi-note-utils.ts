import { isEmpty, isNumber } from "lodash";
import type { MidiNote } from "types/midi-note";
import { MidiNotes } from "constants/midi-notes";

const isMidiNote = (maybeNote?: number | string): maybeNote is MidiNote => {
    if (isEmpty(maybeNote) || isNumber(maybeNote)) {
        return false;
    }

    return MidiNotes.some((midiNote) => midiNote === maybeNote);
};

const isSharp = (note: MidiNote): boolean => note.includes("#");

export { isMidiNote, isSharp };
