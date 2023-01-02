import { sum } from "lodash";
import { partitionValueToArray } from "utils/core-utils";

describe("CoreUtils", () => {
    describe("partitionValueToArray", () => {
        interface PartitionValueToArraySetup {
            expected: number[];
            slices: number;
            value: number;
        }

        it.each`
            value  | slices | expected
            ${100} | ${4}   | ${[25, 25, 25, 25]}
            ${75}  | ${4}   | ${[19, 19, 19, 18]}
            ${127} | ${1}   | ${[127]}
            ${127} | ${3}   | ${[43, 43, 41]}
            ${5}   | ${5}   | ${[1, 1, 1, 1, 1]}
            ${5}   | ${6}   | ${[1, 1, 1, 1, 1, 0]}
        `(
            `should return '$expected' when value is '$value' and slices is '$slices'`,
            ({ value, slices, expected }: PartitionValueToArraySetup) => {
                const result = partitionValueToArray(value, slices);

                expect(result).toStrictEqual(expected);
                expect(sum(result)).toBe(value);
            }
        );
    });
});
