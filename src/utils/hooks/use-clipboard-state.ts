import { toaster } from "evergreen-ui";
import { List } from "immutable";
import { useAtom } from "jotai";
import pluralize from "pluralize";
import { SetStateAction, useCallback } from "react";
import { useKey } from "rooks";
import { ClipboardItem } from "types/clipboard-item";
import {
    CopiedClipboardStateAtom,
    SelectedClipboardStateAtom,
} from "utils/atoms/clipboard-state-atom";

interface UseClipboardStateResult {
    deselectItem: (item: ClipboardItem) => void;
    isSelected: (value: ClipboardItem) => boolean;
    onSelect: (item: ClipboardItem) => () => void;
    selectItem: (item: ClipboardItem) => void;
    selectedState: List<ClipboardItem>;
    setSelectedState: (update: SetStateAction<List<ClipboardItem>>) => void;
}

const EMPTY_CLIPBOARD_ID = "empty";

const useClipboardState = (): UseClipboardStateResult => {
    const [selectedState, setSelectedState] = useAtom(
        SelectedClipboardStateAtom
    );
    const [, setCopiedState] = useAtom(CopiedClipboardStateAtom);

    const handleCopy = useCallback(() => {
        if (selectedState.isEmpty()) {
            toaster.notify("There's nothing selected to copy!", {
                duration: 1,
                id: EMPTY_CLIPBOARD_ID,
            });
            return;
        }
        setCopiedState(selectedState);
        setSelectedState(List<ClipboardItem>());
        const count = selectedState.count();
        toaster.notify(`${count} ${pluralize("item", count)} copied!`);
    }, [selectedState, setCopiedState, setSelectedState]);

    useKey(["cmd", "c"], handleCopy);

    const selectItem = useCallback(
        (item: ClipboardItem) => {
            setSelectedState((prev) => prev.push(item));
        },
        [setSelectedState]
    );

    const isSelected = useCallback(
        (value: ClipboardItem) =>
            selectedState.some((item) => item.id === value.id),
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
