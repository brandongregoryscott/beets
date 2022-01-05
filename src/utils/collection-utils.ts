import { List, Record } from "immutable";
import { Auditable } from "interfaces/auditable";
import { OrderableEntity } from "interfaces/orderable-entity";
import _ from "lodash";
import { Grouping } from "types/grouping";
import { isPersisted } from "utils/auditable-utils";
import { isNilOrEmpty } from "utils/core-utils";

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

const diffUpdatedEntities = <T extends Auditable>(
    values: List<T>,
    initialValues: List<T>
): List<T> =>
    List(
        _.differenceWith(values.toArray(), initialValues.toArray(), (a, b) => {
            const isDifferent =
                Record.isRecord(a) && Record.isRecord(b) && !a.equals(b);
            if (!isPersisted(a) || isDifferent) {
                return false; // Returning 'false' marks it as different/updated
            }

            return true;
        })
    );

const groupBy = <TLeft, TRight>(
    left: List<TLeft> | TLeft[] | undefined,
    right: List<TRight> | TRight[] | undefined,
    comparator: (left: TLeft, right: TRight) => boolean
): List<Grouping<TLeft, TRight>> => {
    left = List.isList(left) ? left.toArray() : List(left).toArray();
    right = List.isList(right) ? right.toArray() : List(right).toArray();

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

    return List(_.compact(zipped));
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
    leftValues: List<TLeft> | Array<TLeft>,
    rightValues: List<TRight> | Array<TRight>,
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

const sortByIndex = <T extends OrderableEntity>(values: List<T>): List<T> =>
    values.sortBy((value) => value.index);

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
    reorder,
    sortByIndex,
};
