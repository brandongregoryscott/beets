import { toaster } from "evergreen-ui";
import { List, Map } from "immutable";
import { useAtom } from "jotai";
import { SetStateAction, useCallback } from "react";
import { useKey } from "rooks";
import { ClipboardItem } from "types/clipboard-item";
import { SelectedClipboardStateAtom } from "utils/atoms/clipboard-state-atom";
import { intersectionWith, rebaseIndexes } from "utils/collection-utils";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { generateId, generateIdMap, remapIds } from "utils/id-utils";

interface UseClipboardStateResult {
    clearSelected: () => void;
    deselectItem: (item: ClipboardItem) => void;
    duplicateSelected: (event?: KeyboardEvent) => void;
    isSelected: (value: ClipboardItem) => boolean;
    onSelect: (item: ClipboardItem) => () => void;
    selectItem: (item: ClipboardItem) => void;
    selectedState: List<ClipboardItem>;
    setSelectedState: (update: SetStateAction<List<ClipboardItem>>) => void;
}

const useClipboardState = (): UseClipboardStateResult => {
    const { state, setCurrentState: setCurrentWorkstationState } =
        useWorkstationState();
    const [selectedState, setSelectedState] = useAtom(
        SelectedClipboardStateAtom
    );

    const duplicationMessage =
        selectedState.count() === 1
            ? "Track Section duplicated!"
            : `${selectedState.count()} Track Sections duplicated!`;

    const handleDuplicate = useCallback(
        (event?: KeyboardEvent) => {
            event?.preventDefault();
            if (selectedState.isEmpty()) {
                return;
            }

            const { track_id } = selectedState.first()!;

            // Pull from current state's trackSections to ensure any changes after selection are propogated
            const trackSections = intersectionWith(
                selectedState,
                state.trackSections,
                (left, right) => left.id === right.id
            );

            const idMap = generateIdMap(trackSections);
            const trackSectionSteps = intersectionWith(
                state.trackSectionSteps,
                trackSections,
                (trackSectionStep, trackSection) =>
                    trackSection.id === trackSectionStep.track_section_id
            );

            const clonedTrackSections = remapIds(trackSections, idMap);
            const clonedTrackSectionSteps = trackSectionSteps.map(
                (trackSectionStep) =>
                    trackSectionStep.merge({
                        id: generateId(),
                        track_section_id: idMap.get(
                            trackSectionStep.track_section_id
                        ),
                    })
            );

            setCurrentWorkstationState((prev) =>
                prev.merge({
                    trackSections: rebaseIndexes(
                        prev.trackSections.concat(clonedTrackSections),
                        (e) => e.track_id === track_id
                    ),
                    trackSectionSteps: prev.trackSectionSteps.concat(
                        clonedTrackSectionSteps
                    ),
                })
            );
            setSelectedState(List<ClipboardItem>());
            toaster.notify(duplicationMessage);
        },
        [
            duplicationMessage,
            selectedState,
            setCurrentWorkstationState,
            setSelectedState,
            state.trackSectionSteps,
            state.trackSections,
        ]
    );

    useKey(["cmd", "d"], handleDuplicate);

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

            if (
                selectedState.some(
                    (selectedItem) => selectedItem.track_id !== item.track_id
                )
            ) {
                setSelectedState(List.of(item));
                return;
            }

            selectItem(item);
        },
        [deselectItem, isSelected, selectItem, selectedState, setSelectedState]
    );

    const clearSelected = useCallback(
        () => setSelectedState(List<ClipboardItem>()),
        [setSelectedState]
    );

    return {
        duplicateSelected: handleDuplicate,
        clearSelected,
        selectItem,
        isSelected,
        onSelect,
        deselectItem,
        selectedState,
        setSelectedState,
    };
};

export { useClipboardState };
