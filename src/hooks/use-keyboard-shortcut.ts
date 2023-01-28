import { useHotkeys } from "react-hotkeys-hook";
import { getDisplayLabel, remapShortcuts } from "utils/keyboard-shortcut-utils";

interface UseKeyboardShortcutResult {
    /**
     * Formatted and OS-dependent label to display on components
     */
    label: string;
}

/**
 * Wrapper around `useHotkeys` from `react-hotkeys-hook` to handle cross-platform key mapping and
 * generation of a display label for components
 *
 * @param shortcut Comma-separated string or array of keyboard shortcuts such as "ctrl+s,ctrl+a" or ["ctrl+s", "ctrl+a"]
 * Note: Modifier keys (i.e. ctrl or cmd) only need to be specified once - the hook will handle
 * duplicating the shortcuts for the other OS
 * @param callback Callback to be executed when the keyboard shortcut is activated
 * @param dependencies Optional dependencies that the callback function needs to run properly
 */
const useKeyboardShortcut = (
    shortcut: string[] | string,
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

export { useKeyboardShortcut };
