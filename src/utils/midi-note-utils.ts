import { isEmpty, isNumber } from "lodash";
import { MidiNote } from "types/midi-note";
import { MidiNotes } from "constants/midi-notes";

export const isMidiNote = (
    maybeNote?: number | string
): maybeNote is MidiNote => {
    if (isEmpty(maybeNote) || isNumber(maybeNote)) {
        return false;
    }

    return MidiNotes.some((midiNote) => midiNote === maybeNote);
};
export const isSharp = (note: MidiNote): boolean => note.includes("#");
