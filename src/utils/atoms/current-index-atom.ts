import { atomWithReset } from "jotai/utils";

/**
 * Tracks the current index of the playing step. Starts at -1 to be in sync with the first step that
 * increments to 0.
 */
const CurrentIndexAtom = atomWithReset<number>(-1);

export { CurrentIndexAtom };
