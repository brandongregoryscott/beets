import { List } from "immutable";
import type { MatcherHintOptions } from "jest-matcher-utils";
import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";
import { getLabelPrinter } from "jest-matcher-utils";

interface GetMessageFunctionOptions {
    /**
     * Context passed from jest containing matcher metadata
     */
    context: jest.MatcherContext;
    /**
     * Expected collection that is being asserted against. For matchers that aren't being passed a list
     * or array, this should be undefined and the `expectedValue` will be used in the `expect(receivedValue).toBe(expectedValue)`
     * output instead
     */
    expectedCollection?: any[] | List<any>;
    expectedLabel: string;
    expectedValue: number | string | undefined;
    matcherName: string;
    /**
     * Full collection that is being asserted against. For matchers that aren't being passed a list
     * or array, this should be undefined and the `receivedValue` will be used in the `expect(receivedValue).toBe(expectedValue)`
     * output instead
     */
    receivedCollection?: any[] | List<any>;
    receivedLabel: string;
    /**
     * Received value that is being asserted against the expected value
     */
    receivedValue: number | string | undefined;
}

const getMessageFunction = (options: GetMessageFunctionOptions) => {
    const {
        context,
        expectedLabel,
        expectedCollection,
        expectedValue,
        matcherName,
        receivedCollection,
        receivedLabel,
        receivedValue,
    } = options;

    const printLabel = getLabelPrinter(expectedLabel, receivedLabel);

    const { isNot, promise } = context;
    const matcherHintOptions: MatcherHintOptions = {
        isNot,
        promise,
    };

    const hint = `${matcherHint(
        matcherName,
        hintValueToString(receivedValue, receivedCollection),
        hintValueToString(expectedValue, expectedCollection),
        matcherHintOptions
    )}\n\n`;

    return () =>
        `${hint}${printLabel(expectedLabel)}${
            isNot ? "not " : " "
        }${printExpected(expectedValue)}\n${printLabel(receivedLabel)}${
            isNot ? "    " : " "
        }${printReceived(receivedValue)}`;
};

const hintValueToString = (
    value: number | string | undefined,
    collection?: any[] | List<any>
): string | undefined => {
    if (List.isList(collection)) {
        collection = collection.toArray();
    }

    if (Array.isArray(collection)) {
        return `[${collection.join(", ")}]`;
    }

    return value?.toString();
};

export { getMessageFunction };
