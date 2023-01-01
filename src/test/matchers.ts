import type { Collection } from "immutable";
import { Range } from "immutable";
import type { OrderableEntity } from "interfaces/orderable-entity";
import { isFunction } from "lodash";
import { getMessageFunction } from "test/matcher-utils";

function toHaveCount<K, V>(
    collection: Collection<K, V>,
    expected: number
): jest.CustomMatcherResult;
function toHaveCount<K, V>(
    collection: Collection<K, V>,
    filter: (value: V, key: K) => boolean,
    expected: number
): jest.CustomMatcherResult;
function toHaveCount<K, V>(
    this: jest.MatcherContext,
    collection: Collection<K, V>,
    expectedOrFilter: number | ((value: V, key: K) => boolean),
    expected?: number
): jest.CustomMatcherResult {
    const hasFilter = isFunction(expectedOrFilter);
    const receivedValue = hasFilter
        ? collection.count(expectedOrFilter)
        : collection.count();

    const expectedValue = hasFilter ? expected : expectedOrFilter;

    const pass = expectedValue === receivedValue;

    const message = getMessageFunction({
        expectedLabel: "Expected collection to have count",
        receivedLabel: "Received count",
        matcherName: toHaveCount.name,
        context: this,
        expectedValue,
        receivedValue,
    });

    return { pass, message };
}

function toBeOrderedByIndex<K, V extends OrderableEntity>(
    collection: Collection<K, V>
): jest.CustomMatcherResult;
function toBeOrderedByIndex<K, V extends OrderableEntity>(
    collection: Collection<K, V>,
    filter: (value: V, key: K) => boolean
): jest.CustomMatcherResult;
function toBeOrderedByIndex<K, V extends OrderableEntity>(
    this: jest.MatcherContext,
    collection: Collection<K, V>,
    filter?: (value: V, key: K) => boolean
): jest.CustomMatcherResult {
    collection = isFunction(filter) ? collection.filter(filter) : collection;

    let isOrdered = true;
    let expectedValue = 0;
    let receivedValue = 0;
    collection.toList().forEach((value, index) => {
        expectedValue = index;
        receivedValue = value.index;

        if (expectedValue === receivedValue) {
            return;
        }

        isOrdered = false;
    });

    const commonLabel = `index property at collection index ${expectedValue}`;

    const message = getMessageFunction({
        expectedLabel: `Expected ${commonLabel}`,
        receivedLabel: `Received ${commonLabel}`,
        matcherName: toBeOrderedByIndex.name,
        context: this,
        expectedValue,
        expectedCollection: Range(0, collection.count()).toArray(),
        receivedCollection: collection.map((value) => value.index).toArray(),
        receivedValue,
    });

    return { pass: isOrdered, message };
}

const matchers = {
    toBeOrderedByIndex,
    toHaveCount,
};

export { matchers };
