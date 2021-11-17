import { List, Record } from "immutable";
import { Auditable } from "interfaces/auditable";
import { BorderPropsOptions } from "interfaces/border-props-options";
import { BorderProps } from "interfaces/border-props";
import { Entity } from "interfaces/entity";
import _ from "lodash";
import { Grouping } from "types/grouping";
import { nil } from "types/nil";
import { RequiredOrUndefined } from "types/required-or-undefined";
import * as uuid from "uuid";

const diffDeletedEntities = <T extends Entity>(
    initialValues: List<T>,
    values: List<T>
): List<T> =>
    List(
        _.differenceWith(
            initialValues.toArray(),
            values.toArray(),
            (a, b) => a.id === b.id
            // No need to delete entities that were never persisted
        ).filter((entities) => !isTemporaryId(entities.id))
    );

const diffUpdatedEntities = <T extends Auditable>(
    values: List<T>,
    initialValues: List<T>
): List<T> =>
    List(
        _.differenceWith(values.toArray(), initialValues.toArray(), (a, b) => {
            const isNew = isTemporaryId(a.id);
            const isDifferent =
                Record.isRecord(a) && Record.isRecord(b) && !a.equals(b);
            if (isNew || isDifferent) {
                return false; // Returning 'false' marks it as different/updated
            }

            return true;
        })
    );

const hasValues = <T extends any[] | List<any> = any[] | List<any>>(
    value: T | null | undefined
): value is T => {
    if (value == null) {
        return false;
    }

    if (List.isList(value) && !value.isEmpty()) {
        return true;
    }

    return Array.isArray(value) && value.length > 1;
};

const hash = (value: string): number => {
    let hash = 5381;
    let i = value.length;

    while (i > 0) {
        hash = (hash * 33) ^ value.charCodeAt(--i);
    }

    return hash >>> 0;
};

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

const getTemporaryId = (): string => `temp-${uuid.v4()}`;

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

const initializeList = <T>(count: number, value: T): List<T> =>
    List(_.fill(new Array(count), value));

const isNilOrEmpty = (value: nil<string | any[] | List<any>>): value is nil => {
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

const isTemporaryId = (value?: string): boolean =>
    !isNilOrEmpty(value) && value!.startsWith("temp-");

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

const unixTime = (date?: Date): number =>
    Math.floor((date?.getTime() ?? new Date().getTime()) / 1000);

export {
    diffDeletedEntities,
    diffUpdatedEntities,
    getBorderYProps,
    getBorderXProps,
    getTemporaryId,
    groupBy,
    hash,
    hasValues,
    initializeList,
    isNilOrEmpty,
    isTemporaryId,
    makeDefaultValues,
    mapTo,
    randomFloat,
    randomInt,
    unixTime,
};
