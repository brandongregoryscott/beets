import { Scale } from "enums/scale";
import { List } from "immutable";
import { flatMap, isEmpty, range } from "lodash";
/* @ts-ignore */
import { scale as getNotesByScale } from "harmonics";
import { Range } from "types/range";
import { toList } from "utils/core-utils";

const getAllNotesByScale = (scale: Scale, octaveRange: Range): string[] => {
    const [start, end] = octaveRange;

    const notes = flatMap(range(start, end > start ? end : end + 1), (octave) =>
        getNotesByScale(scale.replace(" ", `${octave} `))
    );

    return notes;
};

/**
 * Returns the matching `Scale` from the given notes, if it can be found.
 */
const getScaleByNotes = (notes: List<string> | string[]): Scale | undefined => {
    if (isEmpty(notes)) {
        return undefined;
    }

    const matchingScale = Object.values(Scale).find((scale) => {
        const scaleNotes = List(getAllNotesByScale(scale, [1, 7]));
        return toList(notes).isSubset(scaleNotes);
    });

    return matchingScale;
};

export { getAllNotesByScale, getScaleByNotes };
