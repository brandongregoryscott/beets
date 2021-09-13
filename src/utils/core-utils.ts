import { nil } from "types/nil";

const CoreUtils = {
    randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    },
    randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
};

const isNilOrEmpty = (value: nil<string | any[]>): value is nil => {
    if (typeof value === "string") {
        return value.trim().length === 0;
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    return value == null;
};

export { CoreUtils, isNilOrEmpty };
