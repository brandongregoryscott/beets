import { List } from "immutable";
import { useAtom } from "jotai";
import { SetStateAction, useCallback } from "react";
import { ClipboardItem } from "types/clipboard-item";
import { ClipboardStateAtom } from "utils/atoms/clipboard-state-atom";

interface UseClipboardStateResult {
    addItem: (item: ClipboardItem) => void;
    isSelected: (value: ClipboardItem) => boolean;
    onClick: (item: ClipboardItem) => () => void;
    removeItem: (item: ClipboardItem) => void;
    setState: (update: SetStateAction<List<ClipboardItem>>) => void;
    state: List<ClipboardItem>;
}

const useClipboardState = (): UseClipboardStateResult => {
    const [state, setState] = useAtom(ClipboardStateAtom);

    const addItem = useCallback(
        (item: ClipboardItem) => {
            setState((prev) => prev.push(item));
        },
        [setState]
    );

    const isSelected = useCallback(
        (value: ClipboardItem) => state.some((item) => item.equals(value)),
        [state]
    );

    const removeItem = useCallback(
        (item: ClipboardItem) => {
            setState((prev) => {
                const index = prev.indexOf(item);
                if (index < 0) {
                    return prev;
                }

                return prev.remove(index);
            });
        },
        [setState]
    );

    const onClick = useCallback(
        (item: ClipboardItem) => () => {
            if (isSelected(item)) {
                removeItem(item);
                return;
            }

            addItem(item);
        },
        [addItem, isSelected, removeItem]
    );

    return { addItem, isSelected, onClick, removeItem, state, setState };
};

export { useClipboardState };
