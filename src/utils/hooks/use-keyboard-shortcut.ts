import { castArray, drop, flatMap, intersectionWith, isEmpty } from "lodash";
import { useHotkeys } from "react-hotkeys-hook";
import keyMirror from "keymirror";
import { isMacOs } from "utils/navigator-utils";
import { hasValues } from "utils/collection-utils";
import { capitalize } from "humanize-plus";

interface UseKeyboardShortcutResult {
    /**
     * Formatted and OS-dependent label to display on components
     */
    label: string;
}

const keys = keyMirror({
    alt: null,
    cmd: null,
    command: null,
    ctrl: null,
    control: null,
    option: null,
});

const keyMap = {
    [keys.alt]: keys.option,
    [keys.option]: keys.alt,
    [keys.cmd]: keys.ctrl,
    [keys.command]: keys.ctrl,
    [keys.ctrl]: keys.cmd,
    [keys.control]: keys.cmd,
};

const keyLabelMap = {
    [keys.alt]: capitalize(keys.alt),
    [keys.ctrl]: capitalize(keys.ctrl),
    [keys.control]: capitalize(keys.ctrl),
    [keys.cmd]: "⌘",
    [keys.command]: "⌘",
    [keys.option]: "⌥",
};

const nonMacKeys = [keys.alt, keys.ctrl, keys.control];
const macOsKeys = [keys.option, keys.cmd, keys.command];

/**
 * Wrapper around `useHotkeys` from `react-hotkeys-hook` to handle cross-platform key handling and
 * generation of a display label for components
 *
 * @param shortcut Comma-separated string or array of keyboard shortcuts such as "ctrl+s,ctrl+a" or ["ctrl+s", "ctrl+a"]
 * Note: Modifier keys (i.e. ctrl or cmd) only need to be specified once - the hook will handle
 * duplicating the shortcuts for the other OS
 * @param callback Callback to be executed when the keyboard shortcut is activated
 * @param dependencies Optional dependencies that the callback function needs to run properly
 */
const useKeyboardShortcut = (
    shortcut: string | string[],
    callback: (event: KeyboardEvent) => void,
    dependencies?: any[]
): UseKeyboardShortcutResult => {
    const remappedShortcut = remapShortcuts(shortcut);
    useHotkeys(
        remappedShortcut,
        (event) => {
            event.preventDefault();
            callback(event);
        },
        dependencies
    );

    return { label: getDisplayLabel(remappedShortcut) };
};

/**
 * Formats a sanitized keyboard shortcut string (comma-separated) based on the current OS
 * @example ["ctrl+a", "cmd+a"] on Mac -> "⌘A",
 * @example ["ctrl+a", "cmd+a"] on any other system -> "Ctrl+A"
 */
const getDisplayLabel = (shortcut: string): string => {
    const keys = isMacOs() ? macOsKeys : nonMacKeys;
    let displayLabel =
        shortcut.split(",").find((shortcut) => hasKey(shortcut, ...keys)) ??
        shortcut;
    Object.entries(keyLabelMap).forEach(([key, label]) => {
        displayLabel = displayLabel.replace(key, label);
    });

    return isMacOs() ? displayLabel.replace("+", "") : displayLabel;
};

const hasKey = (shortcuts: string | string[], ...keys: string[]): boolean =>
    hasValues(
        intersectionWith(castArray(shortcuts), keys, (shortcut, key) =>
            new RegExp(key).test(shortcut)
        )
    );

/**
 * Backfills cross-platform keyboard shortcuts if not present
 * @example ["ctrl+a"] -> ["ctrl+a", "cmd+a"]
 */
const remapShortcuts = (shortcut: string | string[]): string => {
    const shortcuts = sanitizeKeys(
        Array.isArray(shortcut) ? shortcut : shortcut.split(",")
    );

    Object.entries(keyMap).forEach(([leftKey, rightKey]) => {
        if (!hasKey(shortcuts, leftKey) || hasKey(shortcuts, rightKey)) {
            return;
        }

        const shortcutKeys = splitKeys(shortcuts, leftKey);
        shortcuts.push(
            ...shortcutKeys.map((shortcutKey) => `${rightKey}${shortcutKey}`)
        );
    });

    return shortcuts.join(",");
};

/**
 * Sanitizes the keyboard shortcuts in a standard format: lowercase modifier key and uppercase
 * shortcut key without whitespace
 * @example ["ctrl + a"] -> ["ctrl+A"]
 * @example ["CMD+a"] -> ["cmd+A"],
 */
const sanitizeKeys = (shortcuts: string[]): string[] =>
    shortcuts
        .map((shortcut) =>
            shortcut
                .toLowerCase()
                .split("+")
                .map((shortcutPart, index) =>
                    index === 0
                        ? shortcutPart.trim()
                        : shortcutPart.toUpperCase().trim()
                )
                .join("+")
                .trim()
        )
        .filter((shortcut) => !isEmpty(shortcut));

/**
 * Splits the keyboard shortcuts by the modifier key such as `ctrl` or `cmd`
 */
const splitKeys = (shortcuts: string[], modifierKey: string): string[] =>
    flatMap(shortcuts, (shortcut) => drop(shortcut.split(modifierKey), 1));

export { useKeyboardShortcut };
