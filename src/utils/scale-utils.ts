import { SelectMenuItem } from "components/select-menu/select-menu";
import { Scale } from "enums/scale";
import { flatMap, range } from "lodash";
import { scale as getNotesByScale } from "scribbletune";
import { Range } from "types/range";

const getAllNotesByScale = (scale: Scale, octaveRange: Range): string[] => {
    const [start, end] = octaveRange;

    const notes = flatMap(range(start, end > start ? end : end + 1), (octave) =>
        getNotesByScale(scale.replace(" ", `${octave} `))
    );

    return notes;
};

const options: Array<SelectMenuItem<Scale>> = Object.entries(Scale).map(
    ([label, value]): SelectMenuItem<Scale> => ({
        id: label,
        label: value,
        value,
    })
);

export { getAllNotesByScale, options };
