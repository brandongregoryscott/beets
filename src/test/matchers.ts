import type { Collection } from "immutable";
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

export { toHaveCount };
