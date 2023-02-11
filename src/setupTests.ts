// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
/* @ts-ignore */
import * as jestExtendedMatchers from "jest-extended";
import { factories } from "test/factories";
import { matchers } from "test/matchers";

expect.extend(jestExtendedMatchers);
expect.extend(matchers);

beforeEach(() => {
    Object.values(factories).forEach((factory) => {
        factory.rewindSequence();
    });
});
