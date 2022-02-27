import { kebabCase, mapValues } from "lodash";

const DataAttributes = mapValues(
    {
        endIndex: "endIndex",
        index: "index",
        startIndex: "startIndex",
        stepCount: "stepCount",
    },
    (value: string) => `data-${kebabCase(value)}`
);

export { DataAttributes };
