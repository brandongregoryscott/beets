import { List, Record } from "immutable";
import { Auditable } from "interfaces/auditable";
import { OrderableEntity } from "interfaces/orderable-entity";
import _ from "lodash";
import { Grouping } from "types/grouping";
import { isPersisted } from "utils/auditable-utils";
import { isEqual, isNilOrEmpty } from "utils/core-utils";

const diffDeletedEntities = <T extends Auditable>(
    initialValues: List<T>,
    values: List<T>
): List<T> =>
    List(
        _.differenceWith(
            initialValues.toArray(),
            values.toArray(),
            (a, b) => a.id === b.id
            // No need to delete entities that were never persisted
        ).filter(isPersisted)
    );

/**
 * Returns a list of entities that either do not exist in the initial list, are not persisted,
 * or have changed from their initial value
 */
const diffUpdatedEntities = <T extends Auditable>(
    values: List<T>,
    initialValues: List<T>
): List<T> => {
    const createdOrUpdated = values.filter((value) => {
        if (!isPersisted(value)) {
            return true;
        }

        // Find initial value by deep equality check - if a matching initialValue is found,
        // it means the entity is unchanged and shouldn't be returned
        const initialValue = initialValues.find((initialValue) =>
            isEqual(value, initialValue)
        );

        return initialValue == null;
    });

    return createdOrUpdated;
};

/**
 * Groups two collections of entities by the provided comparator. For sorting purposes, the left
 * collection's order will be retained
 */
const groupBy = <TLeft, TRight>(
    left: List<TLeft> | TLeft[] | undefined,
    right: List<TRight> | TRight[] | undefined,
    comparator: (left: TLeft, right: TRight) => boolean
): List<Grouping<TLeft, TRight>> => {
    left = List.isList(left) ? left.toArray() : List(left).toArray();
    right = List.isList(right) ? right.toArray() : List(right).toArray();

    const grouped: Array<Grouping<TLeft, TRight> | undefined> = left.map(
        (leftValue: TLeft) => {
            const rightValue = right?.find((rightValue: TRight) =>
                comparator(leftValue, rightValue)
            );

            if (rightValue == null) {
                return undefined;
            }

            return { left: leftValue, right: rightValue };
        }
    );

    return List(_.compact(grouped));
};

const hasValues = <T extends any[] | List<any> = any[] | List<any>>(
    value: T | null | undefined
): value is T => {
    if (value == null) {
        return false;
    }

    if (List.isList(value) && !value.isEmpty()) {
        return true;
    }

    return Array.isArray(value) && value.length > 0;
};

const initializeList = <T>(count: number, value: T): List<T> =>
    List(_.fill(new Array(count), value));

const intersectionWith = <TLeft, TRight>(
    leftValues: Array<TLeft> | List<TLeft>,
    rightValues: Array<TRight> | List<TRight>,
    comparator: (left: TLeft, right: TRight) => boolean
): List<TLeft> => {
    if (List.isList(leftValues)) {
        leftValues = leftValues.toArray();
    }

    if (List.isList(rightValues)) {
        rightValues = rightValues.toArray();
    }

    return List(
        leftValues.filter((left) =>
            rightValues.some((right) => comparator(left, right))
        )
    );
};

const mapTo = <TSource, TDestination>(
    collection: Array<TSource> | List<TSource>,
    constructor: new (...args: any[]) => TDestination
): TDestination[] =>
    _.map<TSource, TDestination>(
        List.isList(collection) ? collection.toArray() : collection,
        (source) => new constructor(source)
    );

const mapToList = <TSource, TDestination>(
    collection: Array<TSource> | List<TSource>,
    constructor: new (...args: any[]) => TDestination
): List<TDestination> => List(mapTo(collection, constructor));

const rebaseIndexes = <T extends OrderableEntity>(
    values: List<T>,
    filter?: (value: T) => boolean
): List<T> => {
    if (filter == null) {
        return values.map((value, index) =>
            Record.isRecord(value)
                ? value.merge({ index })
                : _.merge(value, { index })
        );
    }

    const filteredValues = values.filter(filter);
    return values.filterNot(filter).concat(rebaseIndexes(filteredValues));
};

const reorder = <T extends OrderableEntity>(
    values: List<T>,
    sourceIndex: number,
    destinationIndex: number
): List<T> => {
    const sourceValue = values.get(sourceIndex);
    const destinationValue = values.get(destinationIndex);
    if (sourceValue == null || destinationValue == null) {
        return values;
    }

    const sourceUpdate = { index: destinationIndex };
    const destinationUpdate = { index: sourceIndex };
    return values
        .update(sourceIndex, (source) =>
            Record.isRecord(source)
                ? source.merge(sourceUpdate)
                : _.merge(source, sourceUpdate)
        )
        .update(destinationIndex, (destination) =>
            Record.isRecord(destination)
                ? destination.merge(destinationUpdate)
                : _.merge(destination, destinationUpdate)
        )
        .sortBy((value) => value.index);
};

const sortBy = <T>(
    collection: Array<T> | List<T>,
    fields: Array<keyof T> | ((value: T) => number | string | undefined)
): List<T> => {
    const array = List.isList(collection) ? collection.toArray() : collection;
    return List<T>(_.sortBy(array, fields));
};

export {
    diffDeletedEntities,
    diffUpdatedEntities,
    groupBy,
    hasValues,
    initializeList,
    intersectionWith,
    isNilOrEmpty,
    mapTo,
    mapToList,
    rebaseIndexes,
    reorder,
    sortBy,
};
