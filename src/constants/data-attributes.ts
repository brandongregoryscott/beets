import { kebabCase, mapValues } from "lodash";
import keyMirror from "keymirror";

const DataAttributes = mapValues(
    keyMirror({
        endIndex: null,
        index: null,
        startIndex: null,
        stepCount: null,
    }),
    (value: string) => `data-${kebabCase(value)}`
);

export { DataAttributes };
