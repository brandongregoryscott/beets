import type { Collection } from "immutable";
import type { OrderableEntity } from "interfaces/orderable-entity";
import { isFunction } from "lodash";

const toHaveCount = <T extends Collection<K, V>, K, V>(
    collection: T,
    expectedOrFilter: number | ((value: V, key: K) => boolean),
    expected?: number
): jest.CustomMatcherResult => {
    const hasFilter = isFunction(expectedOrFilter);
    const actualCount = hasFilter
        ? collection.count(expectedOrFilter)
        : collection.count();

    const expectedCount = hasFilter ? expected : expectedOrFilter;

    const pass = expectedCount === actualCount;

    const message = () =>
        `Expected collection to have ${expectedCount} count, but received ${actualCount}`;

    return { pass, message };
};

const toBeOrderedByIndex = <
    T extends Collection<K, V>,
    K,
    V extends OrderableEntity
>(
    collection: T,
    filter?: (value: V, key: K) => boolean
): jest.CustomMatcherResult => {
    collection = isFunction(filter) ? collection.filter(filter) : collection;

    let isOrdered = true;
    let expectedIndex = 0;
    let actualIndex = 0;
    collection.toList().forEach((value, index) => {
        expectedIndex = index;
        actualIndex = value.index;

        if (expectedIndex === actualIndex) {
            return;
        }

        isOrdered = false;
    });

    const pass = isOrdered;

    const message = () =>
        `Expected collection to be ordered by index, but element at index ${expectedIndex} has an index value of ${actualIndex}`;

    return { pass, message };
};

export { toBeOrderedByIndex, toHaveCount };
