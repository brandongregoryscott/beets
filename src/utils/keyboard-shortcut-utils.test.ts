import { castArray } from "lodash";
import {
    getDisplayLabel,
    hasKey,
    remapShortcuts,
    sanitizeKeys,
    splitKeys,
} from "utils/keyboard-shortcut-utils";
import * as navigatorUtils from "./navigator-utils";

describe("KeyboardShortcutUtils", () => {
    describe("getDisplayLabel", () => {
        test.each`
            shortcut          | isMacOs  | expected
            ${"ctrl+a"}       | ${true}  | ${"⌘A"}
            ${"CTRL+A"}       | ${true}  | ${"⌘A"}
            ${"ctrl+a,cmd+a"} | ${true}  | ${"⌘A"}
            ${"ctrl+a"}       | ${false} | ${"Ctrl+A"}
            ${"cmd+a"}        | ${false} | ${"Ctrl+A"}
            ${"CmD  +  a"}    | ${false} | ${"Ctrl+A"}
        `(
            `should return '$expected' when shortcut is '$shortcut' and isMacOs is $isMacOs`,
            ({ shortcut, isMacOs, expected }) => {
                // Arrange
                jest.spyOn(navigatorUtils, "isMacOs").mockReturnValue(isMacOs);

                // Act
                const result = getDisplayLabel(shortcut);

                // Assert
                expect(result).toBe(expected);
            }
        );
    });

    describe("hasKey", () => {
        test.each`
            shortcut                   | key                    | expected
            ${"ctrl"}                  | ${["ctrl"]}            | ${true}
            ${"ctrl+a"}                | ${["ctrl"]}            | ${true}
            ${"CONTROL + a"}           | ${["control"]}         | ${true}
            ${["control+a", "ctrl+a"]} | ${["control", "ctrl"]} | ${true}
            ${["control+a", "ctrl+a"]} | ${["control"]}         | ${true}
            ${"control+a"}             | ${["ctrl"]}            | ${false}
            ${"cmd + a"}               | ${["control"]}         | ${false}
            ${"a"}                     | ${["control"]}         | ${false}
            ${"alt"}                   | ${["option"]}          | ${false}
        `(
            `should return '$expected' when shortcut is '$shortcut' and key is '$key'`,
            ({ shortcut, key, expected }) => {
                // Arrange & Act
                const result = hasKey(shortcut, ...key);

                // Assert
                expect(result).toBe(expected);
            }
        );
    });

    describe("remapShortcuts", () => {
        test.each`
            shortcuts                       | expected
            ${["ctrl+a", "ctrl+d"]}         | ${["ctrl+A", "ctrl+D", "cmd+A", "cmd+D"].join()}
            ${["alt+a"]}                    | ${["alt+A", "option+A"].join()}
            ${["cmd+a"]}                    | ${["cmd+A", "ctrl+A"].join()}
            ${["cmd+a", "ctrl+a"]}          | ${["cmd+A", "ctrl+A"].join()}
            ${["cmd+a", "ctrl+a", "cmd+a"]} | ${["cmd+A", "ctrl+A"].join()}
        `(
            `should return '$expected' when shortcuts is '$shortcuts'`,
            ({ shortcuts, expected }) => {
                // Arrange & Act
                const result = remapShortcuts(shortcuts);

                // Assert
                expect(result).toStrictEqual(expected);
            }
        );
    });

    describe("sanitizeKeys", () => {
        test.each`
            shortcuts                     | expected
            ${["ctrl+a", "ctrl+d"]}       | ${["ctrl+A", "ctrl+D"]}
            ${["ctrl + a", "ctrl +   D"]} | ${["ctrl+A", "ctrl+D"]}
            ${["CMD + a", "COMMAND + c"]} | ${["cmd+A", "command+C"]}
            ${["ctrl + a + b"]}           | ${["ctrl+A+B"]}
        `(
            `should return '$expected' when shortcuts is '$shortcuts'`,
            ({ shortcuts, expected }) => {
                // Arrange & Act
                const result = sanitizeKeys(shortcuts);

                // Assert
                expect(result).toStrictEqual(expected);
            }
        );
    });

    describe("splitKeys", () => {
        test.each`
            shortcuts                     | modifierKey | expected
            ${["ctrl+a", "ctrl+d"]}       | ${"ctrl"}   | ${["+a", "+d"]}
            ${["ctrl + a", "ctrl +   D"]} | ${"ctrl"}   | ${[" + a", " +   D"]}
            ${["ctrl + a", "cmd + c"]}    | ${"ctrl"}   | ${[" + a"]}
        `(
            `should return '$expected' when shortcuts is '$shortcuts' and modifierKey is '$modifierKey'`,
            ({ shortcuts, modifierKey, expected }) => {
                // Arrange & Act
                const result = splitKeys(shortcuts, modifierKey);

                // Assert
                expect(result).toStrictEqual(expected);
            }
        );
    });
});
