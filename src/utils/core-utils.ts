import { List } from "immutable";
import _ from "lodash";
import { SetStateAction } from "react";
import { Grouping } from "types/grouping";
import { nil } from "types/nil";
import { RequiredOrUndefined } from "types/required-or-undefined";
import * as uuid from "uuid";

const hash = (value: string): number => {
    let hash = 5381;
    let i = value.length;

    while (i > 0) {
        hash = (hash * 33) ^ value.charCodeAt(--i);
    }

    return hash >>> 0;
};

const initializeList = <T>(count: number, value: T): List<T> =>
    List(_.fill(new Array(count), value));

const isNilOrEmpty = (value: nil<string | any[]>): value is nil => {
    if (typeof value === "string") {
        return value.trim().length === 0;
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    return value == null;
};

const isTemporaryId = (value?: string): boolean =>
    !isNilOrEmpty(value) && value!.startsWith("temp-");

const getTemporaryId = (): string => `temp-${uuid.v4()}`;

const getUpdatedState = <T>(previousValue: T, update: SetStateAction<T>) =>
    _.isFunction(update) ? update(previousValue) : update;

const groupBy = <TLeft, TRight>(
    left: TLeft[] | undefined,
    right: TRight[] | undefined,
    comparator: (left: TLeft, right: TRight) => boolean
): Array<Grouping<TLeft, TRight>> => {
    left = left ?? [];
    right = right ?? [];

    left = _.intersectionWith(left, right, comparator).sort();
    right = _.intersectionWith(right, left, (right, left) =>
        comparator(left, right)
    ).sort();

    const zipped = _.zipWith(
        left,
        right,
        (left: TLeft, right: TRight): Grouping<TLeft, TRight> | undefined => {
            if (left == null || right == null || !comparator(left, right)) {
                return undefined;
            }

            return { left, right };
        }
    );

    return _.compact(zipped);
};

const makeDefaultValues = <T>(defaultValues: RequiredOrUndefined<T>): T =>
    defaultValues as T;

const mapTo = <TSource, TDestination>(
    collection: TSource[],
    constructor: new (...args: any[]) => TDestination
) =>
    _.map<TSource, TDestination>(
        collection,
        (source) => new constructor(source)
    );

const randomFloat = (min: number, max: number): number =>
    Math.random() * (max - min) + min;

const randomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export {
    hash,
    initializeList,
    isNilOrEmpty,
    isTemporaryId,
    getTemporaryId,
    getUpdatedState,
    groupBy,
    mapTo,
    randomFloat,
    randomInt,
    makeDefaultValues,
};
