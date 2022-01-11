import { ClipboardType } from "enums/clipboard-type";
import { toaster } from "evergreen-ui";
import { List } from "immutable";
import { useAtom } from "jotai";
import { SetStateAction, useCallback } from "react";
import { useKey } from "rooks";
import { ClipboardItem } from "types/clipboard-item";
import { ClipboardStateAtomFamily } from "utils/atoms/clipboard-state-atom-family";

interface UseClipboardStateResult {
    deselectItem: (item: ClipboardItem) => void;
    isSelected: (value: ClipboardItem) => boolean;
    onSelect: (item: ClipboardItem) => () => void;
    selectItem: (item: ClipboardItem) => void;
    selectedState: List<ClipboardItem>;
    setSelectedState: (update: SetStateAction<List<ClipboardItem>>) => void;
}

const useClipboardState = (): UseClipboardStateResult => {
    const [selectedState, setSelectedState] = useAtom(
        ClipboardStateAtomFamily({
            initialValue: List<ClipboardItem>(),
            type: ClipboardType.Selected,
        })
    );
    const [copiedState, setCopiedState] = useAtom(
        ClipboardStateAtomFamily({
            initialValue: List<ClipboardItem>(),
            type: ClipboardType.Copied,
        })
    );

    useKey(["cmd", "c"], (_event) => {
        toaster.notify(`Clipboard copied ${_event.type}`, {
            id: JSON.stringify(selectedState),
        });
    });

    const selectItem = useCallback(
        (item: ClipboardItem) => {
            setSelectedState((prev) => prev.push(item));
        },
        [setSelectedState]
    );

    const isSelected = useCallback(
        (value: ClipboardItem) =>
            selectedState.some((item) => item.equals(value)),
        [selectedState]
    );

    const deselectItem = useCallback(
        (item: ClipboardItem) =>
            setSelectedState((prev) => {
                const index = prev.indexOf(item);
                if (index < 0) {
                    return prev;
                }

                return prev.remove(index);
            }),
        [setSelectedState]
    );

    const onSelect = useCallback(
        (item: ClipboardItem) => () => {
            if (isSelected(item)) {
                deselectItem(item);
                return;
            }

            selectItem(item);
        },
        [deselectItem, isSelected, selectItem]
    );

    return {
        selectItem,
        isSelected,
        onSelect,
        deselectItem,
        selectedState,
        setSelectedState,
    };
};

export { useClipboardState };
