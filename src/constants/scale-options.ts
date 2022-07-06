import type { SelectMenuItem } from "components/select-menu/select-menu";
import { Scale } from "enums/scale";

const ScaleOptions: Array<SelectMenuItem<Scale>> = Object.entries(Scale).map(
    ([label, value]): SelectMenuItem<Scale> => ({
        id: label,
        label: value,
        value,
    })
);

export { ScaleOptions };
