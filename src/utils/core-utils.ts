import type { BorderPropsOptions } from "interfaces/border-props-options";
import type { BorderProps } from "interfaces/border-props";
import type { RequiredOrNil } from "types/required-or-nil";
import { List, Record } from "immutable";
import { isEqual as lodashIsEqual, pick as lodashPick } from "lodash";
import type { Constructor } from "types/constructor";
import type { Range } from "types/range";

const getBorderYProps = (options: BorderPropsOptions): BorderProps => {
    const { isFirst = false, isLast = false, borderRadius } = options;
    let borderProps: BorderProps = {};
    if (isFirst) {
        borderProps = {
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
        };
    }

    if (isLast && !isFirst) {
        borderProps = {
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
        };
    }

    return borderProps;
};

const getBorderXProps = (options: BorderPropsOptions): BorderProps => {
    const { isFirst = false, isLast = false, borderRadius } = options;
    let borderProps: BorderProps = {};
    if (isFirst) {
        borderProps = {
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
        };
    }

    if (isLast) {
        borderProps = {
            ...borderProps,
            borderTopRightRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
        };
    }

    return borderProps;
};

const isEqual = <
    TLeft extends Record<any> | any,
    TRight extends Record<any> | any
>(
    left: TLeft,
    right: TRight
): boolean => {
    if (Record.isRecord(left) && Record.isRecord(right)) {
        return left.equals(right);
    }

    return lodashIsEqual(left, right);
};

const isInstanceOf = <T, C extends Constructor[]>(
    value: T,
    ...construtors: C
): boolean => construtors.some((constructor) => value instanceof constructor);

const isNilOrEmpty = <T = any[] | List<any> | string>(
    value: any[] | List<any> | T | null | undefined
): value is null | undefined => {
    if (typeof value === "string") {
        return value.trim().length === 0;
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (List.isList(value)) {
        return value.isEmpty();
    }

    return value == null;
};

const isNotNilOrEmpty = <T = any[] | List<any> | string>(
    value: any[] | List<any> | T | null | undefined
): value is T => !isNilOrEmpty(value);

const makeDefaultValues = <T>(defaultValues: RequiredOrNil<T>): T =>
    defaultValues as T;

const pick = <T extends object, K extends keyof T = keyof T>(
    object: T,
    ...values: Array<K>
) => lodashPick<T, K>(object, ...values);

const randomInt = (range: Range): number => {
    const [min, max] = range;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const toList = <T>(value: List<T> | T | T[] | null | undefined): List<T> => {
    if (value == null) {
        return List<T>();
    }

    if (List.isList(value)) {
        return value;
    }

    if (Array.isArray(value)) {
        return List(value);
    }

    return List.of(value);
};

const unixTime = (date?: Date): number =>
    Math.floor((date?.getTime() ?? new Date().getTime()) / 1000);

export {
    getBorderYProps,
    getBorderXProps,
    isEqual,
    isInstanceOf,
    isNilOrEmpty,
    pick,
    isNotNilOrEmpty,
    makeDefaultValues,
    randomInt,
    unixTime,
    toList,
};
